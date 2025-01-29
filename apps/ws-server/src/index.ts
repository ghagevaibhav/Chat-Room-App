import { WebSocket, WebSocketServer } from "ws";
import jwt, { decode } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/index";
import { prisma } from "@repo/db/index";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  ws: WebSocket;
  userId: string;
  rooms: string[];
}

const users: User[] = [];

function checkUser(token: string): string | null {
  const decoded = jwt.verify(token, JWT_SECRET);

  if (typeof decoded === "string") {
    return null;
  }
  if (!decoded || !decoded.id) {
    return null;
  }
  return decoded.id;
}

wss.on("connection", function connection(ws: WebSocket, req: Request) {
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
          id: parsedData.roomId,
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
      const roomIndex = user.rooms.findIndex((x) => x === parsedData.roomId);
      if (roomIndex) {
        user.rooms.splice(roomIndex, 1);
      }
    }

    if (parsedData.type === "chat") {
        const room = parsedData.roomId;
        const message = parsedData.message;
        users.forEach((user) => {
            if(user.rooms.includes(room)){
                user.ws.send(JSON.stringify({ type: "chat", message, room }));
            }
        })
    }
  });
});
