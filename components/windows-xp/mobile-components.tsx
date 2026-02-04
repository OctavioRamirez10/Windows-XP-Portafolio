"use client"

import React, { useState, useCallback } from 'react'

interface MobileWindowProps {
  title: string
  icon: string
  onClose: () => void
  children: React.ReactNode
  isMaximized?: boolean
}

export function MobileWindow({ title, icon, onClose, children, isMaximized = false }: MobileWindowProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClose = useCallback(() => {
    setIsAnimating(true)
    setTimeout(() => {
      onClose()
    }, 300)
  }, [onClose])

  return (
    <div className={`fixed inset-0 z-50 flex flex-col bg-white ${isAnimating ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
      {/* Window Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <h1 className="text-white font-bold text-lg">{title}</h1>
        </div>
        <button 
          onClick={handleClose}
          className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white font-bold transition-colors"
        >
          ×
        </button>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto bg-gray-50">
        {children}
      </div>

      {/* Mobile Window Controls */}
      <div className="bg-white border-t border-gray-200 p-2 flex justify-around">
        <button className="p-2 rounded hover:bg-gray-100 transition-colors">
          ← Atrás
        </button>
        <button className="p-2 rounded hover:bg-gray-100 transition-colors">
          Inicio
        </button>
        <button className="p-2 rounded hover:bg-gray-100 transition-colors">
          Menú
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(0.9); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-fadeOut {
          animation: fadeOut 0.3s ease-in;
        }
      `}</style>
    </div>
  )
}

interface MobileTaskbarProps {
  openApps: Array<{ id: string; title: string; icon: string }>
  onAppClick: (appId: string) => void
  onStartClick: () => void
}

export function MobileTaskbar({ openApps, onAppClick, onStartClick }: MobileTaskbarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-gray-600 z-40">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Start Button */}
        <button 
          onClick={onStartClick}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <span className="text-lg">▶️</span>
          <span className="text-sm font-medium">Inicio</span>
        </button>

        {/* Open Apps */}
        <div className="flex gap-2 overflow-x-auto max-w-[60%]">
          {openApps.map((app) => (
            <button
              key={app.id}
              onClick={() => onAppClick(app.id)}
              className="flex flex-col items-center p-2 bg-gray-700 hover:bg-gray-600 rounded-lg min-w-[60px] transition-colors"
            >
              <span className="text-lg">{app.icon}</span>
              <span className="text-xs text-white truncate max-w-[50px]">{app.title}</span>
            </button>
          ))}
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-white text-xs">100%</span>
        </div>
      </div>
    </div>
  )
}

interface MobileStartMenuProps {
  isOpen: boolean
  onClose: () => void
  onAppSelect: (appId: string) => void
  onShutdown: () => void
  onLogoff: () => void
}

export function MobileStartMenu({ isOpen, onClose, onAppSelect, onShutdown, onLogoff }: MobileStartMenuProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const apps = [
    { id: 'about', title: 'Mi Perfil', icon: '👤', category: 'Personal' },
    { id: 'experience', title: 'Experiencia', icon: '💼', category: 'Professional' },
    { id: 'skills', title: 'Habilidades', icon: '🛠️', category: 'Professional' },
    { id: 'education', title: 'Educación', icon: '🎓', category: 'Education' },
    { id: 'contact', title: 'Contacto', icon: '📧', category: 'Communication' },
    { id: 'notepad', title: 'Bloc de Notas', icon: '📝', category: 'Utilities' },
    { id: 'internet', title: 'Internet Explorer', icon: '🌐', category: 'Internet' },
    { id: 'paint', title: 'Paint', icon: '🎨', category: 'Utilities' },
    { id: 'media', title: 'Media Player', icon: '🎵', category: 'Entertainment' },
    { id: 'solitaire', title: 'Solitario', icon: '🃏', category: 'Games' },
    { id: 'minesweeper', title: 'Buscaminas', icon: '💣', category: 'Games' },
    { id: 'calculator', title: 'Calculadora', icon: '🔢', category: 'Utilities' },
  ]

  const filteredApps = apps.filter(app => 
    app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/50">
      {/* Backdrop */}
      <div className="flex-1" onClick={onClose}></div>
      
      {/* Start Menu */}
      <div className="bg-gray-900 border-t border-gray-600 rounded-t-3xl">
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-700">
          <input
            type="text"
            placeholder="Buscar aplicaciones..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Apps Grid */}
        <div className="max-h-64 overflow-y-auto p-4">
          <div className="grid grid-cols-4 gap-3">
            {filteredApps.map((app) => (
              <button
                key={app.id}
                onClick={() => {
                  onAppSelect(app.id)
                  onClose()
                }}
                className="flex flex-col items-center p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors"
              >
                <span className="text-2xl mb-1">{app.icon}</span>
                <span className="text-xs text-white text-center">{app.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* System Actions */}
        <div className="border-t border-gray-700 p-4">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onLogoff}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <span>🚪</span>
              <span>Cerrar Sesión</span>
            </button>
            <button
              onClick={onShutdown}
              className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <span>⏻️</span>
              <span>Apagar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface MobileNotificationProps {
  title: string
  message: string
  icon: string
  onClose: () => void
  type?: 'info' | 'success' | 'warning' | 'error'
}

export function MobileNotification({ title, message, icon, onClose, type = 'info' }: MobileNotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  const typeColors = {
    info: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  }

  return (
    <div className={`fixed top-4 right-4 left-4 z-[60] ${typeColors[type]} text-white rounded-xl shadow-2xl p-4 ${isVisible ? 'animate-slideDown' : 'animate-slideUp'}`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icon}</span>
        <div className="flex-1">
          <h4 className="font-bold">{title}</h4>
          <p className="text-sm opacity-90">{message}</p>
        </div>
        <button 
          onClick={handleClose}
          className="text-white/80 hover:text-white"
        >
          ×
        </button>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(-100%); opacity: 0; }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-in;
        }
      `}</style>
    </div>
  )
}
