import { WebSocket, WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
const { JWT_SECRET } = await import("@repo/backend-common/index");
const { prisma } = await import("@repo/db/index");

const wss = new WebSocketServer({ port: 8080 });

interface User {
  ws: WebSocket;
  userId: string;
  rooms: number[]; // Changed from string[] to number[] since we store room IDs as numbers
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
    ws.send("Unauthorized people");
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
    console.log("Parsed Data", parsedData);
    if (parsedData.type === "join_room") {
      // find the user in the users array that matches the current WebSocket connection
      const user = users.find((x) => x.ws === ws);

      try {
        const roomId = parseInt(parsedData.roomId);
        const room = await prisma.room.findUnique({
          where: {
            id: roomId,
          },
        });
        if (!room) {
          ws.send("Room not found");
          return;
        }
        user?.rooms.push(roomId); // store roomid as number
      } catch (err) {
        console.error("Error here", err);
      }
    }

    if (parsedData.type === "leave_room") {
      const user = users.find((x) => x.ws === ws);
      if (!user) return "user not found";
      const roomId = parseInt(parsedData.roomId);
      user.rooms = user.rooms.filter((x) => x !== roomId);
      ws.send(JSON.stringify("Left room"));
    }

    if (parsedData.type === "chat") {
      const room = parseInt(parsedData.roomId);
      const message = parsedData.message;
      // check if the user has access to the room first
      const user = users.find((x) => x.ws === ws);
      if (!user) return ws.send(JSON.stringify("Unauthorized"));

      // Check if user has access to this room
      if (!user.rooms.includes(room)) {
        return ws.send(JSON.stringify("Not a member of this room"));
      }

      // store the message in the database
      await prisma.chat.create({
        data: {
          message,
          roomId: room,
          userId,
        },
      });

      // broadcast the message to all users in the room
      users.forEach((u) => {
        if (u.rooms.includes(room)) {
          u.ws.send(
            JSON.stringify({
              type: "chat",
              message,
              room,
              userId, // include sender's ID
            })
          );
        }
      });
      console.log("Users", users);
    }
  });
});
