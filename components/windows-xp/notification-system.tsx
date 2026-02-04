"use client"

import { useState, useEffect } from "react"

interface Notification {
  id: string
  title: string
  message: string
  icon: string
  type: 'info' | 'warning' | 'error' | 'success'
  duration?: number
  actions?: Array<{ label: string; action: () => void }>
}

interface NotificationSystemProps {
  notifications: Notification[]
  onRemove: (id: string) => void
}

export function NotificationSystem({ notifications, onRemove }: NotificationSystemProps) {
  const [visibleNotifications, setVisibleNotifications] = useState<Set<string>>(new Set())

  useEffect(() => {
    notifications.forEach(notification => {
      if (!visibleNotifications.has(notification.id)) {
        // Stagger the appearance
        setTimeout(() => {
          setVisibleNotifications(prev => new Set(prev).add(notification.id))
        }, 100)
      }
    })
  }, [notifications])

  const getNotificationStyles = (type: string) => {
    switch (type) {
      case 'error':
        return {
          background: 'linear-gradient(180deg, #ff6b6b 0%, #dc2626 100%)',
          borderColor: '#991b1b'
        }
      case 'warning':
        return {
          background: 'linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%)',
          borderColor: '#d97706'
        }
      case 'success':
        return {
          background: 'linear-gradient(180deg, #34d399 0%, #10b981 100%)',
          borderColor: '#059669'
        }
      default:
        return {
          background: 'linear-gradient(180deg, #60a5fa 0%, #3b82f6 100%)',
          borderColor: '#1d4ed8'
        }
    }
  }

  return (
    <div className="fixed top-0 right-0 z-[10000] p-4 pointer-events-none">
      <div className="flex flex-col gap-2 max-w-sm">
        {notifications.map((notification, index) => {
          const isVisible = visibleNotifications.has(notification.id)
          const styles = getNotificationStyles(notification.type)
          
          return (
            <div
              key={notification.id}
              className={`bg-white border-2 rounded-lg shadow-2xl pointer-events-auto transform transition-all duration-300 ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
              }`}
              style={{
                borderColor: styles.borderColor,
                animation: isVisible ? 'slideInRight 0.3s ease-out' : 'slideOutRight 0.3s ease-in'
              }}
            >
              {/* Header */}
              <div 
                className="px-3 py-2 flex items-center justify-between"
                style={styles}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{notification.icon}</span>
                  <span className="text-white font-bold text-sm" style={{ fontFamily: 'Tahoma, sans-serif' }}>
                    {notification.title}
                  </span>
                </div>
                <button
                  onClick={() => onRemove(notification.id)}
                  className="text-white hover:bg-white/20 rounded px-1 text-sm"
                >
                  ✕
                </button>
              </div>
              
              {/* Content */}
              <div className="p-3 bg-white">
                <p className="text-sm text-gray-800 mb-2" style={{ fontFamily: 'Tahoma, sans-serif' }}>
                  {notification.message}
                </p>
                
                {/* Actions */}
                {notification.actions && notification.actions.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {notification.actions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        onClick={() => {
                          action.action()
                          onRemove(notification.id)
                        }}
                        className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100"
                        style={{ fontFamily: 'Tahoma, sans-serif' }}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

// Hook for managing notifications
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
    const newNotification = { ...notification, id }
    
    setNotifications(prev => [...prev, newNotification])
    
    // Auto-remove after duration (default 5 seconds)
    const duration = notification.duration || 5000
    setTimeout(() => {
      removeNotification(id)
    }, duration)
    
    return id
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const showWelcome = () => {
    addNotification({
      title: "¡Bienvenido a Windows XP!",
      message: "Tu portafolio interactivo está listo. Explora todas las aplicaciones disponibles.",
      icon: "🎉",
      type: "success",
      duration: 4000
    })
  }

  const showNewEmail = () => {
    addNotification({
      title: "Nuevo correo electrónico",
      message: "Tienes un nuevo mensaje de contacto@empresa.com",
      icon: "📧",
      type: "info",
      actions: [
        { label: "Leer", action: () => console.log("Opening email...") },
        { label: "Ignorar", action: () => console.log("Ignoring email...") }
      ]
    })
  }

  const showSystemUpdate = () => {
    addNotification({
      title: "Actualización del sistema",
      message: "Hay nuevas actualizaciones disponibles para tu portafolio XP",
      icon: "🔄",
      type: "warning",
      actions: [
        { label: "Actualizar ahora", action: () => console.log("Updating...") },
        { label: "Más tarde", action: () => console.log("Postponing update...") }
      ]
    })
  }

  const showSecurityAlert = () => {
    addNotification({
      title: "Alerta de seguridad",
      message: "Se ha detectado un intento de acceso no autorizado",
      icon: "⚠️",
      type: "error",
      duration: 8000
    })
  }

  const showAchievement = (achievement: string) => {
    addNotification({
      title: "¡Logro desbloqueado!",
      message: achievement,
      icon: "🏆",
      type: "success",
      duration: 3000
    })
  }

  return {
    notifications,
    addNotification,
    removeNotification,
    showWelcome,
    showNewEmail,
    showSystemUpdate,
    showSecurityAlert,
    showAchievement
  }
}
