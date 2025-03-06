import initDraw from "@/draw";
import { Socket } from "dgram";
import { useEffect, useRef } from "react";

export default function Canvas({ roomId, socket }: { 
        roomId: string,
        socket: WebSocket
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    initDraw(canvas, roomId, socket);
  }, [canvasRef]);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 bg-black" />;
}
