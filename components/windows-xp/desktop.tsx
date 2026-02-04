"use client"

import { useEffect } from "react"

import { useState, useCallback } from "react"
import type { WindowState } from "@/types/windows-xp"
import { Window } from "./window"
import { Taskbar } from "./taskbar"
import { StartMenu } from "./start-menu"
import { NotificationSystem, useNotifications } from "./notification-system"
import { DesktopIcon } from "./desktop-icon"
import { InternetExplorerContent } from "./contents/internet-explorer-content"
import { WordPadContent } from "./contents/wordpad-content"
import { SolitaireContent } from "./contents/solitaire-content"
import { PaintContent } from "./contents/paint-content"
import { MediaPlayerContent } from "./contents/media-player-content"
import { AboutContent } from "./contents/about-content"
import { ExperienceContent } from "./contents/experience-content"
import { SkillsContent } from "./contents/skills-content"
import { EducationContent } from "./contents/education-content"
import { ContactContent } from "./contents/contact-content"
import { MinesweeperContent } from "./contents/minesweeper-content"
import { NotepadContent } from "./contents/notepad-content"
import { CalculatorContent } from "./contents/calculator-content"
import { RecycleBinContent } from "./contents/recycle-bin-content"
import { MyComputerContent } from "./contents/my-computer-content"

import { MobileXPDesktop } from './mobile-xp-desktop'

interface DesktopProps {
  onLogoff: () => void
  onShutdown: () => void
}

const initialWindows: WindowState[] = [
  {
    id: 'my-computer',
    title: 'Mi PC',
    icon: '🖥️',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 50, y: 30 },
    size: { width: 700, height: 500 },
    content: null
  },
  {
    id: 'about',
    title: 'Mi Perfil',
    icon: '📁',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 100, y: 50 },
    size: { width: 650, height: 500 },
    content: null
  },
  {
    id: 'experience',
    title: 'Experiencia Laboral',
    icon: '💼',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 150, y: 80 },
    size: { width: 700, height: 520 },
    content: null
  },
  {
    id: 'skills',
    title: 'Habilidades',
    icon: '🛠️',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 120, y: 60 },
    size: { width: 750, height: 550 },
    content: null
  },
  {
    id: 'education',
    title: 'Educación',
    icon: '🎓',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 130, y: 70 },
    size: { width: 700, height: 550 },
    content: null
  },
  {
    id: 'contact',
    title: 'Contacto',
    icon: '📧',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 140, y: 90 },
    size: { width: 720, height: 500 },
    content: null
  },
  {
    id: 'notepad',
    title: 'Bloc de notas - Bienvenida.txt',
    icon: '📝',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 200, y: 100 },
    size: { width: 500, height: 400 },
    content: null
  },
  {
    id: 'internet-explorer',
    title: 'Internet Explorer',
    icon: '🌐',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 350, y: 100 },
    size: { width: 800, height: 600 },
    content: null
  },
  {
    id: 'wordpad',
    title: 'WordPad',
    icon: '📄',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 400, y: 140 },
    size: { width: 700, height: 550 },
    content: null
  },
  {
    id: 'solitaire',
    title: 'Solitario',
    icon: '🃏',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 500, y: 80 },
    size: { width: 750, height: 580 },
    content: null
  },
  {
    id: 'paint',
    title: 'Paint',
    icon: '🎨',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 250, y: 120 },
    size: { width: 650, height: 500 },
    content: null
  },
  {
    id: 'media-player',
    title: 'Windows Media Player',
    icon: '🎵',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 300, y: 140 },
    size: { width: 600, height: 450 },
    content: null
  },
  {
    id: 'minesweeper',
    title: 'Buscaminas',
    icon: '💣',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 350, y: 80 },
    size: { width: 320, height: 420 },
    content: null
  },
  {
    id: 'calculator',
    title: 'Calculadora',
    icon: '🔢',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 400, y: 120 },
    size: { width: 260, height: 340 },
    content: null
  },
  {
    id: 'recycle-bin',
    title: 'Papelera de reciclaje',
    icon: '🗑️',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 450, y: 160 },
    size: { width: 600, height: 400 },
    content: null
  },
]

const desktopIconsData = [
  { id: 'my-computer', title: 'Mi PC', icon: '🖥️', position: { row: 0, col: 0 } },
  { id: 'about', title: 'Mi Perfil', icon: '📁', position: { row: 1, col: 0 } },
  { id: 'experience', title: 'Experiencia', icon: '💼', position: { row: 2, col: 0 } },
  { id: 'skills', title: 'Habilidades', icon: '🛠️', position: { row: 3, col: 0 } },
  { id: 'education', title: 'Educación', icon: '🎓', position: { row: 4, col: 0 } },
  { id: 'contact', title: 'Contacto', icon: '📧', position: { row: 5, col: 0 } },
  { id: 'notepad', title: 'Bloc de Notas', icon: '📝', position: { row: 0, col: 1 } },
  { id: 'internet-explorer', title: 'Internet', icon: '🌐', position: { row: 1, col: 1 } },
  { id: 'wordpad', title: 'WordPad', icon: '📄', position: { row: 2, col: 1 } },
  { id: 'paint', title: 'Paint', icon: '🎨', position: { row: 3, col: 1 } },
  { id: 'media-player', title: 'Media Player', icon: '🎵', position: { row: 4, col: 1 } },
  { id: 'solitaire', title: 'Solitario', icon: '🃏', position: { row: 5, col: 1 } },
  { id: 'minesweeper', title: 'Buscaminas', icon: '💣', position: { row: 0, col: 2 } },
  { id: 'calculator', title: 'Calculadora', icon: '🔢', position: { row: 1, col: 2 } },
  { id: 'recycle-bin', title: 'Papelera', icon: '🗑️', position: { row: 6, col: 0 } },
]

export function Desktop({ onLogoff, onShutdown }: DesktopProps) {
  const [windows, setWindows] = useState<WindowState[]>(initialWindows)
  const [isStartOpen, setIsStartOpen] = useState(false)
  const [maxZIndex, setMaxZIndex] = useState(1)
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [desktopIcons, setDesktopIcons] = useState(desktopIconsData)
  const [showContextMenu, setShowContextMenu] = useState<{ x: number; y: number } | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [draggedIcon, setDraggedIcon] = useState<string | null>(null)
  const [desktopCircles, setDesktopCircles] = useState<Array<{id: string, x: number, y: number, size: number, color: string}>>([])
  const {
    notifications,
    addNotification,
    removeNotification,
    showWelcome,
    showNewEmail,
    showSystemUpdate,
    showAchievement
  } = useNotifications()

  // Mobile detection and responsive setup
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Show welcome notification
    setTimeout(() => {
      showWelcome()
    }, 2000)
    
    // Show random notifications periodically
    const notificationInterval = setInterval(() => {
      const random = Math.random()
      if (random < 0.3) {
        showNewEmail()
      } else if (random < 0.5) {
        showAchievement("¡Has explorado 5 aplicaciones!")
      } else if (random < 0.7) {
        showSystemUpdate()
      }
    }, 15000)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      clearInterval(notificationInterval)
    }
  }, [])

  // Handle desktop right-click
  const handleDesktopRightClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowContextMenu({ x: e.clientX, y: e.clientY })
  }

  // Handle icon drag and drop
  const handleIconMouseDown = (iconId: string, e: React.MouseEvent) => {
    setDraggedIcon(iconId)
    const startX = e.clientX
    const startY = e.clientY
    const icon = desktopIcons.find(i => i.id === iconId)
    if (!icon) return
    
    const startRow = icon.position.row
    const startCol = icon.position.col
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX
      const deltaY = moveEvent.clientY - startY
      
      // Calculate new grid position
      const newCol = Math.max(0, Math.min(2, startCol + Math.round(deltaX / 100)))
      const newRow = Math.max(0, Math.min(6, startRow + Math.round(deltaY / 100)))
      
      setDesktopIcons(prev => prev.map(i => 
        i.id === iconId ? { ...i, position: { row: newRow, col: newCol } } : i
      ))
    }
    
    const handleMouseUp = () => {
      setDraggedIcon(null)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      showAchievement("¡Escritorio actualizado!")
    }, 1000)
  }

  // Add desktop circles on click
  const handleDesktopClick = (e: React.MouseEvent) => {
    if (e.shiftKey) {
      const newCircle = {
        id: Date.now().toString(),
        x: e.clientX,
        y: e.clientY,
        size: 20 + Math.random() * 40,
        color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'][Math.floor(Math.random() * 5)]
      }
      setDesktopCircles(prev => [...prev, newCircle])
    }
    setIsStartOpen(false)
    setSelectedIcon(null)
    setShowContextMenu(null)
  }

  const openWindow = useCallback((windowId: string) => {
    setMaxZIndex(prev => prev + 1)
    setWindows(prev => prev.map(w => 
      w.id === windowId 
        ? { 
            ...w, 
            isOpen: true, 
            isMinimized: false, 
            zIndex: maxZIndex + 1,
            // On mobile, always maximize windows
            isMaximized: isMobile ? true : w.isMaximized,
            position: isMobile ? { x: 0, y: 0 } : w.position
          }
        : w
    ))
    setIsStartOpen(false)
  }, [maxZIndex, isMobile])

  const closeWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, isOpen: false, isMinimized: false, isMaximized: false } : w
    ))
  }, [])

  const minimizeWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, isMinimized: true } : w
    ))
  }, [])

  const maximizeWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w
    ))
  }, [])

  const focusWindow = useCallback((windowId: string) => {
    setMaxZIndex(prev => prev + 1)
    setWindows(prev => prev.map(w => 
      w.id === windowId 
        ? { ...w, zIndex: maxZIndex + 1, isMinimized: false }
        : w
    ))
  }, [maxZIndex])

  const moveWindow = useCallback((windowId: string, position: { x: number; y: number }) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, position } : w
    ))
  }, [])

  const resizeWindow = useCallback((windowId: string, size: { width: number; height: number }) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, size } : w
    ))
  }, [])

  const handleTaskbarWindowClick = useCallback((windowId: string) => {
    const window = windows.find(w => w.id === windowId)
    if (window?.isMinimized) {
      focusWindow(windowId)
    } else {
      minimizeWindow(windowId)
    }
  }, [windows, focusWindow, minimizeWindow])

  const handleDesktopClick = () => {
    setIsStartOpen(false)
    setSelectedIcon(null)
  }

  const getWindowContent = (windowId: string) => {
    switch (windowId) {
      case 'my-computer': return <MyComputerContent onOpenFolder={openWindow} />
      case 'about': return <AboutContent />
      case 'experience': return <ExperienceContent />
      case 'skills': return <SkillsContent />
      case 'education': return <EducationContent />
      case 'contact': return <ContactContent />
      case 'notepad': return <NotepadContent />
      case 'internet-explorer': return <InternetExplorerContent />
      case 'wordpad': return <WordPadContent />
      case 'paint': return <PaintContent />
      case 'solitaire': return <SolitaireContent />
      case 'media-player': return <MediaPlayerContent />
      case 'minesweeper': return <MinesweeperContent />
      case 'calculator': return <CalculatorContent />
      case 'recycle-bin': return <RecycleBinContent />
      default: return null
    }
  }

  // Responsive layout - use mobile component on small screens
  if (isMobile) {
    return <MobileXPDesktop onLogoff={onLogoff} onShutdown={onShutdown} />
  }

  return (
    <div 
      className="fixed inset-0 overflow-hidden select-none touch-manipulation"
      style={{
        // Authentic Windows XP Bliss wallpaper recreation
        background: `
          radial-gradient(ellipse 120% 80% at 30% 10%, #87ceeb 0%, #5eb3e4 15%, #4682b4 35%, #2e7dd1 50%, #245edb 65%, #1a5490 80%, #0d3d7a 95%, #062654 100%),
          linear-gradient(180deg, 
            #87ceeb 0%,
            #5eb3e4 8%,
            #4682b4 18%,
            #2e7dd1 28%,
            #245edb 38%,
            #1a5490 48%,
            #4fa8f5 55%,
            #6dc4e8 62%,
            #78cce0 68%,
            #8fd4a8 75%,
            #7bc788 82%,
            #6ab878 88%,
            #5eaa68 92%,
            #58a05c 95%,
            #4a8a4e 98%,
            #3d7a42 100%
          )
        `,
      }}
      onClick={handleDesktopClick}
    >
      {/* More authentic cloud effect for sky */}
      <div 
        className="absolute top-0 left-0 right-0 h-[45%] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 90% 60% at 15% 25%, rgba(255,255,255,0.25) 0%, transparent 45%),
            radial-gradient(ellipse 70% 50% at 75% 15%, rgba(255,255,255,0.18) 0%, transparent 35%),
            radial-gradient(ellipse 60% 40% at 45% 35%, rgba(255,255,255,0.12) 0%, transparent 40%),
            radial-gradient(ellipse 50% 30% at 85% 45%, rgba(255,255,255,0.08) 0%, transparent 30%)
          `
        }}
      />
      
      {/* More realistic grass/hill texture overlay */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[60%] pointer-events-none"
        style={{
          background: `
            linear-gradient(180deg,
              transparent 0%,
              rgba(95, 170, 85, 0.15) 12%,
              rgba(85, 160, 75, 0.25) 25%,
              rgba(75, 150, 65, 0.4) 38%,
              rgba(65, 140, 55, 0.55) 50%,
              rgba(55, 130, 45, 0.7) 63%,
              rgba(45, 120, 35, 0.85) 75%,
              rgba(35, 110, 25, 0.95) 88%,
              rgba(25, 100, 15, 1) 100%
            ),
            repeating-linear-gradient(90deg,
              transparent,
              transparent 3px,
              rgba(255,255,255,0.02) 3px,
              rgba(255,255,255,0.02) 6px
            )
          `
        }}
      />
      
      {/* Subtle texture overlay for CRT effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, transparent 1px, transparent 2px, rgba(0,0,0,0.03) 3px),
            repeating-linear-gradient(90deg, rgba(0,0,0,0.02) 0px, transparent 1px, transparent 2px, rgba(0,0,0,0.02) 3px)
          `
        }}
      />

      {/* Desktop Icons - Responsive grid */}
      <div 
        className="absolute top-2 left-2 right-2 md:right-auto grid gap-1 p-1" 
        style={{ 
          gridTemplateColumns: isMobile ? 'repeat(auto-fill, 70px)' : 'repeat(3, 75px)', 
          gridTemplateRows: isMobile ? 'auto' : 'repeat(7, 75px)' 
        }}
      >
        {desktopIcons.map(icon => (
          <div 
            key={icon.id}
            className={isMobile ? '' : ''}
            style={isMobile ? {} : { 
              gridRow: icon.position.row + 1,
              gridColumn: icon.position.col + 1 
            }}
          >
            <DesktopIcon
              icon={icon.icon}
              title={icon.title}
              isSelected={selectedIcon === icon.id}
              onClick={(e) => {
                e.stopPropagation()
                setSelectedIcon(icon.id)
              }}
              onDoubleClick={() => openWindow(icon.id)}
              onTap={() => openWindow(icon.id)}
              isMobile={isMobile}
            />
          </div>
        ))}
      </div>

      {/* Windows */}
      {windows.map(window => (
        <Window
          key={window.id}
          window={window}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onMaximize={() => maximizeWindow(window.id)}
          onFocus={() => focusWindow(window.id)}
          onMove={(pos) => moveWindow(window.id, pos)}
          onResize={(size) => resizeWindow(window.id, size)}
        >
          {getWindowContent(window.id)}
        </Window>
      ))}

      {/* Start Menu */}
      <StartMenu
        isOpen={isStartOpen}
        onClose={() => setIsStartOpen(false)}
        onOpenWindow={openWindow}
        onLogoff={onLogoff}
        onShutdown={onShutdown}
        isMobile={isMobile}
      />

      {/* Notification System */}
      <NotificationSystem 
        notifications={notifications} 
        onRemove={removeNotification} 
      />

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        onWindowClick={handleTaskbarWindowClick}
        onStartClick={(e) => {
          e?.stopPropagation?.()
          setIsStartOpen(!isStartOpen)
        }}
        isStartOpen={isStartOpen}
        isMobile={isMobile}
      />
    </div>
  )
}
