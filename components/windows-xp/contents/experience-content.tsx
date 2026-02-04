"use client"

export function ExperienceContent() {
  return (
    <div className="flex h-full" style={{ fontFamily: 'Tahoma, Verdana, sans-serif' }}>
      {/* Left sidebar - XP style */}
      <div className="w-[180px] shrink-0 p-2" style={{ background: '#d6dff7' }}>
        <div 
          className="rounded-lg overflow-hidden mb-3"
          style={{ 
            background: 'linear-gradient(180deg, #6b9dd6 0%, #4080c0 100%)',
            border: '1px solid #2b5b8a'
          }}
        >
          <div className="px-3 py-2 text-white text-[11px] font-bold">
            Experiencia
          </div>
          <div className="bg-[#d6dff7] p-2 space-y-1">
            <div className="text-[11px] py-1">
              <span className="text-[#215dc6] font-bold">2+ años</span>
              <p className="text-[10px] text-gray-600">en el sector IT</p>
            </div>
            <div className="border-t border-[#a5c4e8] pt-2">
              <span className="text-[10px] text-gray-600">Empleador actual:</span>
              <p className="text-[11px] font-bold text-[#215dc6]">Casa de Gobierno</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 bg-white overflow-auto">
        {/* Experience Card */}
        <div className="bg-[#f5f5f5] p-4 rounded border border-gray-300 mb-4">
          <div className="flex items-start gap-4">
            <div 
              className="w-[60px] h-[60px] rounded flex items-center justify-center shrink-0"
              style={{
                background: 'linear-gradient(180deg, #003399 0%, #0054e3 100%)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              <span className="text-[28px]">🏛️</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-[14px] font-bold text-[#003399]">Soporte Tecnico - Area Informatica</h2>
                <span 
                  className="px-2 py-[2px] text-white text-[10px] rounded font-semibold"
                  style={{ background: 'linear-gradient(180deg, #52b352 0%, #3c943c 100%)' }}
                >
                  Actual
                </span>
              </div>
              <h3 className="text-[12px] text-gray-700 font-semibold">Casa de Gobierno</h3>
              <p className="text-[10px] text-gray-500 mb-3">📍 Santa Fe, Argentina | 📅 Enero 2023 - Presente</p>
              
              <div className="bg-white p-3 rounded border border-[#c5d9c5]">
                <h4 className="font-bold text-[#2e7d32] text-[11px] mb-2">Responsabilidades:</h4>
                <ul className="space-y-1 text-[11px]">
                  {[
                    "Atencion y soporte a usuarios en entornos de alta demanda",
                    "Instalacion y configuracion de Windows y Linux",
                    "Mantenimiento y reparacion de PC e impresoras",
                    "Implementacion de cableado estructurado y redes",
                    "Diagnostico y resolucion eficiente de incidencias tecnicas",
                    "Manejo de software institucional y herramientas de trabajo"
                  ].map((task, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#2e7d32]">✓</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="p-3 bg-[#f5f5f5] rounded border border-gray-300">
          <h3 className="font-bold text-[#003399] text-[11px] mb-2">Tecnologias utilizadas:</h3>
          <div className="flex flex-wrap gap-1">
            {['Windows', 'Linux', 'Redes', 'Hardware', 'Office', 'LibreOffice', 'Active Directory', 'TCP/IP'].map(tech => (
              <span 
                key={tech}
                className="px-2 py-[2px] text-white text-[10px] rounded"
                style={{ background: 'linear-gradient(180deg, #003399 0%, #0054e3 100%)' }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
