"use client"

import React, { useRef, useCallback } from "react"

interface DesktopIconProps {
  icon: string
  title: string
  isSelected?: boolean
  onClick?: (e: React.MouseEvent) => void
  onDoubleClick: () => void
  onTap?: () => void
  isMobile?: boolean
}

// XP-style icon components
const XPIcons = {
  'my-computer': (
    <svg viewBox="0 0 32 32" className="w-8 h-8">
      <rect x="4" y="8" width="24" height="16" fill="#4a90e2" stroke="#2c5aa0" strokeWidth="1"/>
      <rect x="6" y="10" width="20" height="12" fill="#87ceeb"/>
      <rect x="12" y="24" width="8" height="2" fill="#666"/>
      <rect x="8" y="26" width="16" height="2" fill="#888"/>
      <circle cx="10" cy="14" r="1" fill="#fff"/>
      <circle cx="14" cy="14" r="1" fill="#fff"/>
      <circle cx="18" cy="14" r="1" fill="#fff"/>
    </svg>
  ),
  'folder': (
    <svg viewBox="0 0 32 32" className="w-8 h-8">
      <path d="M4 8 L4 26 L28 26 L28 10 L16 10 L14 8 Z" fill="#f5d76e" stroke="#d4af37" strokeWidth="1"/>
      <rect x="6" y="12" width="20" height="12" fill="#fff" stroke="#ccc" strokeWidth="0.5"/>
    </svg>
  ),
  'documents': (
    <svg viewBox="0 0 32 32" className="w-8 h-8">
      <rect x="8" y="4" width="16" height="24" fill="#fff" stroke="#888" strokeWidth="1"/>
      <line x1="12" y1="10" x2="20" y2="10" stroke="#ccc" strokeWidth="1"/>
      <line x1="12" y1="14" x2="20" y2="14" stroke="#ccc" strokeWidth="1"/>
      <line x1="12" y1="18" x2="18" y2="18" stroke="#ccc" strokeWidth="1"/>
      <path d="M22 4 L28 10 L22 10 Z" fill="#e0e0e0" stroke="#888" strokeWidth="1"/>
    </svg>
  ),
  'notepad': (
    <svg viewBox="0 0 32 32" className="w-8 h-8">
      <rect x="6" y="4" width="20" height="24" fill="#fff" stroke="#888" strokeWidth="1"/>
      <rect x="8" y="2" width="16" height="6" fill="#f0f0f0" stroke="#888" strokeWidth="1"/>
      <line x1="10" y1="12" x2="22" y2="12" stroke="#ccc" strokeWidth="1"/>
      <line x1="10" y1="16" x2="22" y2="16" stroke="#ccc" strokeWidth="1"/>
      <line x1="10" y1="20" x2="18" y2="20" stroke="#ccc" strokeWidth="1"/>
      <line x1="10" y1="24" x2="20" y2="24" stroke="#ccc" strokeWidth="1"/>
    </svg>
  ),
  'calculator': (
    <svg viewBox="0 0 32 32" className="w-8 h-8">
      <rect x="6" y="4" width="20" height="24" fill="#e0e0e0" stroke="#888" strokeWidth="1"/>
      <rect x="8" y="6" width="16" height="4" fill="#333"/>
      <rect x="8" y="12" width="4" height="3" fill="#fff" stroke="#666" strokeWidth="0.5"/>
      <rect x="14" y="12" width="4" height="3" fill="#fff" stroke="#666" strokeWidth="0.5"/>
      <rect x="20" y="12" width="4" height="3" fill="#fff" stroke="#666" strokeWidth="0.5"/>
      <rect x="8" y="16" width="4" height="3" fill="#fff" stroke="#666" strokeWidth="0.5"/>
      <rect x="14" y="16" width="4" height="3" fill="#fff" stroke="#666" strokeWidth="0.5"/>
      <rect x="20" y="16" width="4" height="3" fill="#fff" stroke="#666" strokeWidth="0.5"/>
      <rect x="8" y="20" width="4" height="3" fill="#fff" stroke="#666" strokeWidth="0.5"/>
      <rect x="14" y="20" width="4" height="3" fill="#fff" stroke="#666" strokeWidth="0.5"/>
      <rect x="20" y="20" width="4" height="3" fill="#fff" stroke="#666" strokeWidth="0.5"/>
      <rect x="8" y="24" width="10" height="3" fill="#fff" stroke="#666" strokeWidth="0.5"/>
      <rect x="20" y="24" width="4" height="3" fill="#ff6b6b" stroke="#666" strokeWidth="0.5"/>
    </svg>
  ),
  'minesweeper': (
    <svg viewBox="0 0 32 32" className="w-8 h-8">
      <rect x="4" y="4" width="24" height="24" fill="#c0c0c0" stroke="#888" strokeWidth="1"/>
      <rect x="6" y="6" width="20" height="20" fill="#808080"/>
      <rect x="8" y="8" width="6" height="6" fill="#c0c0c0" stroke="#666" strokeWidth="0.5"/>
      <rect x="16" y="8" width="6" height="6" fill="#c0c0c0" stroke="#666" strokeWidth="0.5"/>
      <rect x="8" y="16" width="6" height="6" fill="#c0c0c0" stroke="#666" strokeWidth="0.5"/>
      <rect x="16" y="16" width="6" height="6" fill="#ff6b6b" stroke="#666" strokeWidth="0.5"/>
      <circle cx="19" cy="19" r="2" fill="#333"/>
    </svg>
  ),
  'recycle-bin': (
    <svg viewBox="0 0 32 32" className="w-8 h-8">
      <path d="M10 8 L22 8 L20 26 L12 26 Z" fill="#666" stroke="#333" strokeWidth="1"/>
      <path d="M8 6 L24 6 L22 8 L10 8 Z" fill="#888" stroke="#333" strokeWidth="1"/>
      <path d="M12 10 Q16 14 20 10" fill="none" stroke="#fff" strokeWidth="2"/>
      <path d="M13 14 Q16 18 19 14" fill="none" stroke="#fff" strokeWidth="2"/>
      <path d="M14 18 Q16 20 18 18" fill="none" stroke="#fff" strokeWidth="2"/>
    </svg>
  ),
  'experience': (
    <svg viewBox="0 0 32 32" className="w-8 h-8">
      <rect x="6" y="8" width="20" height="16" fill="#4a90e2" stroke="#2c5aa0" strokeWidth="1"/>
      <rect x="8" y="10" width="16" height="12" fill="#fff"/>
      <rect x="10" y="12" width="12" height="2" fill="#4a90e2"/>
      <rect x="10" y="16" width="8" height="1" fill="#ccc"/>
      <rect x="10" y="18" width="10" height="1" fill="#ccc"/>
      <rect x="10" y="20" width="6" height="1" fill="#ccc"/>
    </svg>
  ),
  'skills': (
    <svg viewBox="0 0 32 32" className="w-8 h-8">
      <rect x="4" y="10" width="24" height="12" fill="#f5d76e" stroke="#d4af37" strokeWidth="1"/>
      <circle cx="10" cy="16" r="3" fill="#fff" stroke="#d4af37" strokeWidth="1"/>
      <circle cx="16" cy="16" r="3" fill="#fff" stroke="#d4af37" strokeWidth="1"/>
      <circle cx="22" cy="16" r="3" fill="#fff" stroke="#d4af37" strokeWidth="1"/>
      <rect x="8" y="6" width="16" height="4" fill="#d4af37"/>
    </svg>
  ),
  'education': (
    <svg viewBox="0 0 32 32" className="w-8 h-8">
      <rect x="8" y="12" width="16" height="12" fill="#4a90e2" stroke="#2c5aa0" strokeWidth="1"/>
      <polygon points="16,4 4,12 28,12" fill="#f5d76e" stroke="#d4af37" strokeWidth="1"/>
      <rect x="14" y="20" width="4" height="4" fill="#d4af37"/>
      <circle cx="16" cy="16" r="2" fill="#fff"/>
    </svg>
  ),
  'contact': (
    <svg viewBox="0 0 32 32" className="w-8 h-8">
      <rect x="6" y="8" width="20" height="16" fill="#4a90e2" stroke="#2c5aa0" strokeWidth="1"/>
      <rect x="8" y="10" width="16" height="12" fill="#fff"/>
      <circle cx="16" cy="14" r="3" fill="#f5d76e" stroke="#d4af37" strokeWidth="1"/>
      <rect x="10" y="18" width="12" height="1" fill="#ccc"/>
      <rect x="10" y="20" width="8" height="1" fill="#ccc"/>
    </svg>
  ),
  'paint': (
    <svg viewBox="0 0 32 32" className="w-8 h-8">
      <rect x="4" y="4" width="24" height="20" fill="#f0f0f0" stroke="#888" strokeWidth="1"/>
      <rect x="6" y="6" width="20" height="16" fill="#fff"/>
      <path d="M8 12 L14 18 L18 14 L12 8 Z" fill="#ff6b6b" stroke="#333" strokeWidth="0.5"/>
      <circle cx="16" cy="16" r="2" fill="#4a90e2"/>
      <rect x="10" y="24" width="12" height="4" fill="#c0c0c0" stroke="#888" strokeWidth="1"/>
    </svg>
  ),
  'media-player': (
    <svg viewBox="0 0 32 32" className="w-8 h-8">
      <rect x="4" y="8" width="24" height="16" fill="#1e3a8a" stroke="#1e293b" strokeWidth="1"/>
      <circle cx="16" cy="16" r="6" fill="#3b82f6" stroke="#2563eb" strokeWidth="1"/>
      <polygon points="14,12 14,20 20,16" fill="#fff"/>
      <rect x="8" y="26" width="16" height="2" fill="#666"/>
    </svg>
  ),
  'internet-explorer': (
    <svg viewBox="0 0 32 32" className="w-8 h-8">
      <circle cx="16" cy="16" r="14" fill="#0078d4" stroke="#005a9e" strokeWidth="2"/>
      <path d="M8 16 Q8 8 16 8 Q24 8 24 16 Q24 24 16 24 Q8 24 8 16" fill="#fff"/>
      <circle cx="16" cy="16" r="6" fill="#0078d4"/>
      <path d="M12 16 Q12 12 16 12 Q20 12 20 16 Q20 20 16 20 Q12 20 12 16" fill="#fff"/>
    </svg>
  ),
  'wordpad': (
    <svg viewBox="0 0 32 32" className="w-8 h-8">
      <rect x="4" y="4" width="24" height="24" fill="#f0f0f0" stroke="#888" strokeWidth="1"/>
      <rect x="6" y="8" width="20" height="2" fill="#0078d4"/>
      <rect x="6" y="12" width="16" height="1" fill="#ccc"/>
      <rect x="6" y="15" width="18" height="1" fill="#ccc"/>
      <rect x="6" y="18" width="14" height="1" fill="#ccc"/>
      <rect x="6" y="21" width="16" height="1" fill="#ccc"/>
    </svg>
  ),
  'solitaire': (
    <svg viewBox="0 0 32 32" className="w-8 h-8">
      <rect x="6" y="4" width="20" height="24" fill="#0f7938" stroke="#0a5c2a" strokeWidth="1"/>
      <rect x="8" y="6" width="16" height="20" fill="#16a34a"/>
      <path d="M16 10 L12 14 L14 14 L14 18 L18 18 L18 14 L20 14 Z" fill="#fff"/>
      <circle cx="16" cy="22" r="2" fill="#dc2626"/>
    </svg>
  )
}

export function DesktopIcon({ 
  icon, 
  title, 
  isSelected, 
  onClick, 
  onDoubleClick,
  onTap,
  isMobile 
}: DesktopIconProps) {
  const lastTapRef = useRef<number>(0)
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (isMobile) {
      // Handle double-tap on mobile
      const now = Date.now()
      const timeSinceLastTap = now - lastTapRef.current
      
      if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
        // Double tap detected
        if (tapTimeoutRef.current) {
          clearTimeout(tapTimeoutRef.current)
        }
        onTap?.()
      } else {
        // Single tap - select first, then open on second tap
        onClick?.(e)
        tapTimeoutRef.current = setTimeout(() => {
          // If selected, open on single tap after short delay
          if (isSelected) {
            onTap?.()
          }
        }, 400)
      }
      lastTapRef.current = now
    } else {
      onClick?.(e)
    }
  }, [isMobile, onClick, onTap, isSelected])

  const getIconSVG = (iconName: string) => {
    switch (iconName) {
      case '🖥️': return XPIcons['my-computer']
      case '📁': return XPIcons['folder']
      case '💼': return XPIcons['experience']
      case '🛠️': return XPIcons['skills']
      case '🎓': return XPIcons['education']
      case '📧': return XPIcons['contact']
      case '🎨': return XPIcons['paint']
      case '🎵': return XPIcons['media-player']
      case '🌐': return XPIcons['internet-explorer']
      case '📄': return XPIcons['wordpad']
      case '🃏': return XPIcons['solitaire']
      case '📝': return XPIcons['notepad']
      case '🔢': return XPIcons['calculator']
      case '💣': return XPIcons['minesweeper']
      case '🗑️': return XPIcons['recycle-bin']
      default: return <span className="text-2xl">{iconName}</span>
    }
  }

  return (
    <button
      className={`w-[72px] h-[72px] flex flex-col items-center justify-start pt-2 gap-1 rounded ${
        isSelected 
          ? 'bg-[#316ac5]/60 border border-[#316ac5]' 
          : 'hover:bg-white/15 active:bg-[#316ac5]/40'
      } focus:outline-none transition-all duration-150 touch-manipulation`}
      onClick={handleClick}
      onDoubleClick={isMobile ? undefined : onDoubleClick}
      style={{
        boxShadow: isSelected ? '0 0 8px rgba(49, 106, 197, 0.4)' : 'none'
      }}
    >
      <div 
        className={`flex items-center justify-center ${isSelected ? 'brightness-110' : ''}`}
        style={{
          filter: isSelected 
            ? 'drop-shadow(0 0 3px rgba(49, 106, 197, 0.8))' 
            : 'drop-shadow(2px 2px 2px rgba(0,0,0,0.6))'
        }}
      >
        {getIconSVG(icon)}
      </div>
      <span 
        className={`text-[10px] md:text-[11px] text-center leading-tight px-1 py-0.5 rounded ${
          isSelected 
            ? 'bg-[#316ac5] text-white' 
            : 'text-white'
        }`}
        style={{ 
          textShadow: isSelected 
            ? 'none' 
            : '1px 1px 2px rgba(0,0,0,0.9), -1px -1px 2px rgba(0,0,0,0.6)',
          fontFamily: 'Tahoma, Verdana, sans-serif',
          fontWeight: isSelected ? 'bold' : 'normal',
          maxWidth: '68px',
          wordWrap: 'break-word'
        }}
      >
        {title}
      </span>
    </button>
  )
}
