"use client"

import { useState, useRef, useEffect } from "react"

export function PaintContent() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentColor, setCurrentColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(2)
  const [tool, setTool] = useState<'pen' | 'eraser' | 'fill'>('pen')

  const colors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
    '#FF00FF', '#00FFFF', '#800000', '#008000', '#000080', '#808000',
    '#800080', '#008080', '#C0C0C0', '#808080', '#FFA500', '#A52A2A'
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set white background
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    if (tool === 'fill') {
      ctx.fillStyle = currentColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    } else {
      setIsDrawing(true)
      ctx.beginPath()
      ctx.moveTo(x, y)
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || tool === 'fill') return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.lineWidth = brushSize
    ctx.lineCap = 'round'
    ctx.strokeStyle = tool === 'eraser' ? 'white' : currentColor
    
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0]">
      {/* Toolbar */}
      <div className="bg-[#c0c0c0] border-b-2 border-[#808080] border-r-2 border-[#808080] p-2">
        <div className="flex items-center gap-2">
          {/* Tools */}
          <div className="flex gap-1 border-2 border-[#808080] border-r-[#ffffff] border-t-[#ffffff] p-1">
            <button
              onClick={() => setTool('pen')}
              className={`w-8 h-8 flex items-center justify-center text-xs font-bold ${
                tool === 'pen' ? 'bg-[#c0c0c0] border border-[#808080] border-t-[#ffffff] border-l-[#ffffff]' : 'hover:bg-[#e0e0e0]'
              }`}
              style={{ fontFamily: 'Tahoma, sans-serif' }}
            >
              ✏️
            </button>
            <button
              onClick={() => setTool('eraser')}
              className={`w-8 h-8 flex items-center justify-center text-xs font-bold ${
                tool === 'eraser' ? 'bg-[#c0c0c0] border border-[#808080] border-t-[#ffffff] border-l-[#ffffff]' : 'hover:bg-[#e0e0e0]'
              }`}
              style={{ fontFamily: 'Tahoma, sans-serif' }}
            >
              🧹
            </button>
            <button
              onClick={() => setTool('fill')}
              className={`w-8 h-8 flex items-center justify-center text-xs font-bold ${
                tool === 'fill' ? 'bg-[#c0c0c0] border border-[#808080] border-t-[#ffffff] border-l-[#ffffff]' : 'hover:bg-[#e0e0e0]'
              }`}
              style={{ fontFamily: 'Tahoma, sans-serif' }}
            >
              🪣
            </button>
          </div>

          {/* Brush Size */}
          <div className="flex items-center gap-1 border-2 border-[#808080] border-r-[#ffffff] border-t-[#ffffff] p-1">
            <span className="text-xs px-1" style={{ fontFamily: 'Tahoma, sans-serif' }}>Tamaño:</span>
            <select
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="text-xs border border-[#808080] bg-white"
              style={{ fontFamily: 'Tahoma, sans-serif' }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
            </select>
          </div>

          {/* Clear Button */}
          <button
            onClick={clearCanvas}
            className="px-3 py-1 text-xs border-2 border-[#808080] border-r-[#ffffff] border-t-[#ffffff] hover:bg-[#e0e0e0]"
            style={{ fontFamily: 'Tahoma, sans-serif' }}
          >
            Limpiar
          </button>
        </div>

        {/* Color Palette */}
        <div className="flex flex-wrap gap-1 mt-2 border-2 border-[#808080] border-r-[#ffffff] border-t-[#ffffff] p-2">
          {colors.map(color => (
            <button
              key={color}
              onClick={() => setCurrentColor(color)}
              className={`w-6 h-6 border-2 ${
                currentColor === color ? 'border-[#0000ff]' : 'border-[#808080]'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 p-4 bg-[#808080]">
        <div className="w-full h-full border-2 border-[#808080] border-r-[#ffffff] border-t-[#ffffff] bg-white inline-block">
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            className="cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#c0c0c0] border-t-2 border-[#ffffff] border-l-2 border-[#ffffff] px-2 py-1">
        <div className="flex items-center justify-between text-xs" style={{ fontFamily: 'Tahoma, sans-serif' }}>
          <span>Herramienta: {tool === 'pen' ? 'Lápiz' : tool === 'eraser' ? 'Borrador' : 'Rellenar'}</span>
          <span>Color: {currentColor}</span>
        </div>
      </div>
    </div>
  )
}
