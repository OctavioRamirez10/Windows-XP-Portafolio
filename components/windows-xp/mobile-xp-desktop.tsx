"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { useNotifications } from './notification-system'
import { MobileWindow, MobileTaskbar, MobileStartMenu, MobileNotification } from './mobile-components'
import { MobileSolitaire, MobileMinesweeper, MobileCalculator } from './mobile-games'

interface MobileXPDesktopProps {
  onLogoff: () => void
  onShutdown: () => void
}

export function MobileXPDesktop({ onLogoff, onShutdown }: MobileXPDesktopProps) {
  const [activeApp, setActiveApp] = useState<string | null>(null)
  const [showStartMenu, setShowStartMenu] = useState(false)
  const [showAppGrid, setShowAppGrid] = useState(false)
  const [openApps, setOpenApps] = useState<Array<{ id: string; title: string; icon: string }>>([])
  const [notifications, setNotifications] = useState<Array<{ id: string; title: string; message: string; icon: string; type: 'info' | 'success' | 'warning' | 'error' }>>([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null)
  
  const { showWelcome, showNewEmail, showAchievement, showSystemUpdate } = useNotifications()

  // Mobile apps configuration
  const mobileApps = [
    { id: 'about', title: 'Mi Perfil', icon: '👤', color: 'bg-blue-500' },
    { id: 'experience', title: 'Experiencia', icon: '💼', color: 'bg-green-500' },
    { id: 'skills', title: 'Habilidades', icon: '🛠️', color: 'bg-purple-500' },
    { id: 'education', title: 'Educación', icon: '🎓', color: 'bg-yellow-500' },
    { id: 'contact', title: 'Contacto', icon: '📧', color: 'bg-red-500' },
    { id: 'notepad', title: 'Bloc', icon: '📝', color: 'bg-gray-500' },
    { id: 'internet', title: 'Internet', icon: '🌐', color: 'bg-blue-400' },
    { id: 'paint', title: 'Paint', icon: '🎨', color: 'bg-pink-500' },
    { id: 'media', title: 'Media', icon: '🎵', color: 'bg-orange-500' },
    { id: 'solitaire', title: 'Solitario', icon: '🃏', color: 'bg-green-400' },
    { id: 'minesweeper', title: 'Buscaminas', icon: '💣', color: 'bg-red-400' },
    { id: 'calculator', title: 'Calculadora', icon: '🔢', color: 'bg-indigo-500' },
  ]

  // Touch handlers for mobile gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    setTouchStart({ x: touch.clientX, y: touch.clientY })
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return
    
    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchStart.x
    const deltaY = touch.clientY - touchStart.y
    
    // Detect swipe direction
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      setSwipeDirection(deltaX > 0 ? 'right' : 'left')
    } else if (Math.abs(deltaY) > 50 && Math.abs(deltaY) > Math.abs(deltaX)) {
      setSwipeDirection(deltaY > 0 ? 'down' : 'up')
    }
    
    // Handle gestures
    if (deltaY < -50 && Math.abs(deltaX) < 50) {
      // Swipe up - Show app grid
      setShowAppGrid(true)
    } else if (deltaY > 50 && Math.abs(deltaX) < 50) {
      // Swipe down - Hide app grid
      setShowAppGrid(false)
    } else if (deltaX < -50 && Math.abs(deltaY) < 50) {
      // Swipe left - Go back
      setActiveApp(null)
    }
    
    setTouchStart(null)
    setTimeout(() => setSwipeDirection(null), 500)
  }

  // Handle refresh with pull-to-refresh
  const handlePullToRefresh = useCallback(() => {
    setIsRefreshing(true)
    showAchievement("¡Escritorio actualizado!")
    setTimeout(() => setIsRefreshing(false), 1000)
  }, [showAchievement])

  // Handle app selection
  const handleAppClick = (appId: string) => {
    const app = mobileApps.find(a => a.id === appId)
    if (app && !openApps.find(a => a.id === appId)) {
      setOpenApps(prev => [...prev, app])
    }
    setActiveApp(appId)
    setShowAppGrid(false)
    showAchievement(`Abriendo ${app?.title}...`)
  }

  // Handle app close
  const handleAppClose = (appId: string) => {
    setOpenApps(prev => prev.filter(app => app.id !== appId))
    if (activeApp === appId) {
      setActiveApp(null)
    }
  }

  // Handle long press for context menu
  const handleLongPress = (appId: string) => {
    showAchievement(`Opciones de ${mobileApps.find(app => app.id === appId)?.title}`)
  }

  // Initialize mobile experience
  useEffect(() => {
    showWelcome()
    
    // Periodic notifications
    const interval = setInterval(() => {
      const random = Math.random()
      if (random < 0.3) showNewEmail()
      else if (random < 0.6) showAchievement("¡Sigue explorando!")
      else showSystemUpdate()
    }, 20000)
    
    return () => clearInterval(interval)
  }, [showWelcome, showNewEmail, showAchievement, showSystemUpdate])

  return (
    <div className="h-screen w-full overflow-hidden bg-gradient-to-b from-blue-400 to-blue-600 relative">
      
      {/* Pull to Refresh Indicator */}
      {isRefreshing && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-sm">
          <div className="flex justify-center py-4">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"/>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div 
        className="h-full flex flex-col"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        
        {/* Header Bar */}
        <div className="bg-black/20 backdrop-blur-md px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowAppGrid(!showAppGrid)}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 5h14v2H3V5zm0 4h14v2H3V9zm0 4h14v2H3v-2z"/>
              </svg>
            </button>
            <h1 className="text-white font-bold text-lg">Windows XP Mobile</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePullToRefresh}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            >
              🔄
            </button>
            <button 
              onClick={() => setShowStartMenu(!showStartMenu)}
              className="p-2 rounded-lg bg-green-500 hover:bg-green-600 transition-colors"
            >
              ▶️
            </button>
          </div>
        </div>

        {/* App Grid View */}
        {showAppGrid && (
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="grid grid-cols-3 gap-4">
              {mobileApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleAppClick(app.id)}
                  onContextMenu={() => handleLongPress(app.id)}
                  className={`${app.color} rounded-2xl p-4 flex flex-col items-center gap-2 transform transition-all hover:scale-105 active:scale-95 shadow-lg`}
                >
                  <span className="text-3xl">{app.icon}</span>
                  <span className="text-white text-xs font-medium text-center">{app.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Active App Window */}
        {activeApp && (
          <MobileWindow
            title={mobileApps.find(app => app.id === activeApp)?.title || ''}
            icon={mobileApps.find(app => app.id === activeApp)?.icon || ''}
            onClose={() => handleAppClose(activeApp)}
          >
            <MobileAppContent appId={activeApp} />
          </MobileWindow>
        )}

        {/* Default Desktop View */}
        {!activeApp && !showAppGrid && (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mb-8 animate-pulse">
                <span className="text-6xl">🖥️</span>
              </div>
              <h2 className="text-white text-2xl font-bold mb-4">Windows XP Mobile</h2>
              <p className="text-white/80 mb-8">Desliza hacia arriba para ver aplicaciones</p>
              
              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                <button 
                  onClick={() => setShowAppGrid(true)}
                  className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-white hover:bg-white/30 transition-colors"
                >
                  📱 Aplicaciones
                </button>
                <button 
                  onClick={handlePullToRefresh}
                  className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-white hover:bg-white/30 transition-colors"
                >
                  🔄 Actualizar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Swipe Indicator */}
        {swipeDirection && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {swipeDirection === 'up' && '⬆️ Deslizar arriba'}
              {swipeDirection === 'down' && '⬇️ Deslizar abajo'}
              {swipeDirection === 'left' && '⬅️ Deslizar izquierda'}
              {swipeDirection === 'right' && '➡️ Deslizar derecha'}
            </div>
          </div>
        )}

        {/* Start Menu */}
        {showStartMenu && (
          <div className="absolute bottom-20 left-4 right-4 bg-black/90 backdrop-blur-lg rounded-2xl p-4">
            <div className="grid grid-cols-4 gap-4">
              <button 
                onClick={() => { setActiveApp('about'); setShowStartMenu(false) }}
                className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <span className="text-2xl">👤</span>
                <span className="text-white text-xs">Perfil</span>
              </button>
              <button 
                onClick={() => { setActiveApp('contact'); setShowStartMenu(false) }}
                className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <span className="text-2xl">📧</span>
                <span className="text-white text-xs">Contacto</span>
              </button>
              <button 
                onClick={onLogoff}
                className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <span className="text-2xl">🚪</span>
                <span className="text-white text-xs">Cerrar</span>
              </button>
              <button 
                onClick={onShutdown}
                className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-red-500/20 transition-colors"
              >
                <span className="text-2xl">⏻️</span>
                <span className="text-white text-xs">Apagar</span>
              </button>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <MobileTaskbar 
          openApps={openApps}
          onAppClick={setActiveApp}
          onStartClick={() => setShowStartMenu(!showStartMenu)}
        />
      </div>
    </div>
  )
}

// Mobile App Content Component
function MobileAppContent({ appId }: { appId: string }) {
  const appContent = {
    about: {
      title: 'Mi Perfil',
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl">👤</span>
            </div>
            <h3 className="text-xl font-bold">Octavio Ramirez</h3>
            <p className="text-gray-600">Técnico en Desarrollo de Software</p>
          </div>
          <div className="space-y-2">
            <p><strong>Ubicación:</strong> Argentina</p>
            <p><strong>Especialidad:</strong> Frontend & Backend</p>
            <p><strong>Experiencia:</strong> 2+ años</p>
          </div>
        </div>
      )
    },
    experience: {
      title: 'Experiencia',
      content: (
        <div className="space-y-4">
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-bold">Desarrollador Full Stack</h4>
            <p className="text-sm text-gray-600">Tech Company | 2022 - Presente</p>
            <p className="text-sm">Desarrollo de aplicaciones web modernas</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-bold">Frontend Developer</h4>
            <p className="text-sm text-gray-600">Startup | 2021 - 2022</p>
            <p className="text-sm">Interfaces de usuario responsivas</p>
          </div>
        </div>
      )
    },
    contact: {
      title: 'Contacto',
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">📧</span>
            </div>
            <h3 className="text-lg font-bold mb-4">Conectemos</h3>
          </div>
          <div className="space-y-3">
            <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors">
              📧 octavio@email.com
            </button>
            <button className="w-full bg-blue-400 text-white py-3 rounded-lg hover:bg-blue-500 transition-colors">
              💼 LinkedIn Profile
            </button>
            <button className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition-colors">
              🐙 GitHub Profile
            </button>
          </div>
        </div>
      )
    },
    solitaire: {
      title: 'Solitario',
      content: <MobileSolitaire onClose={() => {}} />
    },
    minesweeper: {
      title: 'Buscaminas',
      content: <MobileMinesweeper onClose={() => {}} />
    },
    calculator: {
      title: 'Calculadora',
      content: <MobileCalculator onClose={() => {}} />
    }
  }

  const app = appContent[appId as keyof typeof appContent]
  
  if (!app) {
    return (
      <div className="text-center py-8">
        <span className="text-4xl mb-4 block">🚧</span>
        <p className="text-gray-600">Aplicación en desarrollo</p>
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">{app.title}</h3>
      {app.content}
    </div>
  )
}
