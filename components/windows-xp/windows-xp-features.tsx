"use client"

interface WindowsXPFeaturesProps {
  onRefresh: () => void
  onWallpaperChange: (wallpaper: string) => void
  onProperties: () => void
  children: React.ReactNode
}

export function WindowsXPFeatures({ onRefresh, onWallpaperChange, onProperties, children }: WindowsXPFeaturesProps) {
  const [showContextMenu, setShowContextMenu] = useState<{ x: number; y: number } | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [desktopCircles, setDesktopCircles] = useState<Array<{id: string, x: number, y: number, size: number, color: string}>>([])

  const handleDesktopRightClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowContextMenu({ x: e.clientX, y: e.clientY })
  }

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
    setShowContextMenu(null)
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      onRefresh()
    }, 1000)
  }

  return (
    <>
      {/* Desktop Background with Effects */}
      <div 
        className="absolute inset-0"
        style={{
          background: isRefreshing 
            ? 'linear-gradient(45deg, #87ceeb 25%, #98d8e8 25%, #98d8e8 50%, #87ceeb 50%, #87ceeb 75%, #98d8e8 75%, #98d8e8)'
            : 'linear-gradient(180deg, #87ceeb 0%, #98d8e8 30%, #b0e0e6 60%, #e0f6ff 100%)',
          backgroundSize: isRefreshing ? '40px 40px' : 'cover',
          animation: isRefreshing ? 'refresh 0.5s ease-in-out' : 'none'
        }}
        onContextMenu={handleDesktopRightClick}
        onClick={handleDesktopClick}
      >
        {/* Desktop Circles */}
        {desktopCircles.map(circle => (
          <div
            key={circle.id}
            className="absolute rounded-full opacity-30 animate-pulse"
            style={{
              left: `${circle.x}px`,
              top: `${circle.y}px`,
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              background: `radial-gradient(circle, ${circle.color} 0%, transparent 70%)`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`
            }}
          />
        ))}

        {/* Refresh Animation Overlay */}
        {isRefreshing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"/>
          </div>
        )}

        {children}
      </div>

      {/* Context Menu */}
      {showContextMenu && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-[9999]" 
            onClick={() => setShowContextMenu(null)}
          />
          
          {/* Context Menu */}
          <div 
            className="fixed bg-white border-2 border-t-white border-l-white border-b-gray-400 border-r-gray-400 shadow-2xl z-[10000] min-w-[200px]"
            style={{ 
              left: `${showContextMenu.x}px`, 
              top: `${showContextMenu.y}px`,
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '11px'
            }}
          >
            {/* Arrange Icons */}
            <div className="px-3 py-1 hover:bg-blue-500 hover:text-white cursor-pointer flex items-center gap-2">
              <span className="text-xs">↕️</span>
              <span>Organizar iconos</span>
              <span className="ml-auto">▶</span>
            </div>
            
            <div className="border-t border-gray-300 border-b border-white h-px"/>
            
            {/* Refresh */}
            <div 
              className="px-3 py-1 hover:bg-blue-500 hover:text-white cursor-pointer flex items-center gap-2"
              onClick={handleRefresh}
            >
              <span className="text-xs">🔄</span>
              <span>Actualizar</span>
            </div>
            
            <div className="border-t border-gray-300 border-b border-white h-px"/>
            
            {/* New */}
            <div className="px-3 py-1 hover:bg-blue-500 hover:text-white cursor-pointer flex items-center gap-2">
              <span className="text-xs">📄</span>
              <span>Nuevo</span>
              <span className="ml-auto">▶</span>
            </div>
            
            <div className="border-t border-gray-300 border-b border-white h-px"/>
            
            {/* Properties */}
            <div 
              className="px-3 py-1 hover:bg-blue-500 hover:text-white cursor-pointer flex items-center gap-2"
              onClick={onProperties}
            >
              <span className="text-xs">⚙️</span>
              <span>Propiedades</span>
            </div>
          </div>
        </>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes refresh {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </>
  )
}

interface DraggableIconProps {
  icon: any
  onIconClick: (iconId: string) => void
  onIconMouseDown: (iconId: string, e: React.MouseEvent) => void
  selectedIcon: string | null
}

export function DraggableIcon({ icon, onIconClick, onIconMouseDown, selectedIcon }: DraggableIconProps) {
  return (
    <div
      className={`absolute cursor-move select-none ${
        selectedIcon === icon.id ? 'bg-blue-500/30' : ''
      }`}
      style={{
        left: `${icon.position.col * 100 + 20}px`,
        top: `${icon.position.row * 100 + 20}px`,
        width: '80px',
        height: '80px'
      }}
      onMouseDown={(e) => onIconMouseDown(icon.id, e)}
      onClick={() => onIconClick(icon.id)}
    >
      <DesktopIcon
        icon={icon.icon}
        title={icon.title}
        isSelected={selectedIcon === icon.id}
        onDoubleClick={() => onIconClick(icon.id)}
      />
    </div>
  )
}

// Import DesktopIcon
import { DesktopIcon } from './desktop-icon'
import { useState } from 'react'
