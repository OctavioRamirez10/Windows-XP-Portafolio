"use client"

import React from "react"
import { useState, useEffect } from "react"
import type { WindowState } from "@/types/windows-xp"

interface TaskbarProps {
  windows: WindowState[]
  onWindowClick: (id: string) => void
  onStartClick: (e?: React.MouseEvent) => void
  isStartOpen: boolean
  isMobile?: boolean
}

export function Taskbar({ windows, onWindowClick, onStartClick, isStartOpen, isMobile }: TaskbarProps) {
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const openWindows = windows.filter(w => w.isOpen)

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 h-[30px] flex items-center z-[9999]"
      style={{
        background: 'linear-gradient(180deg, #1f5fc2 0%, #245edb 3%, #3c8cf7 6%, #18399d 90%, #1941a5 100%)',
        borderTop: '1px solid #0d48a1'
      }}
    >
      {/* Start Button - More authentic XP style */}
      <button
        onClick={onStartClick}
        className={`h-full px-1 pr-3 flex items-center gap-[6px] text-white font-bold text-[11px] transition-all relative ${
          isStartOpen ? 'brightness-90' : 'hover:brightness-110'
        }`}
        style={{
          background: isStartOpen 
            ? 'linear-gradient(180deg, #2d7a2d 0%, #3c943c 20%, #2d7a2d 80%, #1d5a1d 100%)'
            : 'linear-gradient(180deg, #3c9a3c 0%, #5ab45a 8%, #3c9a3c 92%, #2d7a2d 100%)',
          borderRadius: '0 8px 8px 0',
          borderRight: '1px solid #1a6f1a',
          borderTop: '1px solid #6fc26f',
          borderLeft: '1px solid #2d7a2d',
          boxShadow: isStartOpen 
            ? 'inset 0 1px 3px rgba(0,0,0,0.4), inset 0 -1px 3px rgba(0,0,0,0.2)' 
            : 'inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.2)',
          fontFamily: 'Tahoma, Verdana, sans-serif',
          textShadow: '1px 1px 1px rgba(0,0,0,0.6)',
          fontWeight: 'bold'
        }}
      >
        {/* Windows Logo - More accurate */}
        <svg width="20" height="20" viewBox="0 0 100 100" className="transform -rotate-3 ml-1">
          <defs>
            <pattern id="taskFlagTexture" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="white" opacity="0.15"/>
            </pattern>
          </defs>
          {/* Red - Top Left */}
          <path d="M3,3 L45,3 L45,45 L3,45 Z" fill="#f25022" stroke="white" strokeWidth="0.5"/>
          {/* Green - Top Right */}
          <path d="M52,3 L97,3 L97,45 L52,45 Z" fill="#7fba00" stroke="white" strokeWidth="0.5"/>
          {/* Blue - Bottom Left */}
          <path d="M3,52 L45,52 L45,97 L3,97 Z" fill="#00a4ef" stroke="white" strokeWidth="0.5"/>
          {/* Yellow - Bottom Right */}
          <path d="M52,52 L97,52 L97,97 L52,97 Z" fill="#ffb900" stroke="white" strokeWidth="0.5"/>
          {/* Flag texture overlay */}
          <rect x="3" y="3" width="94" height="94" fill="url(#taskFlagTexture)" opacity="0.3"/>
        </svg>
        <span className="select-none">Inicio</span>
      </button>

      {/* Quick Launch Area */}
      <div className="flex items-center h-full px-1 gap-1">
        <div className="w-[2px] h-[20px] flex flex-col justify-between mx-1">
          <div className="w-full h-[8px] bg-[#1a4cb3]"></div>
          <div className="w-full h-[8px] bg-[#5c9eff]"></div>
        </div>
        
        {/* Quick launch icons */}
        <button className="w-6 h-6 flex items-center justify-center hover:bg-[#3c6eb4]/50 rounded">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
          </svg>
        </button>
        <button className="w-6 h-6 flex items-center justify-center hover:bg-[#3c6eb4]/50 rounded">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </button>
      </div>

      {/* Window buttons separator */}
      <div className="w-[2px] h-[20px] flex flex-col justify-between mx-1">
        <div className="w-full h-[8px] bg-[#1a4cb3]"></div>
        <div className="w-full h-[8px] bg-[#5c9eff]"></div>
      </div>

      {/* Open Windows */}
      <div className="flex-1 flex items-center gap-[3px] px-1 overflow-hidden">
        {openWindows.map(window => (
          <button
            key={window.id}
            onClick={() => onWindowClick(window.id)}
            className={`h-[22px] min-w-[140px] max-w-[180px] px-2 flex items-center gap-2 text-white text-[11px] rounded-[2px] truncate ${
              window.isMinimized 
                ? '' 
                : ''
            }`}
            style={{
              background: window.isMinimized 
                ? 'linear-gradient(180deg, #3e8ee8 0%, #2e6fd9 30%, #1f5fc2 70%, #18479e 100%)' 
                : 'linear-gradient(180deg, #1c4a8c 0%, #163d73 30%, #0f2f5a 70%, #0a2342 100%)',
              border: window.isMinimized 
                ? '1px solid #0054e3'
                : '1px solid #0a2342',
              boxShadow: window.isMinimized 
                ? '0 1px 0 rgba(255,255,255,0.2) inset' 
                : 'inset 0 1px 2px rgba(0,0,0,0.3)',
              fontFamily: 'Tahoma, Verdana, sans-serif'
            }}
          >
            <span className="text-sm shrink-0">{window.icon}</span>
            <span className="truncate">{window.title}</span>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div 
        className="h-full px-2 flex items-center gap-2"
        style={{
          background: 'linear-gradient(180deg, #0f8ced 0%, #0078d4 30%, #0066b8 70%, #0052a3 100%)',
          borderLeft: '2px solid #0052a3',
        }}
      >
        {/* System icons */}
        <div className="flex items-center gap-[2px] pr-2 border-r border-[#0052a3]">
          <button className="p-[2px] hover:bg-[#316ac5] rounded">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55A4 4 0 1014 20V7h4V3h-6z"/>
            </svg>
          </button>
          <button className="p-[2px] hover:bg-[#316ac5] rounded">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
            </svg>
          </button>
          <button className="p-[2px] hover:bg-[#316ac5] rounded">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </button>
        </div>
        
        {/* Clock */}
        <div 
          className="text-white text-[11px] px-1"
          style={{ fontFamily: 'Tahoma, Verdana, sans-serif' }}
        >
          {time}
        </div>
      </div>
    </div>
  )
}
