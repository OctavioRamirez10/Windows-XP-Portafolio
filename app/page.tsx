"use client"

import { useState, useCallback } from "react"
import { BootScreen } from "@/components/windows-xp/boot-screen"
import { Desktop } from "@/components/windows-xp/desktop"
import { ShutdownScreen } from "@/components/windows-xp/shutdown-screen"
import type { BootPhase } from "@/types/windows-xp"

export default function Home() {
  const [phase, setPhase] = useState<BootPhase>('bios')

  const handleBootComplete = useCallback(() => {
    setPhase('desktop')
  }, [])

  const handleLogoff = useCallback(() => {
    setPhase('logoff')
  }, [])

  const handleShutdown = useCallback(() => {
    setPhase('shutdown')
  }, [])

  const handleShutdownComplete = useCallback(() => {
    if (phase === 'logoff') {
      setPhase('bios')
    } else {
      setPhase('off')
    }
  }, [phase])

  const handleStartup = useCallback(() => {
    setPhase('bios')
  }, [])

  // Off screen - black with power button (like a turned off monitor)
  if (phase === 'off') {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center">
        {/* CRT effect overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)',
          }}
        />
        
        {/* Power button */}
        <button
          onClick={handleStartup}
          className="w-24 h-24 rounded-full flex items-center justify-center transition-all group relative"
          style={{
            background: 'linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 50%, #1a1a1a 100%)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.8), inset 0 2px 4px rgba(255,255,255,0.05)',
            border: '3px solid #333'
          }}
        >
          <div 
            className="absolute inset-2 rounded-full"
            style={{
              background: 'linear-gradient(145deg, #222 0%, #111 100%)',
              boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.8)'
            }}
          />
          <svg 
            className="w-10 h-10 text-gray-600 group-hover:text-green-500 transition-colors z-10 relative" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            style={{ filter: 'drop-shadow(0 0 3px currentColor)' }}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2.5} 
              d="M12 3v6m0 0a6 6 0 11-6 6 6 6 0 016-6z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2.5} 
              d="M12 3v6" 
            />
          </svg>
          
          {/* Power LED indicator */}
          <div 
            className="absolute bottom-1 w-2 h-2 rounded-full bg-red-900 group-hover:bg-green-500 transition-colors"
            style={{ boxShadow: '0 0 4px currentColor' }}
          />
        </button>
        
        <p 
          className="text-gray-600 mt-6 text-sm tracking-wide"
          style={{ fontFamily: 'Tahoma, Verdana, sans-serif' }}
        >
          Haz clic para encender el equipo
        </p>
        
        {/* Branding */}
        <div className="absolute bottom-8 text-gray-700 text-xs">
          <p>Octavio Ramirez Portfolio PC</p>
        </div>
      </div>
    )
  }

  // Boot screen
  if (phase === 'bios') {
    return <BootScreen onComplete={handleBootComplete} />
  }

  // Shutdown/Logoff screen
  if (phase === 'shutdown' || phase === 'logoff') {
    return (
      <ShutdownScreen 
        type={phase as 'shutdown' | 'logoff'} 
        onComplete={handleShutdownComplete} 
      />
    )
  }

  // Desktop
  return (
    <Desktop 
      onLogoff={handleLogoff}
      onShutdown={handleShutdown}
    />
  )
}
