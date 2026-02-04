"use client"

import { useState } from "react"

export function InternetExplorerContent() {
  const [url, setUrl] = useState("https://octavio-portfolio-xp.com")
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState("home")

  const navigateTo = (page: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setCurrentPage(page)
      setIsLoading(false)
    }, 1000)
  }

  const renderContent = () => {
    switch (currentPage) {
      case "home":
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4 text-[#0066cc]" style={{ fontFamily: 'Arial, sans-serif' }}>
              🏠 Bienvenido a mi Portafolio
            </h1>
            <div className="bg-[#f0f8ff] border-2 border-[#cce6ff] rounded p-4 mb-4">
              <h2 className="text-xl font-semibold mb-2 text-[#0066cc]">👋 Hola, soy Octavio Ramirez</h2>
              <p className="text-gray-700 leading-relaxed">
                Desarrollador creativo apasionado por crear experiencias digitales únicas. 
                Este portafolio está construido con Next.js y diseñado para evocar la nostalgia de Windows XP.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#fff5e6] border-2 border-[#ffcc99] rounded p-3">
                <h3 className="font-bold text-[#ff6600] mb-2">🚀 Proyectos Recientes</h3>
                <ul className="text-sm space-y-1">
                  <li>• Portafolio XP Interactivo</li>
                  <li>• Sistema de Gestión Web</li>
                  <li>• App de Productividad</li>
                </ul>
              </div>
              <div className="bg-[#f0fff0] border-2 border-[#ccffcc] rounded p-3">
                <h3 className="font-bold text-[#00cc00] mb-2">💡 Tecnologías</h3>
                <ul className="text-sm space-y-1">
                  <li>• React / Next.js</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                </ul>
              </div>
            </div>
          </div>
        )
      
      case "skills":
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4 text-[#0066cc]" style={{ fontFamily: 'Arial, sans-serif' }}>
              🛠️ Mis Habilidades Técnicas
            </h1>
            
            <div className="space-y-4">
              <div className="bg-white border-2 border-[#cccccc] rounded p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-[#333]">Frontend Development</h3>
                  <span className="text-sm text-[#666]">95%</span>
                </div>
                <div className="w-full bg-[#e0e0e0] h-6 rounded border border-[#999]">
                  <div className="bg-gradient-to-r from-[#4CAF50] to-[#45a049] h-5 rounded m-0.5" style={{ width: '95%' }}></div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-1 bg-[#e3f2fd] text-[#1976d2] rounded text-xs">React</span>
                  <span className="px-2 py-1 bg-[#e3f2fd] text-[#1976d2] rounded text-xs">Next.js</span>
                  <span className="px-2 py-1 bg-[#e3f2fd] text-[#1976d2] rounded text-xs">TypeScript</span>
                  <span className="px-2 py-1 bg-[#e3f2fd] text-[#1976d2] rounded text-xs">Tailwind</span>
                </div>
              </div>

              <div className="bg-white border-2 border-[#cccccc] rounded p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-[#333]">Backend Development</h3>
                  <span className="text-sm text-[#666]">85%</span>
                </div>
                <div className="w-full bg-[#e0e0e0] h-6 rounded border border-[#999]">
                  <div className="bg-gradient-to-r from-[#2196F3] to-[#1976D2] h-5 rounded m-0.5" style={{ width: '85%' }}></div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-1 bg-[#e3f2fd] text-[#1976d2] rounded text-xs">Node.js</span>
                  <span className="px-2 py-1 bg-[#e3f2fd] text-[#1976d2] rounded text-xs">Express</span>
                  <span className="px-2 py-1 bg-[#e3f2fd] text-[#1976d2] rounded text-xs">MongoDB</span>
                </div>
              </div>

              <div className="bg-white border-2 border-[#cccccc] rounded p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-[#333]">UI/UX Design</h3>
                  <span className="text-sm text-[#666]">90%</span>
                </div>
                <div className="w-full bg-[#e0e0e0] h-6 rounded border border-[#999]">
                  <div className="bg-gradient-to-r from-[#FF9800] to-[#F57C00] h-5 rounded m-0.5" style={{ width: '90%' }}></div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-1 bg-[#fff3e0] text-[#f57c00] rounded text-xs">Figma</span>
                  <span className="px-2 py-1 bg-[#fff3e0] text-[#f57c00] rounded text-xs">Adobe XD</span>
                  <span className="px-2 py-1 bg-[#fff3e0] text-[#f57c00] rounded text-xs">Photoshop</span>
                </div>
              </div>
            </div>
          </div>
        )
      
      case "projects":
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4 text-[#0066cc]" style={{ fontFamily: 'Arial, sans-serif' }}>
              💼 Proyectos Destacados
            </h1>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-[#6a5acd] to-[#483d8b] text-white rounded-lg p-6 border-2 border-[#4b0082]">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🖥️</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Portafolio XP Interactivo</h3>
                    <p className="mb-3 opacity-90">
                      Una recreación completa de Windows XP como portafolio web, con aplicaciones funcionales,
                      animaciones auténticas y una experiencia nostálgica.
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <span className="px-2 py-1 bg-white/20 rounded text-xs">Next.js</span>
                      <span className="px-2 py-1 bg-white/20 rounded text-xs">TypeScript</span>
                      <span className="px-2 py-1 bg-white/20 rounded text-xs">Tailwind CSS</span>
                      <span className="px-2 py-1 bg-white/20 rounded text-xs">React</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#20b2aa] to-[#008b8b] text-white rounded-lg p-6 border-2 border-[#006666]">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">📱</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">App de Productividad Móvil</h3>
                    <p className="mb-3 opacity-90">
                      Aplicación móvil para gestión de tareas con sincronización en tiempo real,
                      notificaciones push y diseño intuitivo.
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <span className="px-2 py-1 bg-white/20 rounded text-xs">React Native</span>
                      <span className="px-2 py-1 bg-white/20 rounded text-xs">Firebase</span>
                      <span className="px-2 py-1 bg-white/20 rounded text-xs">Redux</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#ff6347] to-[#dc143c] text-white rounded-lg p-6 border-2 border-[#8b0000]">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🛒</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">E-commerce Platform</h3>
                    <p className="mb-3 opacity-90">
                      Plataforma de comercio electrónico completa con pasarela de pago,
                      inventario en tiempo real y panel de administración.
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <span className="px-2 py-1 bg-white/20 rounded text-xs">Node.js</span>
                      <span className="px-2 py-1 bg-white/20 rounded text-xs">MongoDB</span>
                      <span className="px-2 py-1 bg-white/20 rounded text-xs">Stripe</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="h-full flex flex-col bg-[#f0f0f0]">
      {/* IE6 Toolbar */}
      <div className="bg-[#f0f0f0] border-b-2 border-[#ffffff] border-t-[#808080] border-l-[#808080] border-r-[#808080]">
        <div className="flex items-center gap-1 p-1">
          {/* Back/Forward Buttons */}
          <button className="w-6 h-6 bg-[#f0f0f0] border border-[#808080] border-r-[#ffffff] border-t-[#ffffff] flex items-center justify-center text-xs">
            ←
          </button>
          <button className="w-6 h-6 bg-[#f0f0f0] border border-[#808080] border-r-[#ffffff] border-t-[#ffffff] flex items-center justify-center text-xs">
            →
          </button>
          <button className="w-6 h-6 bg-[#f0f0f0] border border-[#808080] border-r-[#ffffff] border-t-[#ffffff] flex items-center justify-center text-xs">
            ↻
          </button>
          
          <div className="w-px h-6 bg-[#808080] mx-1"></div>
          
          {/* Address Bar */}
          <div className="flex-1 flex items-center bg-white border border-[#808080] border-r-[#ffffff] border-t-[#ffffff]">
            <span className="px-2 text-xs text-gray-600">Dirección</span>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 px-1 text-xs outline-none"
              style={{ fontFamily: 'Tahoma, sans-serif' }}
            />
            <button className="px-2 py-1 bg-[#f0f0f0] border border-[#808080] border-l-[#ffffff] border-t-[#ffffff] text-xs">
              Ir
            </button>
          </div>
          
          <div className="w-px h-6 bg-[#808080] mx-1"></div>
          
          {/* Navigation Buttons */}
          <button 
            onClick={() => navigateTo("home")}
            className={`px-2 py-1 text-xs ${
              currentPage === "home" 
                ? "bg-[#ffffff] border border-[#808080] border-r-[#808080] border-b-[#808080]" 
                : "bg-[#f0f0f0] border border-[#808080] border-r-[#ffffff] border-t-[#ffffff]"
            }`}
          >
            Inicio
          </button>
          <button 
            onClick={() => navigateTo("skills")}
            className={`px-2 py-1 text-xs ${
              currentPage === "skills" 
                ? "bg-[#ffffff] border border-[#808080] border-r-[#808080] border-b-[#808080]" 
                : "bg-[#f0f0f0] border border-[#808080] border-r-[#ffffff] border-t-[#ffffff]"
            }`}
          >
            Habilidades
          </button>
          <button 
            onClick={() => navigateTo("projects")}
            className={`px-2 py-1 text-xs ${
              currentPage === "projects" 
                ? "bg-[#ffffff] border border-[#808080] border-r-[#808080] border-b-[#808080]" 
                : "bg-[#f0f0f0] border border-[#808080] border-r-[#ffffff] border-t-[#ffffff]"
            }`}
          >
            Proyectos
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white overflow-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-[#0066cc] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Tahoma, sans-serif' }}>
                Cargando página...
              </p>
            </div>
          </div>
        ) : (
          renderContent()
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-[#f0f0f0] border-t-2 border-[#808080] border-l-[#ffffff] border-r-[#ffffff] px-2 py-1">
        <div className="flex items-center justify-between text-xs" style={{ fontFamily: 'Tahoma, sans-serif' }}>
          <span>✓ Internet</span>
          <span>{currentPage === "home" ? "localhost:3000" : url}</span>
          <span>Completado</span>
        </div>
      </div>
    </div>
  )
}
