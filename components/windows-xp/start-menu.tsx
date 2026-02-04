"use client"

import { useState } from "react"

interface StartMenuProps {
  isOpen: boolean
  onClose: () => void
  onOpenWindow: (windowId: string) => void
  onLogoff: () => void
  onShutdown: () => void
  isMobile?: boolean
}

export function StartMenu({ isOpen, onClose, onOpenWindow, onLogoff, onShutdown, isMobile }: StartMenuProps) {
  const [showAllPrograms, setShowAllPrograms] = useState(false)
  const [showShutdownMenu, setShowShutdownMenu] = useState(false)

  if (!isOpen) return null

  const pinnedItems = [
    { id: 'notepad', icon: '📝', label: 'Bloc de Notas', bold: true },
    { id: 'calculator', icon: '🔢', label: 'Calculadora', bold: true },
    { id: 'minesweeper', icon: '💣', label: 'Buscaminas', bold: true },
  ]

  const frequentItems = [
    { id: 'about', icon: '📁', label: 'Mi Perfil' },
    { id: 'experience', icon: '💼', label: 'Experiencia Laboral' },
    { id: 'skills', icon: '🛠️', label: 'Habilidades' },
    { id: 'education', icon: '🎓', label: 'Educación' },
    { id: 'contact', icon: '📧', label: 'Contacto' },
  ]

  const allProgramsItems = [
    { id: 'about', icon: '📁', label: 'Mi Perfil' },
    { id: 'experience', icon: '💼', label: 'Experiencia' },
    { id: 'skills', icon: '🛠️', label: 'Habilidades' },
    { id: 'education', icon: '🎓', label: 'Educación' },
    { id: 'contact', icon: '📧', label: 'Contacto' },
    { type: 'separator' },
    { id: 'notepad', icon: '📝', label: 'Bloc de Notas' },
    { id: 'calculator', icon: '🔢', label: 'Calculadora' },
    { id: 'minesweeper', icon: '💣', label: 'Buscaminas' },
  ]

  const rightColumnItems = [
    { id: 'about', icon: 'my-docs', label: 'Mis documentos' },
    { id: 'about', icon: 'my-pics', label: 'Mis imágenes' },
    { id: 'about', icon: 'my-music', label: 'Mi música' },
    { id: 'about', icon: 'my-pc', label: 'Mi PC' },
    { type: 'separator' },
    { id: 'about', icon: 'control', label: 'Panel de control' },
    { id: 'about', icon: 'help', label: 'Ayuda y soporte técnico' },
  ]

  const getIconSvg = (iconType: string) => {
    switch (iconType) {
      case 'my-docs':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M4 4h16v16H4V4z" fill="#f8d775" stroke="#c9a227" strokeWidth="1"/>
            <path d="M6 8h12v10H6V8z" fill="#fff" stroke="#888" strokeWidth="0.5"/>
          </svg>
        )
      case 'my-pics':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="5" width="18" height="14" fill="#5eb3e4" stroke="#2980b9" strokeWidth="1"/>
            <circle cx="8" cy="10" r="2" fill="#f1c40f"/>
            <path d="M3 15l5-4 4 3 5-5 4 4v6H3v-4z" fill="#27ae60"/>
          </svg>
        )
      case 'my-music':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M12 3v13.55A4 4 0 1014 20V7h4V3h-6z" fill="#9b59b6"/>
          </svg>
        )
      case 'my-pc':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="3" width="20" height="14" rx="1" fill="#3498db" stroke="#2980b9"/>
            <rect x="4" y="5" width="16" height="10" fill="#87ceeb"/>
            <rect x="8" y="17" width="8" height="2" fill="#7f8c8d"/>
            <rect x="5" y="19" width="14" height="2" fill="#95a5a6"/>
          </svg>
        )
      case 'control':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="2" fill="#3498db" stroke="#2980b9"/>
            <rect x="6" y="6" width="4" height="4" fill="#ecf0f1"/>
            <rect x="14" y="6" width="4" height="4" fill="#ecf0f1"/>
            <rect x="6" y="14" width="4" height="4" fill="#ecf0f1"/>
            <rect x="14" y="14" width="4" height="4" fill="#ecf0f1"/>
          </svg>
        )
      case 'help':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#27ae60"/>
            <text x="12" y="17" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">?</text>
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-[9998]" onClick={onClose} />
      <div 
        className="fixed bottom-[30px] left-0 w-[380px] z-[9999] overflow-hidden"
        style={{
          borderRadius: '8px 8px 0 0',
          boxShadow: '0 0 0 1px #0054e3, 3px 3px 15px rgba(0,0,0,0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with user info - Blue gradient like Windows XP */}
        <div 
          className="h-[54px] px-2 flex items-center gap-3"
          style={{
            background: 'linear-gradient(180deg, #1f5fc2 0%, #245edb 3%, #2b71d1 10%, #1f5fc2 100%)',
            borderRadius: '6px 6px 0 0'
          }}
        >
          <div 
            className="w-[42px] h-[42px] rounded-[3px] flex items-center justify-center overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #87ceeb 0%, #4169e1 100%)',
              border: '2px solid white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z"/>
            </svg>
          </div>
          <div className="text-white">
            <p 
              className="font-bold text-[14px]" 
              style={{ 
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                fontFamily: 'Tahoma, Verdana, sans-serif'
              }}
            >
              Octavio Ramirez
            </p>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="flex" style={{ minHeight: '340px' }}>
          {/* Left column - White background */}
          <div className="w-[190px] bg-white py-1">
            {/* Pinned items */}
            <div className="border-b border-[#c5c5c5] pb-1 mb-1">
              {pinnedItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    onOpenWindow(item.id)
                    onClose()
                  }}
                  className="w-full flex items-center gap-2 px-1 py-[3px] hover:bg-[#316ac5] hover:text-white text-left group"
                  style={{ fontFamily: 'Tahoma, Verdana, sans-serif' }}
                >
                  <span className="text-[24px] w-[32px] text-center">{item.icon}</span>
                  <span className={`text-[11px] ${item.bold ? 'font-bold' : ''}`}>{item.label}</span>
                </button>
              ))}
            </div>
            
            {/* Frequent items */}
            <div>
              {frequentItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    onOpenWindow(item.id)
                    onClose()
                  }}
                  className="w-full flex items-center gap-2 px-1 py-[3px] hover:bg-[#316ac5] hover:text-white text-left"
                  style={{ fontFamily: 'Tahoma, Verdana, sans-serif' }}
                >
                  <span className="text-[24px] w-[32px] text-center">{item.icon}</span>
                  <span className="text-[11px]">{item.label}</span>
                </button>
              ))}
            </div>
            
            {/* All Programs button */}
            <div className="border-t border-[#c5c5c5] mt-1 pt-1">
              <button
                onMouseEnter={() => setShowAllPrograms(true)}
                className="w-full flex items-center justify-between gap-2 px-1 py-[3px] hover:bg-[#316ac5] hover:text-white text-left"
                style={{ fontFamily: 'Tahoma, Verdana, sans-serif' }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[24px] w-[32px] text-center">📂</span>
                  <span className="text-[11px] font-bold text-[#003399] group-hover:text-white">Todos los programas</span>
                </div>
                <span className="text-green-700 mr-2">▶</span>
              </button>
            </div>
          </div>

          {/* Right column - Blue tinted background */}
          <div 
            className="w-[190px] py-1"
            style={{ background: '#d3e5fa' }}
          >
            {rightColumnItems.map((item, index) => 
              item.type === 'separator' ? (
                <div key={index} className="h-[1px] bg-[#a5c4e8] my-1 mx-2"></div>
              ) : (
                <button
                  key={index}
                  onClick={() => {
                    if (item.id) {
                      onOpenWindow(item.id)
                      onClose()
                    }
                  }}
                  className="w-full flex items-center gap-2 px-2 py-[3px] hover:bg-[#316ac5] hover:text-white text-left"
                  style={{ fontFamily: 'Tahoma, Verdana, sans-serif' }}
                >
                  <span className="w-[24px] h-[24px]">
                    {typeof item.icon === 'string' && getIconSvg(item.icon)}
                  </span>
                  <span className="text-[11px] font-bold">{item.label}</span>
                </button>
              )
            )}
          </div>
        </div>

        {/* All Programs Submenu */}
        {showAllPrograms && (
          <div 
            className="absolute left-[190px] bottom-[76px] w-[200px] bg-white border border-[#0054e3] shadow-lg z-10"
            onMouseLeave={() => setShowAllPrograms(false)}
          >
            {allProgramsItems.map((item, index) => 
              item.type === 'separator' ? (
                <div key={index} className="h-[1px] bg-[#c5c5c5] my-1"></div>
              ) : (
                <button
                  key={index}
                  onClick={() => {
                    if (item.id) {
                      onOpenWindow(item.id)
                      onClose()
                    }
                  }}
                  className="w-full flex items-center gap-2 px-2 py-[3px] hover:bg-[#316ac5] hover:text-white text-left"
                  style={{ fontFamily: 'Tahoma, Verdana, sans-serif' }}
                >
                  <span className="text-[20px] w-[24px] text-center">{item.icon}</span>
                  <span className="text-[11px]">{item.label}</span>
                </button>
              )
            )}
          </div>
        )}

        {/* Footer with Log Off and Shut Down */}
        <div 
          className="h-[36px] flex items-center justify-end gap-1 px-2 relative"
          style={{
            background: 'linear-gradient(180deg, #3f8cf3 0%, #2e6fd9 50%, #1f5fc2 100%)',
          }}
        >
          <button
            onClick={() => {
              onLogoff()
              onClose()
            }}
            className="flex items-center gap-1 px-3 py-[2px] rounded-[3px] text-[11px] font-semibold"
            style={{
              background: 'linear-gradient(180deg, #fefefe 0%, #e8e8e8 100%)',
              border: '1px solid #003399',
              fontFamily: 'Tahoma, Verdana, sans-serif',
              boxShadow: '0 1px 0 rgba(255,255,255,0.5) inset'
            }}
          >
            <svg className="w-4 h-4 text-[#c9302c]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
            </svg>
            Cerrar sesión
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowShutdownMenu(!showShutdownMenu)}
              className="flex items-center gap-1 px-3 py-[2px] rounded-[3px] text-[11px] font-semibold text-white"
              style={{
                background: 'linear-gradient(180deg, #e87250 0%, #d64a26 50%, #c23c1f 100%)',
                border: '1px solid #8b1a00',
                fontFamily: 'Tahoma, Verdana, sans-serif',
                boxShadow: '0 1px 0 rgba(255,255,255,0.3) inset'
              }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
              </svg>
              Apagar
              <span className="ml-1">▼</span>
            </button>
            
            {showShutdownMenu && (
              <div 
                className="absolute bottom-full right-0 mb-1 w-[150px] bg-white border border-gray-400 shadow-lg"
                style={{ fontFamily: 'Tahoma, Verdana, sans-serif' }}
              >
                <button
                  onClick={() => {
                    onShutdown()
                    onClose()
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#316ac5] hover:text-white text-left text-[11px]"
                >
                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
                  </svg>
                  Apagar
                </button>
                <button
                  onClick={() => {
                    window.location.reload()
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#316ac5] hover:text-white text-left text-[11px]"
                >
                  <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                  </svg>
                  Reiniciar
                </button>
                <button
                  onClick={() => {
                    onLogoff()
                    onClose()
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#316ac5] hover:text-white text-left text-[11px]"
                >
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
                  </svg>
                  Suspender
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
