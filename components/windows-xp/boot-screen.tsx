"use client"

import { useEffect, useState } from "react"

interface BootScreenProps {
  onComplete: () => void
}

export function BootScreen({ onComplete }: BootScreenProps) {
  const [phase, setPhase] = useState<'bios' | 'loading' | 'welcome'>('bios')

  useEffect(() => {
    const biosTimer = setTimeout(() => {
      setPhase('loading')
    }, 2000)
    return () => clearTimeout(biosTimer)
  }, [])

  useEffect(() => {
    if (phase === 'loading') {
      const loadingTimer = setTimeout(() => {
        setPhase('welcome')
      }, 4000)
      return () => clearTimeout(loadingTimer)
    }
  }, [phase])

  useEffect(() => {
    if (phase === 'welcome') {
      const welcomeTimer = setTimeout(() => {
        onComplete()
      }, 2500)
      return () => clearTimeout(welcomeTimer)
    }
  }, [phase, onComplete])

  // BIOS Screen
  if (phase === 'bios') {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-start justify-start p-2 font-mono text-sm text-[#aaaaaa] overflow-hidden">
        <div className="w-full">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-white">Phoenix - AwardBIOS v6.00PG, An Energy Star Ally</p>
              <p>Copyright (C) 1984-2003, Phoenix Technologies, LTD</p>
            </div>
          </div>
          
          <p className="text-white mt-4">Octavio Ramirez Portfolio PC</p>
          <p className="mt-2">Main Processor : Intel(R) Creative Developer(TM) CPU @ 3.40GHz</p>
          <p className="text-white">Memory Testing : 16384K OK</p>
          
          <div className="mt-4">
            <p>Detecting IDE Primary Master... [Portfolio SSD]</p>
            <p>Detecting IDE Primary Slave... [None]</p>
            <p>Detecting IDE Secondary Master... [CD-ROM]</p>
            <p>Detecting IDE Secondary Slave... [None]</p>
          </div>
          
          <div className="mt-4 text-yellow-500">
            <p>Press DEL to enter SETUP</p>
            <p>Press F8 for BBS POPUP</p>
          </div>
          
          <p className="mt-4 text-white animate-pulse">Starting Windows XP...</p>
        </div>
      </div>
    )
  }

  // Windows XP Loading Screen
  if (phase === 'loading') {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center">
        {/* Windows XP Logo - Authentic style */}
        <div className="flex items-center mb-12">
          {/* Use the logo image */}
          <div className="relative mr-4">
            <img 
              src="/windows-xp-logo-official.webp" 
              alt="Windows XP" 
              className="w-48 h-48 object-contain animate-pulse"
              onError={(e) => {
                // Fallback to inline SVG if image not found
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                target.nextElementSibling?.classList.remove('hidden')
              }}
            />
            {/* Fallback SVG */}
            <svg 
              width="192" 
              height="192" 
              viewBox="0 0 100 100" 
              className="transform -rotate-6 animate-pulse hidden"
            >
              <defs>
                <pattern id="flagTexture" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <rect width="100" height="100" fill="white" opacity="0.1"/>
                  <circle cx="25" cy="25" r="0.5" fill="white" opacity="0.2"/>
                  <circle cx="75" cy="75" r="0.5" fill="white" opacity="0.2"/>
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
              <rect x="3" y="3" width="94" height="94" fill="url(#flagTexture)" opacity="0.3"/>
            </svg>
          </div>
          
          {/* Windows Text - More authentic typography */}
          <div className="text-white">
            <div className="flex items-baseline">
              <span 
                className="text-[52px] font-light tracking-tight"
                style={{ 
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  fontWeight: '300',
                  letterSpacing: '-1px'
                }}
              >
                Microsoft
              </span>
              <sup className="text-[18px] ml-1 font-bold">®</sup>
            </div>
            <div className="flex items-baseline -mt-2">
              <span 
                className="text-[60px] font-bold"
                style={{ 
                  fontFamily: 'Arial Black, Arial Bold, sans-serif',
                  fontWeight: '900',
                  letterSpacing: '-2px'
                }}
              >
                Windows
              </span>
              <span 
                className="text-[36px] font-bold text-[#ffb900] ml-1"
                style={{ 
                  fontFamily: 'Arial Black, Arial Bold, sans-serif',
                  fontWeight: '900',
                  letterSpacing: '-1px'
                }}
              >
                XP
              </span>
            </div>
          </div>
        </div>
        
        {/* Loading Bar Container - More authentic XP style */}
        <div className="relative w-[280px] h-[28px] bg-[#0a0a0a] rounded-[4px] overflow-hidden" 
          style={{ 
            boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.9), inset -1px -1px 2px rgba(255,255,255,0.1)',
            border: '2px solid #333'
          }}>
          {/* Inner border */}
          <div className="absolute inset-[2px] bg-[#1a1a1a] rounded-[2px]"/>
          {/* Loading blocks animation - More authentic */}
          <div className="absolute inset-[2px] flex items-center overflow-hidden rounded-[2px]">
            <div className="flex gap-[2px] animate-xp-loading pl-2">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i}
                  className="w-[28px] h-[16px] rounded-[1px]"
                  style={{
                    background: 'linear-gradient(180deg, #87ceeb 0%, #4682b4 30%, #1e90ff 60%, #0066cc 100%)',
                    boxShadow: '0 0 6px rgba(135,206,235,0.8), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.3)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Progress text */}
        <p className="mt-3 text-white text-sm font-medium" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
          Cargando Windows XP...
        </p>
        
        {/* Copyright */}
        <p className="absolute bottom-8 text-[#888] text-xs">
          Copyright © Microsoft Corporation
        </p>
        
        <style jsx>{`
          @keyframes xp-loading {
            0% { transform: translateX(-120px); }
            100% { transform: translateX(320px); }
          }
          .animate-xp-loading {
            animation: xp-loading 2.2s ease-in-out infinite;
          }
        `}</style>
      </div>
    )
  }

  // Welcome Screen - More authentic XP style
  if (phase === 'welcome') {
    return (
      <div 
        className="fixed inset-0 flex flex-col items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #6699ff 0%, #3366cc 25%, #0066cc 50%, #004080 75%, #002050 100%)'
        }}
      >
        {/* XP-style background pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px),
              repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(0,0,0,.1) 35px, rgba(0,0,0,.1) 70px)
            `
          }}
        />
        
        {/* Welcome text */}
        <div className="text-center mb-8 relative z-10">
          <h1 
            className="text-white text-5xl font-light tracking-wide"
            style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              textShadow: '3px 3px 12px rgba(0,0,0,0.6), 0 0 20px rgba(255,255,255,0.2)'
            }}
          >
            Bienvenido
          </h1>
        </div>
        
        {/* User Avatar - More authentic style */}
        <div className="flex flex-col items-center relative z-10">
          <div 
            className="w-[120px] h-[120px] rounded-[2px] flex items-center justify-center mb-4 overflow-hidden relative"
            style={{
              background: 'linear-gradient(135deg, #4169e1 0%, #1e90ff 50%, #87ceeb 100%)',
              border: '4px solid white',
              boxShadow: '0 6px 20px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.3)'
            }}
          >
            {/* User icon */}
            <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z"/>
            </svg>
            {/* Avatar frame effect */}
            <div 
              className="absolute inset-0 border-2 border-white/30"
              style={{
                boxShadow: 'inset 0 0 8px rgba(0,0,0,0.3)'
              }}
            />
          </div>
          <p 
            className="text-white text-2xl font-semibold"
            style={{ 
              textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
              fontFamily: 'Tahoma, Arial, sans-serif'
            }}
          >
            Octavio Ramirez
          </p>
        </div>
        
        {/* Loading indicator - More XP style */}
        <div className="mt-10 flex flex-col items-center relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
          </div>
          <p className="text-white/90 text-base" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
            Cargando su configuración personal...
          </p>
        </div>
        
        {/* XP-style bottom decoration */}
        <div className="absolute bottom-6 left-0 right-0 text-center">
          <p className="text-white/60 text-xs" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
            Microsoft Windows XP
          </p>
          <p className="text-white/40 text-xs mt-1" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
            Professional
          </p>
        </div>
      </div>
    )
  }

  return null
}
