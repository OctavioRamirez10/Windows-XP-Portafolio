"use client"

export function EducationContent() {
  const education = [
    {
      period: "Feb 2023 - Presente",
      title: "Tecnico Superior en Desarrollo de Software",
      institution: "Instituto ICOP",
      location: "San Martin 1540, Santa Fe",
      icon: "🎓",
      status: "En curso"
    },
    {
      period: "Ene 2021 - Presente",
      title: "Tecnicatura en Informatica aplicada a Sitios Web y Diseno Multimedial",
      institution: "Universidad Nacional del Litoral",
      location: "Santa Fe, Argentina",
      icon: "🏛️",
      status: "En curso"
    },
    {
      period: "Ene 2015 - Dic 2020",
      title: "Secundario",
      institution: "Escuela San Roque 3015",
      location: "Guemes 5256, Santa Fe",
      icon: "📚",
      status: "Completado"
    }
  ]

  const courses = [
    { period: "Abr 2023 - Dic 2024", title: "Curso de Reparacion de PC", institution: "ICOP" },
    { period: "Ene 2023 - Feb 2024", title: "Reparacion de Celulares", institution: "Curso" },
    { title: "Curso de Disenador Grafico", institution: "Glowing" },
    { title: "Desarrollo Web Profesional Full Stack", institution: "ACADEMI" }
  ]

  return (
    <div className="flex h-full" style={{ fontFamily: 'Tahoma, Verdana, sans-serif' }}>
      {/* Left sidebar */}
      <div className="w-[170px] shrink-0 p-2" style={{ background: '#d6dff7' }}>
        <div 
          className="rounded-lg overflow-hidden mb-3"
          style={{ 
            background: 'linear-gradient(180deg, #6b9dd6 0%, #4080c0 100%)',
            border: '1px solid #2b5b8a'
          }}
        >
          <div className="px-3 py-2 text-white text-[11px] font-bold">
            Educacion
          </div>
          <div className="bg-[#d6dff7] p-2 space-y-2">
            <div className="text-center p-2 bg-white rounded border border-gray-300">
              <span className="text-[24px]">🎓</span>
              <p className="text-[10px] text-gray-600 mt-1">3 titulos</p>
              <p className="text-[11px] font-bold text-[#003399]">4 cursos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-3 bg-white overflow-auto">
        {/* Education Timeline */}
        <h2 className="text-[12px] font-bold text-[#003399] mb-3 flex items-center gap-2">
          <span>🎓</span> Formacion Academica
        </h2>
        
        <div className="space-y-2 mb-4">
          {education.map((item, idx) => (
            <div 
              key={idx}
              className="relative pl-6 pb-2 border-l-2 border-[#003399] last:border-l-0"
            >
              <div 
                className="absolute left-[-6px] top-0 w-[10px] h-[10px] rounded-full border-2 border-white"
                style={{ background: 'linear-gradient(180deg, #0054e3 0%, #003399 100%)' }}
              />
              
              <div className="bg-[#f5f5f5] p-3 rounded border border-gray-300">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <span className="text-[18px]">{item.icon}</span>
                    <div>
                      <h3 className="font-bold text-[#003399] text-[11px]">{item.title}</h3>
                      <p className="text-[10px] text-gray-700">{item.institution}</p>
                      <p className="text-[9px] text-gray-500">{item.location}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span 
                      className={`px-2 py-[1px] text-[9px] rounded font-semibold ${
                        item.status === 'En curso' 
                          ? 'bg-[#c8e6c9] text-[#2e7d32]' 
                          : 'bg-[#bbdefb] text-[#1565c0]'
                      }`}
                    >
                      {item.status}
                    </span>
                    <p className="text-[9px] text-gray-500 mt-1">{item.period}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Courses */}
        <h2 className="text-[12px] font-bold text-[#003399] mb-2 flex items-center gap-2">
          <span>📜</span> Cursos y Certificaciones
        </h2>
        
        <div className="grid grid-cols-2 gap-2">
          {courses.map((course, idx) => (
            <div 
              key={idx}
              className="p-2 bg-[#f5f5f5] rounded border border-gray-300 flex items-center gap-2"
            >
              <span className="text-[16px]">📋</span>
              <div>
                <h4 className="font-semibold text-[10px]">{course.title}</h4>
                <p className="text-[9px] text-gray-500">{course.institution}</p>
                {course.period && <p className="text-[9px] text-gray-400">{course.period}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
