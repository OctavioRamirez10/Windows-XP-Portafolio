"use client"

export function AboutContent() {
  return (
    <div className="flex h-full" style={{ fontFamily: 'Tahoma, Verdana, sans-serif' }}>
      {/* Left sidebar - XP style */}
      <div className="w-[200px] shrink-0 p-2" style={{ background: '#d6dff7' }}>
        <div 
          className="rounded-lg overflow-hidden mb-3"
          style={{ 
            background: 'linear-gradient(180deg, #6b9dd6 0%, #4080c0 100%)',
            border: '1px solid #2b5b8a'
          }}
        >
          <div className="px-3 py-2 text-white text-[11px] font-bold">
            Tareas de archivo
          </div>
          <div className="bg-[#d6dff7] p-2 space-y-1">
            <button className="w-full text-left text-[11px] text-[#215dc6] hover:underline py-1 flex items-center gap-2">
              <span className="text-sm">📧</span> Enviar email
            </button>
            <button className="w-full text-left text-[11px] text-[#215dc6] hover:underline py-1 flex items-center gap-2">
              <span className="text-sm">🖨️</span> Imprimir CV
            </button>
          </div>
        </div>
        
        <div 
          className="rounded-lg overflow-hidden"
          style={{ 
            background: 'linear-gradient(180deg, #6b9dd6 0%, #4080c0 100%)',
            border: '1px solid #2b5b8a'
          }}
        >
          <div className="px-3 py-2 text-white text-[11px] font-bold">
            Detalles
          </div>
          <div className="bg-[#d6dff7] p-3">
            <div className="text-center">
              <div 
                className="w-[80px] h-[80px] mx-auto rounded-[4px] flex items-center justify-center mb-2"
                style={{
                  background: 'linear-gradient(180deg, #87ceeb 0%, #4169e1 100%)',
                  border: '2px solid white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z"/>
                </svg>
              </div>
              <p className="text-[11px] font-bold">Octavio Ramirez</p>
              <p className="text-[10px] text-gray-600">Desarrollador</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 bg-white overflow-auto">
        {/* Profile Card */}
        <div className="flex gap-6 mb-6">
          {/* Profile Image */}
          <div className="shrink-0">
            <div 
              className="w-[120px] h-[120px] rounded-[4px] flex items-center justify-center"
              style={{
                background: 'linear-gradient(180deg, #87ceeb 0%, #2e6fcf 100%)',
                border: '3px solid white',
                boxShadow: '0 3px 10px rgba(0,0,0,0.3)'
              }}
            >
              <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z"/>
              </svg>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-[20px] font-bold text-[#003399] mb-1">Octavio Ramirez</h1>
            <p className="text-[14px] text-gray-700 mb-3">Tecnico en Desarrollo de Software</p>
            
            <div className="space-y-1 text-[11px]">
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>Santa Fe, Argentina</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🎂</span>
                <span>06/07/2002</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🚗</span>
                <span>Licencia de Conducir B1</span>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="p-3 bg-[#f5f5f5] rounded border border-gray-300 mb-4">
          <h2 className="text-[13px] font-bold text-[#003399] mb-2 flex items-center gap-2">
            <span>📋</span> Perfil Profesional
          </h2>
          <p className="text-[11px] text-gray-700 leading-relaxed">
            {"Tecnico en desarrollo de software e informatica con experiencia en soporte tecnico, mantenimiento de equipos, redes e instalacion de sistemas Windows y Linux, ademas de formacion y practica en desarrollo web con HTML, CSS, JavaScript, PHP y Python. Me destaco por mi capacidad para resolver incidencias de manera eficiente, mi enfoque analitico, responsabilidad y rapida adaptacion a nuevos entornos tecnologicos. Busco seguir creciendo profesionalmente, aportando valor tanto en infraestructura IT como en desarrollo de soluciones tecnologicas."}
          </p>
        </div>

        {/* Languages */}
        <div className="p-3 bg-[#f5f5f5] rounded border border-gray-300">
          <h2 className="text-[13px] font-bold text-[#003399] mb-2 flex items-center gap-2">
            <span>🌍</span> Idiomas
          </h2>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xl">🇪🇸</span>
              <div>
                <p className="text-[11px] font-semibold">Espanol</p>
                <p className="text-[10px] text-gray-500">Nativo</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🇬🇧</span>
              <div>
                <p className="text-[11px] font-semibold">Ingles</p>
                <p className="text-[10px] text-gray-500">Intermedio</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
