"use client"

import React from "react"
import { useState, useRef, useEffect } from "react"
import type { WindowState } from "@/types/windows-xp"

interface WindowProps {
  window: WindowState
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  onFocus: () => void
  onMove: (position: { x: number; y: number }) => void
  onResize?: (size: { width: number; height: number }) => void
  children: React.ReactNode
  isMobile?: boolean
}

export function Window({ 
  window: windowState, 
  onClose, 
  onMinimize, 
  onMaximize, 
  onFocus,
  onMove,
  onResize,
  children,
  isMobile = false
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, w: 0, h: 0 })
  const [isAnimating, setIsAnimating] = useState(false)
  const windowRef = useRef<HTMLDivElement>(null)

  // XP-style window opening animation
  useEffect(() => {
    if (windowState.isOpen && !isAnimating) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 300)
      return () => clearTimeout(timer)
    }
  }, [windowState.isOpen])

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return
    if ((e.target as HTMLElement).closest('.resize-handle')) return
    onFocus()
    setIsDragging(true)
    setDragOffset({
      x: e.clientX - windowState.position.x,
      y: e.clientY - windowState.position.y
    })
  }

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    onFocus()
    setIsResizing(true)
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      w: windowState.size.width,
      h: windowState.size.height
    })
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !windowState.isMaximized) {
        onMove({
          x: Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - 100)),
          y: Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - 60))
        })
      }
      if (isResizing && !windowState.isMaximized && onResize) {
        const newWidth = Math.max(200, resizeStart.w + (e.clientX - resizeStart.x))
        const newHeight = Math.max(150, resizeStart.h + (e.clientY - resizeStart.y))
        onResize({ width: newWidth, height: newHeight })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
    }

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, isResizing, dragOffset, resizeStart, windowState.isMaximized, onMove, onResize])

  if (!windowState.isOpen || windowState.isMinimized) return null

  // On mobile, always maximize windows
  const isEffectivelyMaximized = isMobile || windowState.isMaximized

  const windowStyle = isEffectivelyMaximized
    ? { top: 0, left: 0, right: 0, bottom: isMobile ? 40 : 30, width: '100%', height: isMobile ? 'calc(100% - 40px)' : 'calc(100% - 30px)' }
    : { 
        top: windowState.position.y, 
        left: windowState.position.x,
        width: windowState.size.width,
        height: windowState.size.height
      }

  return (
    <div
      ref={windowRef}
      className={`fixed flex flex-col touch-manipulation ${
        isAnimating ? 'animate-xp-window-open' : ''
      }`}
      style={{
        ...windowStyle,
        zIndex: windowState.zIndex,
        borderRadius: isEffectivelyMaximized ? '0' : '8px 8px 0 0',
        boxShadow: '0 0 0 1px #0054e3, 2px 2px 10px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.1)',
        transform: isAnimating ? 'scale(0.95)' : 'scale(1)',
        opacity: isAnimating ? 0.9 : 1,
        transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className="h-[30px] md:h-[30px] flex items-center px-[3px] cursor-move select-none shrink-0"
        style={{
          background: 'linear-gradient(180deg, #0a246a 0%, #0c3fa5 8%, #1164d1 15%, #0054e3 30%, #0044bc 80%, #003399 95%, #002266 100%)',
          borderRadius: isEffectivelyMaximized ? '0' : '6px 6px 0 0',
          borderBottom: '1px solid #003399'
        }}
        onMouseDown={isMobile ? undefined : handleMouseDown}
        onTouchStart={isMobile ? undefined : undefined}
      >
        <div className="flex items-center gap-2 px-2 flex-1 min-w-0">
          <span className="text-base shrink-0">{windowState.icon}</span>
          <span 
            className="text-white text-[13px] font-normal truncate" 
            style={{ 
              textShadow: '1px 1px 1px rgba(0,0,0,0.6)',
              fontFamily: 'Tahoma, Verdana, sans-serif'
            }}
          >
            {windowState.title}
          </span>
        </div>
        
        {/* Window Controls */}
        <div className="window-controls flex items-center gap-[2px] shrink-0">
          {/* Minimize Button */}
          <button
            onClick={onMinimize}
            className="w-[21px] h-[21px] rounded-[3px] flex items-center justify-center group relative"
            style={{
              background: 'linear-gradient(180deg, #3e8ee8 0%, #2576d0 45%, #1c5eb0 55%, #155ca8 100%)',
              border: '1px solid #0c3469',
              boxShadow: '0 1px 0 rgba(255,255,255,0.3) inset'
            }}
          >
            <div 
              className="w-[8px] h-[3px] mt-[8px]"
              style={{
                background: 'linear-gradient(180deg, #fff 0%, #d4e9ff 100%)',
                boxShadow: '0 1px 0 rgba(0,0,0,0.3)'
              }}
            />
          </button>
          
          {/* Maximize/Restore Button */}
          <button
            onClick={onMaximize}
            className="w-[21px] h-[21px] rounded-[3px] flex items-center justify-center relative"
            style={{
              background: 'linear-gradient(180deg, #3e8ee8 0%, #2576d0 45%, #1c5eb0 55%, #155ca8 100%)',
              border: '1px solid #0c3469',
              boxShadow: '0 1px 0 rgba(255,255,255,0.3) inset'
            }}
          >
            {windowState.isMaximized ? (
              // Restore icon - two overlapping squares
              <div className="relative w-[10px] h-[10px]">
                <div 
                  className="absolute top-0 right-0 w-[7px] h-[7px] border-[2px] border-white"
                  style={{ borderTopWidth: '3px' }}
                />
                <div 
                  className="absolute bottom-0 left-0 w-[7px] h-[7px] border-[2px] border-white bg-[#2576d0]"
                  style={{ borderTopWidth: '3px' }}
                />
              </div>
            ) : (
              // Maximize icon - single square
              <div 
                className="w-[9px] h-[9px] border-[2px] border-white"
                style={{ borderTopWidth: '3px' }}
              />
            )}
          </button>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-[21px] h-[21px] rounded-[3px] flex items-center justify-center ml-[2px]"
            style={{
              background: 'linear-gradient(180deg, #e8846f 0%, #d85840 45%, #c23c1f 55%, #b02000 100%)',
              border: '1px solid #7c1700',
              boxShadow: '0 1px 0 rgba(255,255,255,0.3) inset'
            }}
          >
            <svg width="9" height="9" viewBox="0 0 9 9" className="fill-white">
              <path d="M1 0L0 1L3.5 4.5L0 8L1 9L4.5 5.5L8 9L9 8L5.5 4.5L9 1L8 0L4.5 3.5L1 0Z" 
                style={{ filter: 'drop-shadow(0 1px 0 rgba(0,0,0,0.3))' }}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Menu Bar (optional - shown for folder windows) */}
      {(windowState.id === 'about' || windowState.id === 'experience' || windowState.id === 'skills' || windowState.id === 'education' || windowState.id === 'contact') && (
        <div 
          className="h-[20px] flex items-center px-1 text-[11px] shrink-0"
          style={{
            background: '#ece9d8',
            borderBottom: '1px solid #aaa'
          }}
        >
          <button className="px-2 hover:bg-[#316ac5] hover:text-white">Archivo</button>
          <button className="px-2 hover:bg-[#316ac5] hover:text-white">Editar</button>
          <button className="px-2 hover:bg-[#316ac5] hover:text-white">Ver</button>
          <button className="px-2 hover:bg-[#316ac5] hover:text-white">Favoritos</button>
          <button className="px-2 hover:bg-[#316ac5] hover:text-white">Herramientas</button>
          <button className="px-2 hover:bg-[#316ac5] hover:text-white">Ayuda</button>
        </div>
      )}

      {/* Toolbar (for folder windows) */}
      {(windowState.id === 'about' || windowState.id === 'experience' || windowState.id === 'skills' || windowState.id === 'education' || windowState.id === 'contact') && (
        <div 
          className="h-[26px] flex items-center px-1 gap-1 shrink-0"
          style={{
            background: 'linear-gradient(180deg, #fefefe 0%, #ece9d8 100%)',
            borderBottom: '1px solid #aaa'
          }}
        >
          <button className="px-2 py-1 text-[11px] flex items-center gap-1 hover:border hover:border-[#316ac5] rounded">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Atrás
          </button>
          <button className="px-2 py-1 text-[11px] flex items-center gap-1 hover:border hover:border-[#316ac5] rounded text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          <div className="w-px h-4 bg-gray-400 mx-1"></div>
          <button className="px-2 py-1 text-[11px] flex items-center gap-1 hover:border hover:border-[#316ac5] rounded">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </button>
          <button className="px-2 py-1 text-[11px] flex items-center gap-1 hover:border hover:border-[#316ac5] rounded">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Buscar
          </button>
          <button className="px-2 py-1 text-[11px] flex items-center gap-1 hover:border hover:border-[#316ac5] rounded">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            Carpetas
          </button>
        </div>
      )}

      {/* Address Bar (for folder windows) */}
      {(windowState.id === 'about' || windowState.id === 'experience' || windowState.id === 'skills' || windowState.id === 'education' || windowState.id === 'contact') && (
        <div 
          className="h-[22px] flex items-center px-2 gap-2 text-[11px] shrink-0"
          style={{
            background: '#ece9d8',
            borderBottom: '1px solid #aaa'
          }}
        >
          <span className="text-gray-600">Dirección</span>
          <div className="flex-1 h-[18px] bg-white border border-gray-400 flex items-center px-2 rounded-sm">
            <span className="mr-2">{windowState.icon}</span>
            <span>C:\Portfolio\{windowState.title.replace(' ', '_')}</span>
          </div>
          <button className="px-2 text-[11px]">Ir</button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 bg-white overflow-auto min-h-0">
        {children}
      </div>

      {/* Status Bar */}
      <div 
        className="h-[22px] flex items-center px-2 text-[11px] text-gray-600 shrink-0"
        style={{
          background: '#ece9d8',
          borderTop: '1px solid #aaa'
        }}
      >
        <span>Listo</span>
      </div>

      {/* Resize Handle */}
      {!windowState.isMaximized && (
        <div 
          className="resize-handle absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onMouseDown={handleResizeMouseDown}
          style={{
            background: 'linear-gradient(135deg, transparent 50%, #888 50%, #888 60%, transparent 60%, transparent 70%, #888 70%, #888 80%, transparent 80%)'
          }}
        />
      )}
    </div>
  )
}
