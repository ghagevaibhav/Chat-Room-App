"use client";

import { useEffect, useRef } from "react";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "rgba(0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let clicked = false;
    let startX = 0, startY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      clicked = true;
      startX = e.clientX;
      startY = e.clientY;
    };

    const handleMouseUp = (e: MouseEvent) => {
      clicked = false;
      console.log(e.clientX, e.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (clicked) {
        const width = e.clientX - startX;
        const height = e.clientY - startY;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "rgba(255, 255, 255)"
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 bg-black"
    />
  );
}
