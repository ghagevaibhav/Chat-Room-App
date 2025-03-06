"use client";

import initDraw from "@/draw";
import { useEffect, useRef } from "react";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    initDraw(canvas);
  }, [canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 bg-black"
    />
  );
}