"use client"

import { useEffect, useRef, useState } from "react"
import * as fabric from "fabric"
import { Pencil, Eraser, Square, Circle, Undo, Redo, Trash2, Plus, Minus, MousePointer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/ThemeProvider"

type Tool = "select" | "pencil" | "eraser" | "rectangle" | "circle"

const DrawingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
  const [activeTool, setActiveTool] = useState<Tool>("pencil")
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [brushSize, setBrushSize] = useState(2)
  const { theme } = useTheme()

  // handle responsive canvas sizing
  useEffect(() => {
    const handleResize = () => {
      if (canvas && containerRef.current) {
        const container = containerRef.current
        const width = container.clientWidth
        const height = container.clientHeight
        canvas.setDimensions({
          width: width,
          height: height,
        })
        canvas.renderAll()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [canvas])

  // initialize canvas
  useEffect(() => {
    if (canvasRef.current && containerRef.current && !canvas) {
      const container = containerRef.current
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        width: container.clientWidth,
        height: container.clientHeight,
        backgroundColor: theme === "light" ? "#ffffff" : "#121212",
        isDrawingMode: true,
      })

      if (fabricCanvas.freeDrawingBrush) {
        fabricCanvas.freeDrawingBrush.width = brushSize
        fabricCanvas.freeDrawingBrush.color = theme === "light" ? "#000000" : "#ffffff"
      }

      const initialState = JSON.stringify(fabricCanvas)
      setHistory([initialState])
      setHistoryIndex(0)

      fabricCanvas.on("object:added", () => {
        saveCanvasState(fabricCanvas)
      })

      fabricCanvas.on("object:modified", () => {
        saveCanvasState(fabricCanvas)
      })

      fabricCanvas.on("path:created", () => {
        saveCanvasState(fabricCanvas)
      })

      setCanvas(fabricCanvas)
    }
  }, [theme, brushSize]) // add dependencies to prevent stale closures

  // update theme colors
  useEffect(() => {
    if (canvas) {
      canvas.backgroundColor = theme === "light" ? "#ffffff" : "#121212"
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = theme === "light" ? "#000000" : "#ffffff"

        if (activeTool === "eraser") {
          canvas.freeDrawingBrush.color = theme === "light" ? "#ffffff" : "#121212"
        }
      }

      canvas.getObjects().forEach((obj) => {
        if (obj.type === "path") {
          const pathObject = obj as fabric.Path
          if (pathObject.stroke === "#000000" || pathObject.stroke === "#ffffff") {
            pathObject.set("stroke", theme === "light" ? "#000000" : "#ffffff")
          }
        } else if (obj.type === "rect" || obj.type === "circle") {
          const shapeObject = obj as fabric.Object
          if (shapeObject.stroke === "#000000" || shapeObject.stroke === "#ffffff") {
            shapeObject.set("stroke", theme === "light" ? "#000000" : "#ffffff")
          }
        }
      })

      canvas.renderAll()
    }
  }, [theme, activeTool])

  useEffect(() => {
    if (canvas && canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.width = brushSize
    }
  }, [brushSize, canvas])

  const saveCanvasState = (canvas: fabric.Canvas) => {
    try {
      const json = JSON.stringify(canvas)

      if (historyIndex >= 0 && history[historyIndex] !== json) {
        const newHistory = history.slice(0, historyIndex + 1)
        newHistory.push(json)
        setHistory(newHistory)
        setHistoryIndex(newHistory.length - 1)
      }
    } catch (error) {
      console.error("Error saving canvas state:", error)
    }
  }

  const undo = () => {
    if (historyIndex > 0 && canvas) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      try {
        canvas.loadFromJSON(history[newIndex], canvas.renderAll.bind(canvas))
      } catch (error) {
        console.error("Error loading canvas state:", error)
      }
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1 && canvas) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      try {
        canvas.loadFromJSON(history[newIndex], canvas.renderAll.bind(canvas))
      } catch (error) {
        console.error("Error loading canvas state:", error)
      }
    }
  }

  const clearCanvas = () => {
    if (canvas) {
      canvas.clear()
      canvas.backgroundColor = theme === "light" ? "#ffffff" : "#121212"
      canvas.renderAll()
      saveCanvasState(canvas)
    }
  }

  const handleToolClick = (tool: Tool) => {
    if (!canvas) return

    setActiveTool(tool)

    switch (tool) {
      case "select":
        canvas.isDrawingMode = false
        canvas.selection = true
        canvas.defaultCursor = "default"
        break
      case "pencil":
        canvas.isDrawingMode = true
        if (canvas.freeDrawingBrush) {
          canvas.freeDrawingBrush.width = brushSize
          canvas.freeDrawingBrush.color = theme === "light" ? "#000000" : "#ffffff"
        }
        break
      case "eraser":
        canvas.isDrawingMode = true
        if (canvas.freeDrawingBrush) {
          canvas.freeDrawingBrush.width = brushSize * 2
          canvas.freeDrawingBrush.color = theme === "light" ? "#ffffff" : "#121212"
        }
        break
      case "rectangle":
        canvas.isDrawingMode = false
        const rect = new fabric.Rect({
          left: canvas.width! / 2 - 50,
          top: canvas.height! / 2 - 50,
          fill: "transparent",
          width: 100,
          height: 100,
          strokeWidth: 2,
          stroke: theme === "light" ? "#000000" : "#ffffff",
        })
        canvas.add(rect)
        canvas.setActiveObject(rect)
        saveCanvasState(canvas)
        break
      case "circle":
        canvas.isDrawingMode = false
        const circle = new fabric.Circle({
          left: canvas.width! / 2 - 50,
          top: canvas.height! / 2 - 50,
          fill: "transparent",
          radius: 50,
          strokeWidth: 2,
          stroke: theme === "light" ? "#000000" : "#ffffff",
        })
        canvas.add(circle)
        canvas.setActiveObject(circle)
        saveCanvasState(canvas)
        break
    }
  }

  const increaseBrushSize = () => {
    setBrushSize((prev) => Math.min(prev + 1, 20))
  }

  const decreaseBrushSize = () => {
    setBrushSize((prev) => Math.max(prev - 1, 1))
  }

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {/* toolbar */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg rounded-lg p-2 z-10">
        <Button
          size="icon"
          variant={activeTool === "select" ? "default" : "outline"}
          onClick={() => handleToolClick("select")}
          title="Select"
          className="h-10 w-10"
        >
          <MousePointer className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          variant={activeTool === "pencil" ? "default" : "outline"}
          onClick={() => handleToolClick("pencil")}
          title="Pencil"
          className="h-10 w-10"
        >
          <Pencil className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          variant={activeTool === "eraser" ? "default" : "outline"}
          onClick={() => handleToolClick("eraser")}
          title="Eraser"
          className="h-10 w-10"
        >
          <Eraser className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          variant={activeTool === "rectangle" ? "default" : "outline"}
          onClick={() => handleToolClick("rectangle")}
          title="Rectangle"
          className="h-10 w-10"
        >
          <Square className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          variant={activeTool === "circle" ? "default" : "outline"}
          onClick={() => handleToolClick("circle")}
          title="Circle"
          className="h-10 w-10"
        >
          <Circle className="h-5 w-5" />
        </Button>

        <div className="h-px w-full bg-gray-300 dark:bg-gray-700 my-1" />

        <Button
          size="icon"
          variant="outline"
          onClick={increaseBrushSize}
          title="Increase Brush Size"
          className="h-10 w-10"
        >
          <Plus className="h-5 w-5" />
        </Button>
        <div className="flex items-center justify-center text-xs font-medium">{brushSize}px</div>
        <Button
          size="icon"
          variant="outline"
          onClick={decreaseBrushSize}
          title="Decrease Brush Size"
          className="h-10 w-10"
        >
          <Minus className="h-5 w-5" />
        </Button>

        <div className="h-px w-full bg-gray-300 dark:bg-gray-700 my-1" />

        <Button
          size="icon"
          variant="outline"
          onClick={undo}
          disabled={historyIndex <= 0}
          title="Undo"
          className="h-10 w-10"
        >
          <Undo className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={redo}
          disabled={historyIndex >= history.length - 1}
          title="Redo"
          className="h-10 w-10"
        >
          <Redo className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={clearCanvas}
          title="Clear"
          className="h-10 w-10 text-destructive hover:text-destructive"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>

      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

export default DrawingCanvas