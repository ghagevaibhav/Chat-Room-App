import { WebSocket, WebSocketServer } from "ws";
import jwt, { decode } from "jsonwebtoken";
const { JWT_SECRET } = await import("@repo/backend-common/index");
const { prisma } = await import("@repo/db/index");

const wss = new WebSocketServer({ port: 8080 });

interface User {
  ws: WebSocket;
  userId: string;
  rooms: string[];
}

const users: User[] = [];
console.log(users);

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string") {
      return null;
    }
    if (!decoded || !decoded.id) {
      return null;
    }
    return decoded.id;
  } catch (e) {
    console.error(e);
    return null;
  }
}

wss.on("connection", function connection(ws: WebSocket, req: Request) {
  console.log("connected");
  const url = req.url;
  const queryParam = new URLSearchParams(url.split("?")[1]);
  const token = queryParam.get("token") || "";
  const userId = checkUser(token);

  if (!userId) {
    ws.send("Unauthorized");
    ws.close();
    return;
  }

  users.push({
    userId,
    ws,
    rooms: [],
  });

  ws.on("message", async function message(data: string) {
    const parsedData = JSON.parse(data);

    if (parsedData.type === "join_room") {
      const user = users.find((x) => x.ws === ws);

      const room = await prisma.room.findUnique({
        where: {
          slug: parsedData.roomId,
        },
      });
      if (!room) {
        ws.send("Room not found");
        return;
      }
      user?.rooms.push(parsedData.roomId);
    }

    if (parsedData.type === "leave_room") {
      const user = users.find((x) => x.ws === ws);
      if (!user) return;
      // Filter to keep all rooms EXCEPT the one we're leaving
      user.rooms = user.rooms.filter((x) => x !== parsedData.roomId);
      ws.send(JSON.stringify("Left room"));
    }

    if (parsedData.type === "chat") {
      const room = parsedData.roomId;
      const message = parsedData.message;

      // store the message in the database
      await prisma.chat.create({
        data: {
          message, 
          roomId: room,
          userId
        },
      });

      // check if the user has access to the room
      const user = users.find((x) => x.ws === ws);
      if (!user)
        return ws.send(JSON.stringify("Unauthorized"));
      const response = await prisma.room.findUnique({
        where: {
          id: room,
        },
      })
      const roomSlug = response?.slug;
      if(!roomSlug) return;
      users.forEach((user) => {
        if (user.rooms.includes(roomSlug)) {
          user.ws.send(JSON.stringify({ type: "chat", message, room }));
        }
      });
    }
  });
});
