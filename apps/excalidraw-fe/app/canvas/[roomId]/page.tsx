"use client";

import { useEffect, useRef } from "react"

export default function Canvas () {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if(canvasRef.current) {
            const canvas = canvasRef.current 
            const ctx = canvas.getContext("2d")

            let clicked = false;
            let startX = 0, startY = 0;

            if(!ctx) return;

            canvas.addEventListener("mousedown", (e) => {
                clicked = true;
                startX = e.clientX;
                startY = e.clientY;
            })

            canvas.addEventListener("mouseup", (e) => {
                clicked = false;
                console.log(e.clientX, e.clientY)
            })

            canvas.addEventListener("mousemove", (e) => {
                if(clicked) {
                    const width = e.clientX - startX;
                    const height = e.clientY - startX;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.strokeRect(startX, startY, width, height);
                }
            })

        }
    }, [canvasRef])

    return <>
        <div> 
            <canvas ref={canvasRef} height={1000} width={1000} color="black" className="w-screen h-screen bg-black-100">

            </canvas>
        </div>
    </>
}