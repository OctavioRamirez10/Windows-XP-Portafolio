"use client"

interface MyComputerContentProps {
  onOpenFolder: (folderId: string) => void
}

export function MyComputerContent({ onOpenFolder }: MyComputerContentProps) {
  const drives = [
    { 
      id: 'c-drive', 
      name: 'Disco local (C:)', 
      icon: '💿',
      type: 'Hard Disk',
      total: '500 GB',
      free: '350 GB',
      color: '#3498db'
    },
    { 
      id: 'd-drive', 
      name: 'Portfolio (D:)', 
      icon: '💾',
      type: 'Local Disk',
      total: '250 GB',
      free: '200 GB',
      color: '#9b59b6'
    },
  ]

  const folders = [
    { id: 'about', name: 'Mi Perfil', icon: '📁' },
    { id: 'experience', name: 'Experiencia', icon: '💼' },
    { id: 'skills', name: 'Habilidades', icon: '🛠️' },
    { id: 'education', name: 'Educación', icon: '🎓' },
    { id: 'contact', name: 'Contacto', icon: '📧' },
  ]

  const devices = [
    { id: 'dvd', name: 'Unidad de DVD (E:)', icon: '📀' },
    { id: 'usb', name: 'USB (F:)', icon: '🔌' },
  ]

  return (
    <div className="p-4 bg-white min-h-full" style={{ fontFamily: 'Tahoma, Verdana, sans-serif' }}>
      {/* System Tasks Panel */}
      <div className="flex gap-4">
        {/* Left sidebar */}
        <div className="w-[200px] shrink-0">
          <div 
            className="rounded-lg overflow-hidden mb-4"
            style={{ 
              background: 'linear-gradient(180deg, #6b9dd6 0%, #4080c0 100%)',
              border: '1px solid #2b5b8a'
            }}
          >
            <div className="px-3 py-2 text-white text-[11px] font-bold">
              Tareas del sistema
            </div>
            <div className="bg-[#d6dff7] p-2">
              <button className="w-full text-left text-[11px] text-[#215dc6] hover:underline py-1 flex items-center gap-2">
                <span className="text-sm">📊</span>
                Ver información del sistema
              </button>
              <button className="w-full text-left text-[11px] text-[#215dc6] hover:underline py-1 flex items-center gap-2">
                <span className="text-sm">⚙️</span>
                Agregar o quitar programas
              </button>
              <button className="w-full text-left text-[11px] text-[#215dc6] hover:underline py-1 flex items-center gap-2">
                <span className="text-sm">🔧</span>
                Cambiar una configuración
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
              Otros sitios
            </div>
            <div className="bg-[#d6dff7] p-2">
              <button className="w-full text-left text-[11px] text-[#215dc6] hover:underline py-1 flex items-center gap-2">
                <span className="text-sm">🌐</span>
                Mis sitios de red
              </button>
              <button className="w-full text-left text-[11px] text-[#215dc6] hover:underline py-1 flex items-center gap-2">
                <span className="text-sm">📁</span>
                Mis documentos
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          {/* Hard Disk Drives */}
          <div className="mb-6">
            <h3 className="text-[11px] font-bold text-[#215dc6] border-b border-[#d6dff7] pb-1 mb-2">
              Unidades de disco duro
            </h3>
            <div className="flex flex-wrap gap-4">
              {drives.map(drive => (
                <button
                  key={drive.id}
                  className="w-[200px] p-3 rounded hover:bg-[#e8f4fc] border border-transparent hover:border-[#316ac5] text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[32px]">{drive.icon}</span>
                    <div>
                      <p className="text-[11px] font-semibold">{drive.name}</p>
                      <div className="w-[100px] h-[12px] bg-[#e0e0e0] rounded-sm mt-1 overflow-hidden">
                        <div 
                          className="h-full rounded-sm"
                          style={{ 
                            width: '70%',
                            background: `linear-gradient(180deg, ${drive.color} 0%, ${drive.color}cc 100%)`
                          }}
                        />
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1">{drive.free} libres de {drive.total}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Folders */}
          <div className="mb-6">
            <h3 className="text-[11px] font-bold text-[#215dc6] border-b border-[#d6dff7] pb-1 mb-2">
              Carpetas del Portfolio
            </h3>
            <div className="flex flex-wrap gap-2">
              {folders.map(folder => (
                <button
                  key={folder.id}
                  onClick={() => onOpenFolder(folder.id)}
                  className="w-[100px] p-2 rounded hover:bg-[#e8f4fc] border border-transparent hover:border-[#316ac5] text-center"
                >
                  <span className="text-[32px] block">{folder.icon}</span>
                  <p className="text-[11px] mt-1">{folder.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Devices with Removable Storage */}
          <div>
            <h3 className="text-[11px] font-bold text-[#215dc6] border-b border-[#d6dff7] pb-1 mb-2">
              Dispositivos con almacenamiento extraíble
            </h3>
            <div className="flex flex-wrap gap-2">
              {devices.map(device => (
                <button
                  key={device.id}
                  className="w-[100px] p-2 rounded hover:bg-[#e8f4fc] border border-transparent hover:border-[#316ac5] text-center opacity-50"
                >
                  <span className="text-[32px] block">{device.icon}</span>
                  <p className="text-[11px] mt-1">{device.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
