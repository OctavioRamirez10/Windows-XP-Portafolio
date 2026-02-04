"use client"

import { useEffect, useState } from "react"

interface ShutdownScreenProps {
  type: 'shutdown' | 'logoff'
  onComplete: () => void
}

export function ShutdownScreen({ type, onComplete }: ShutdownScreenProps) {
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (type === 'logoff') {
      setMessage('Cerrando sesion...')
      const timer1 = setTimeout(() => setMessage('Guardando configuracion...'), 1000)
      const timer2 = setTimeout(() => onComplete(), 2500)
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    } else {
      setMessage('Guardando configuracion...')
      const timer1 = setTimeout(() => setMessage('Windows se esta apagando...'), 1500)
      const timer2 = setTimeout(() => onComplete(), 3500)
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
  }, [type, onComplete])

  if (type === 'logoff') {
    return (
      <div 
        className="fixed inset-0 flex flex-col items-center justify-center z-[99999]"
        style={{
          background: 'linear-gradient(180deg, #0052cc 0%, #0066ff 15%, #3399ff 40%, #0066ff 85%, #0052cc 100%)'
        }}
      >
        <div className="text-center text-white">
          <h2 
            className="text-[28px] mb-6 font-light"
            style={{ 
              fontFamily: 'Segoe UI, Franklin Gothic Medium, sans-serif',
              textShadow: '2px 2px 6px rgba(0,0,0,0.4)'
            }}
          >
            Cerrando sesion
          </h2>
          
          <div 
            className="w-[80px] h-[80px] mx-auto mb-4 rounded-[4px] flex items-center justify-center overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #87ceeb 0%, #4169e1 100%)',
              border: '3px solid white',
              boxShadow: '0 4px 15px rgba(0,0,0,0.4)'
            }}
          >
            <svg className="w-14 h-14 text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z"/>
            </svg>
          </div>
          
          <p 
            className="text-[14px] mt-4 opacity-90"
            style={{ fontFamily: 'Tahoma, Verdana, sans-serif' }}
          >
            {message}
          </p>
        </div>
      </div>
    )
  }

  // Shutdown screen - classic Windows XP style
  return (
    <div 
      className="fixed inset-0 flex flex-col items-center justify-center z-[99999]"
      style={{
        background: 'linear-gradient(180deg, #0052cc 0%, #0066ff 15%, #3399ff 40%, #0066ff 85%, #0052cc 100%)'
      }}
    >
      <div className="text-center">
        {/* Windows XP Logo */}
        <div className="flex items-center justify-center mb-8">
          <svg width="60" height="60" viewBox="0 0 88 88" className="transform -rotate-6 animate-pulse">
            <defs>
              <linearGradient id="shutRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff4e42" />
                <stop offset="100%" stopColor="#f25022" />
              </linearGradient>
              <linearGradient id="shutGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8bc441" />
                <stop offset="100%" stopColor="#7fba00" />
              </linearGradient>
              <linearGradient id="shutBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1ba1e2" />
                <stop offset="100%" stopColor="#00a4ef" />
              </linearGradient>
              <linearGradient id="shutYellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffc40d" />
                <stop offset="100%" stopColor="#ffb900" />
              </linearGradient>
            </defs>
            <path d="M2,2 Q20,8 38,2 L38,38 Q20,44 2,38 Z" fill="url(#shutRedGrad)" />
            <path d="M46,2 Q64,8 86,2 L86,38 Q64,44 46,38 Z" fill="url(#shutGreenGrad)" />
            <path d="M2,46 Q20,52 38,46 L38,86 Q20,80 2,86 Z" fill="url(#shutBlueGrad)" />
            <path d="M46,46 Q64,52 86,46 L86,86 Q64,80 46,86 Z" fill="url(#shutYellowGrad)" />
          </svg>
        </div>
        
        <h2 
          className="text-white text-[28px] mb-4 font-light"
          style={{ 
            fontFamily: 'Segoe UI, Franklin Gothic Medium, sans-serif',
            textShadow: '2px 2px 6px rgba(0,0,0,0.4)'
          }}
        >
          {message}
        </h2>
        
        {/* Loading dots */}
        <div className="flex justify-center gap-2 mt-4">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  )
}
