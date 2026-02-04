"use client"

import { useState } from "react"

export function SkillsContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: "🎨",
      color: "#3b82f6",
      bgGradient: "from-blue-500 to-blue-600",
      skills: [
        { name: "React/Next.js", level: 95, description: "Experto en componentes, hooks y optimización", icon: "⚛️" },
        { name: "TypeScript", level: 90, description: "Tipado fuerte y arquitecturas escalables", icon: "📘" },
        { name: "Tailwind CSS", level: 92, description: "Diseño responsivo y sistemas de diseño", icon: "🎯" },
        { name: "JavaScript ES6+", level: 94, description: "DOM, async/await, patrones modernos", icon: "🟨" },
        { name: "HTML5/CSS3", level: 96, description: "Semántica, accesibilidad y animaciones", icon: "🌐" },
        { name: "Vue.js", level: 75, description: "Componentes y Vue Router", icon: "💚" }
      ]
    },
    {
      title: "Backend Development",
      icon: "⚙️",
      color: "#10b981",
      bgGradient: "from-green-500 to-green-600",
      skills: [
        { name: "Node.js", level: 88, description: "APIs REST, middleware y arquitectura", icon: "🟢" },
        { name: "Express.js", level: 85, description: "Rutas, middleware y autenticación", icon: "🚂" },
        { name: "MongoDB", level: 82, description: "NoSQL, agregaciones y rendimiento", icon: "🍃" },
        { name: "PostgreSQL", level: 78, description: "Consultas complejas y optimización", icon: "🐘" },
        { name: "Python", level: 70, description: "Django, Flask y análisis de datos", icon: "🐍" },
        { name: "REST APIs", level: 90, description: "Diseño y documentación con OpenAPI", icon: "🔌" }
      ]
    },
    {
      title: "Tools & DevOps",
      icon: "�️",
      color: "#f59e0b",
      bgGradient: "from-amber-500 to-amber-600",
      skills: [
        { name: "Git/GitHub", level: 92, description: "Branching, PRs y CI/CD", icon: "📦" },
        { name: "Docker", level: 80, description: "Contenedores y orquestación", icon: "🐳" },
        { name: "AWS", level: 75, description: "EC2, S3 y Lambda", icon: "☁️" },
        { name: "Webpack/Vite", level: 85, description: "Build tools y optimización", icon: "📦" },
        { name: "Testing", level: 82, description: "Unit, integration y E2E", icon: "🧪" },
        { name: "CI/CD", level: 78, description: "GitHub Actions y pipelines", icon: "🔄" }
      ]
    },
    {
      title: "UI/UX Design",
      icon: "🎨",
      color: "#8b5cf6",
      bgGradient: "from-purple-500 to-purple-600",
      skills: [
        { name: "Figma", level: 88, description: "Prototipos y sistemas de diseño", icon: "🎨" },
        { name: "Adobe XD", level: 82, description: "Wireframes y user flows", icon: "📱" },
        { name: "Photoshop", level: 85, description: "Retoque y diseño gráfico", icon: "🖼️" },
        { name: "Illustrator", level: 75, description: "Vector e iconografía", icon: "✏️" },
        { name: "Design Systems", level: 80, description: "Componentes y guías de estilo", icon: "📐" },
        { name: "User Research", level: 70, description: "Usabilidad y testing A/B", icon: "👥" }
      ]
    },
    {
      title: "Soft Skills",
      icon: "💡",
      color: "#ef4444",
      bgGradient: "from-red-500 to-red-600",
      skills: [
        { name: "Liderazgo", level: 90, description: "Gestión de equipos y proyectos", icon: "👔" },
        { name: "Comunicación", level: 95, description: "Presentaciones y documentación", icon: "📢" },
        { name: "Resolución Problemas", level: 92, description: "Análisis y soluciones creativas", icon: "🧩" },
        { name: "Trabajo Equipo", level: 94, description: "Colaboración y agile methodologies", icon: "🤝" },
        { name: "Aprendizaje", level: 96, description: "Autodidacta y adaptabilidad", icon: "📚" },
        { name: "Creatividad", level: 88, description: "Innovación y pensamiento lateral", icon: "💭" }
      ]
    }
  ]

  const certifications = [
    { name: "AWS Certified Developer", icon: "☁️", date: "2023", level: "Professional" },
    { name: "Meta React Developer", icon: "⚛️", date: "2023", level: "Professional" },
    { name: "Google Cloud Professional", icon: "🌩️", date: "2022", level: "Professional" },
    { name: "TOEFL English", icon: "🗣️", date: "2022", level: "95/120" }
  ]

  const stats = [
    { label: "Años de Experiencia", value: "5+", icon: "📅" },
    { label: "Proyectos Completados", value: "50+", icon: "🚀" },
    { label: "Clientes Satisfechos", value: "100%", icon: "😊" },
    { label: "Tecnologías Dominadas", value: "25+", icon: "💻" }
  ]

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <span className="text-5xl">🛠️</span>
            Mis Habilidades & Competencias
          </h1>
          <p className="text-lg opacity-90">
            Desarrollador Full Stack con pasión por crear experiencias digitales excepcionales
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-4 text-center transform hover:scale-105 transition-transform">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Skills Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {skillCategories.map((category) => (
            <div 
              key={category.title}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
            >
              <div className={`bg-gradient-to-r ${category.bgGradient} p-4 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{category.icon}</span>
                    <h2 className="text-xl font-bold">{category.title}</h2>
                  </div>
                  <div className="text-sm opacity-90">
                    {category.skills.length} habilidades
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div 
                      key={skill.name}
                      className="border-l-4 pl-4 py-2 hover:bg-gray-50 rounded-r transition-colors cursor-pointer"
                      style={{ borderColor: category.color }}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{skill.icon}</span>
                          <span className="font-semibold text-gray-800">{skill.name}</span>
                        </div>
                        <span className="text-sm font-bold" style={{ color: category.color }}>
                          {skill.level}%
                        </span>
                      </div>
                      
                      {hoveredSkill === skill.name && (
                        <p className="text-sm text-gray-600 mb-2">{skill.description}</p>
                      )}
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${skill.level}%`,
                            background: `linear-gradient(90deg, ${category.color} 0%, ${category.color}dd 100%)`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span>🏆</span>
            Certificaciones & Logros
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {certifications.map((cert, index) => (
              <div 
                key={index}
                className="border-2 border-gray-200 rounded-lg p-4 text-center hover:border-blue-400 transition-colors"
              >
                <div className="text-2xl mb-2">{cert.icon}</div>
                <div className="font-semibold text-gray-800">{cert.name}</div>
                <div className="text-sm text-gray-600">{cert.level}</div>
                <div className="text-xs text-gray-500 mt-1">{cert.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Summary */}
        <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
          <h3 className="text-2xl font-bold mb-4">🎯 Resumen Técnico</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">💻 Frontend</h4>
              <p className="text-sm opacity-90">
                Experto en React, Next.js y TypeScript. Apasionado por crear interfaces 
                intuitivas y experiencias de usuario excepcionales.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">⚙️ Backend</h4>
              <p className="text-sm opacity-90">
                Sólidos conocimientos en Node.js, bases de datos y arquitecturas escalables. 
                Experiencia con APIs REST y microservicios.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🎨 Design</h4>
              <p className="text-sm opacity-90">
                Habilidades en UI/UX design, prototipado y sistemas de diseño. 
                Enfoque en usabilidad y accesibilidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
