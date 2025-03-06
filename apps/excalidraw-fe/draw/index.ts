import { BACKEND_URL } from "@/Config/config";
import axios from "axios";

type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    }
  | {
      type: "line";
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    };

export default async function initDraw(
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket
) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let existingShapes: Shape[] = await getExistingShapes(roomId);

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);

    if (message.type === "chat") {
      // Extract shape from the message correctly
      const parsedData = JSON.parse(message.message);
      if (parsedData.shape) {
        existingShapes.push(parsedData.shape);
        clearCanvas(existingShapes, canvas, ctx);
      }
    }
  };

  clearCanvas(existingShapes, canvas, ctx);

  let clicked = false;
  let startX = 0,
    startY = 0;

  const handleMouseDown = (e: MouseEvent) => {
    clicked = true;
    startX = e.clientX;
    startY = e.clientY;
  };

  const handleMouseUp = (e: MouseEvent) => {
    clicked = false;
    const width = e.clientX - startX;
    const height = e.clientY - startY;
    const shape: Shape = {
      type: "rect",
      x: startX,
      y: startY,
      width,
      height,
    }
    existingShapes.push(shape);

    socket.send(JSON.stringify({
      type: 'chat',
      message: JSON.stringify({shape}),
      roomId
    }))
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (clicked) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      clearCanvas(existingShapes, canvas, ctx);
      ctx.strokeStyle = "rgba(255, 255, 255)";
      ctx.strokeRect(startX, startY, width, height);
    }
  };

  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mousemove", handleMouseMove);

  // Cleanup event listeners when the component unmounts
  return () => {
    canvas.removeEventListener("mousedown", handleMouseDown);
    canvas.removeEventListener("mouseup", handleMouseUp);
    canvas.removeEventListener("mousemove", handleMouseMove);
  };
}

function clearCanvas(
  existingShapes: Shape[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 0, 0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  existingShapes.forEach((shape) => {
    if (shape.type === "rect") {
      ctx.strokeStyle = "rgba(255, 255, 255)";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
  });
}

async function getExistingShapes(roomId: string) {
  const response = await axios.get(`${BACKEND_URL}/room/chats/${roomId}`);
  const messages = response.data.messages;

  const shapes = messages.map((x: { message: string }) => {
    const messageData = JSON.parse(x.message);
    return messageData.shape; // Extract the shape from the message data
  }).filter(Boolean); // Filter out any null/undefined values
  return shapes;
}
