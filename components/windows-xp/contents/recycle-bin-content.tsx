"use client"

export function RecycleBinContent() {
  const deletedItems = [
    { name: 'bugs_corregidos.txt', type: 'Documento de texto', date: '01/02/2026', size: '4 KB' },
    { name: 'codigo_viejo.js', type: 'Archivo JavaScript', date: '15/01/2026', size: '12 KB' },
    { name: 'proyecto_descartado', type: 'Carpeta de archivos', date: '10/01/2026', size: '1.2 MB' },
  ]

  return (
    <div className="p-4 bg-white min-h-full" style={{ fontFamily: 'Tahoma, Verdana, sans-serif' }}>
      <div className="flex gap-4">
        {/* Left sidebar */}
        <div className="w-[180px] shrink-0">
          <div 
            className="rounded-lg overflow-hidden"
            style={{ 
              background: 'linear-gradient(180deg, #6b9dd6 0%, #4080c0 100%)',
              border: '1px solid #2b5b8a'
            }}
          >
            <div className="px-3 py-2 text-white text-[11px] font-bold">
              Tareas de la Papelera
            </div>
            <div className="bg-[#d6dff7] p-2">
              <button className="w-full text-left text-[11px] text-[#215dc6] hover:underline py-1 flex items-center gap-2">
                <span className="text-sm">🗑️</span>
                Vaciar la Papelera de reciclaje
              </button>
              <button className="w-full text-left text-[11px] text-[#215dc6] hover:underline py-1 flex items-center gap-2">
                <span className="text-sm">♻️</span>
                Restaurar todos los elementos
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          {deletedItems.length > 0 ? (
            <div className="border border-[#aaa]">
              {/* Header */}
              <div className="flex bg-[#ece9d8] border-b border-[#aaa] text-[11px] font-semibold">
                <div className="w-[200px] p-1 border-r border-[#aaa]">Nombre</div>
                <div className="w-[150px] p-1 border-r border-[#aaa]">Tipo</div>
                <div className="w-[100px] p-1 border-r border-[#aaa]">Fecha</div>
                <div className="w-[80px] p-1">Tamaño</div>
              </div>
              {/* Items */}
              {deletedItems.map((item, index) => (
                <div 
                  key={index}
                  className="flex text-[11px] hover:bg-[#316ac5] hover:text-white cursor-pointer border-b border-[#eee] last:border-0"
                >
                  <div className="w-[200px] p-1 border-r border-[#eee] flex items-center gap-1">
                    <span>📄</span>
                    {item.name}
                  </div>
                  <div className="w-[150px] p-1 border-r border-[#eee]">{item.type}</div>
                  <div className="w-[100px] p-1 border-r border-[#eee]">{item.date}</div>
                  <div className="w-[80px] p-1">{item.size}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[200px] text-gray-500">
              <span className="text-[48px] mb-2">🗑️</span>
              <p className="text-[11px]">La Papelera de reciclaje está vacía</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
