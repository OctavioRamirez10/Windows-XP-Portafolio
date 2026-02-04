"use client"

import { useState, useRef, useEffect } from "react"

export function WordPadContent() {
  const [content, setContent] = useState("")
  const [fontSize, setFontSize] = useState("12")
  const [fontFamily, setFontFamily] = useState("Tahoma")
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [textColor, setTextColor] = useState("#000000")
  const [alignment, setAlignment] = useState("left")
  const editorRef = useRef<HTMLDivElement>(null)

  const sampleText = `CURRICULUM VITAE

=====================================

DATOS PERSONALES
---------------
Nombre: Octavio Ramirez
Profesión: Desarrollador Full Stack
Email: octavio@example.com
Teléfono: +54 9 11 1234-5678

RESUMEN PROFESIONAL
------------------
Soy un desarrollador apasionado con más de 5 años de experiencia en creación de aplicaciones web modernas. 
Especializado en React, Next.js y tecnologías frontend, con sólidos conocimientos en backend y diseño UX.

EXPERIENCIA LABORAL
-------------------

🏢 Desarrollador Senior | Tech Solutions Inc. | 2021 - Presente
• Lideré el desarrollo de aplicaciones web escalables usando React y Next.js
• Implementé arquitecturas microservicios con Node.js
• Optimicé el rendimiento de las aplicaciones, mejorando los tiempos de carga en un 40%
• Mentoricé a desarrolladores junior en mejores prácticas de código

🏢 Full Stack Developer | Digital Agency | 2019 - 2021
• Desarrollé más de 20 proyectos para clientes diversos
• Integré APIs de terceros y sistemas de pago
• Colaboré en el diseño UI/UX usando Figma y Adobe XD

🏢 Frontend Developer | Startup Tech | 2018 - 2019
• Creé interfaces de usuario responsivas y accesibles
• Implementé testing automatizado con Jest y React Testing Library
• Participé en metodologías ágiles (Scrum)

EDUCACIÓN
----------

🎓 Licenciatura en Sistemas | Universidad Nacional | 2014 - 2018
• Tesis: "Implementación de arquitecturas escalables en aplicaciones web"

🎓 Curso Full Stack | Coding Academy | 2017
• Intensivo de 6 meses en desarrollo web moderno

HABILIDADES TÉCNICAS
-------------------

💻 LENGUAJES DE PROGRAMACIÓN:
• JavaScript/TypeScript (Experto)
• Python (Intermedio)
• Java (Básico)

🛠️ FRAMEWORKS Y LIBRERÍAS:
• React, Next.js, Vue.js (Experto)
• Node.js, Express (Intermedio)
• Angular (Básico)

🎨 DISEÑO UX/UI:
• Figma, Adobe XD, Sketch
• Photoshop, Illustrator

🗄️ BASES DE DATOS:
• MongoDB, PostgreSQL
• MySQL, Redis

☁️ CLOUD Y DEVOPS:
• AWS, Google Cloud Platform
• Docker, Kubernetes
• CI/CD pipelines

PROYECTOS DESTACADOS
-------------------

🌟 Portafolio XP Interactivo
Recreación completa de Windows XP como portafolio web con aplicaciones funcionales.

🌟 E-commerce Platform
Plataforma de comercio electrónico con más de 10,000 usuarios activos.

🌟 Task Management App
Aplicación de gestión de proyectos con tiempo real y colaboración.

IDIOMAS
--------

🇪🇸 Español: Nativo
🇺🇸 Inglés: Avanzado (TOEFL: 95/120)
🇵🇹 Portugués: Intermedio

CERTIFICACIONES
---------------

📜 AWS Certified Developer
📜 Google Cloud Professional
📜 Meta React Developer

CONTACTO
--------

📧 Email: octavio@example.com
💼 LinkedIn: linkedin.com/in/octavio-ramirez
🐙 GitHub: github.com/octavio-ramirez
🌐 Portfolio: octavio-portfolio.com

=====================================
"Gracias por visitar mi portafolio XP!"
=====================================`

  useEffect(() => {
    setContent(sampleText)
  }, [])

  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
  }

  const handleTextChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML)
    }
  }

  const insertText = (text: string) => {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      range.deleteContents()
      range.insertNode(document.createTextNode(text))
      range.collapse(false)
      selection.removeAllRanges()
      selection.addRange(range)
    }
  }

  return (
    <div className="h-full flex flex-col bg-[#f0f0f0]">
      {/* Menu Bar */}
      <div className="bg-[#f0f0f0] border-b border-[#808080]">
        <div className="flex items-center">
          <button className="px-3 py-1 text-xs hover:bg-[#316ac5] hover:text-white">Archivo</button>
          <button className="px-3 py-1 text-xs hover:bg-[#316ac5] hover:text-white">Editar</button>
          <button className="px-3 py-1 text-xs hover:bg-[#316ac5] hover:text-white">Ver</button>
          <button className="px-3 py-1 text-xs hover:bg-[#316ac5] hover:text-white">Insertar</button>
          <button className="px-3 py-1 text-xs hover:bg-[#316ac5] hover:text-white">Formato</button>
          <button className="px-3 py-1 text-xs hover:bg-[#316ac5] hover:text-white">Ayuda</button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-[#f0f0f0] border-b border-[#808080] p-2">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Formatting Buttons */}
          <div className="flex items-center gap-1 border border-[#808080] border-r-[#ffffff] border-t-[#ffffff] p-1">
            <button
              onClick={() => {
                setIsBold(!isBold)
                applyFormat('bold')
              }}
              className={`w-6 h-6 flex items-center justify-center text-xs font-bold ${
                isBold ? 'bg-[#ffffff] border border-[#808080]' : 'hover:bg-[#e0e0e0]'
              }`}
            >
              B
            </button>
            <button
              onClick={() => {
                setIsItalic(!isItalic)
                applyFormat('italic')
              }}
              className={`w-6 h-6 flex items-center justify-center text-xs italic ${
                isItalic ? 'bg-[#ffffff] border border-[#808080]' : 'hover:bg-[#e0e0e0]'
              }`}
            >
              I
            </button>
            <button
              onClick={() => {
                setIsUnderline(!isUnderline)
                applyFormat('underline')
              }}
              className={`w-6 h-6 flex items-center justify-center text-xs underline ${
                isUnderline ? 'bg-[#ffffff] border border-[#808080]' : 'hover:bg-[#e0e0e0]'
              }`}
            >
              U
            </button>
          </div>

          {/* Alignment */}
          <div className="flex items-center gap-1 border border-[#808080] border-r-[#ffffff] border-t-[#ffffff] p-1">
            <button
              onClick={() => {
                setAlignment('left')
                applyFormat('justifyLeft')
              }}
              className={`w-6 h-6 flex items-center justify-center text-xs ${
                alignment === 'left' ? 'bg-[#ffffff] border border-[#808080]' : 'hover:bg-[#e0e0e0]'
              }`}
            >
              ⬅
            </button>
            <button
              onClick={() => {
                setAlignment('center')
                applyFormat('justifyCenter')
              }}
              className={`w-6 h-6 flex items-center justify-center text-xs ${
                alignment === 'center' ? 'bg-[#ffffff] border border-[#808080]' : 'hover:bg-[#e0e0e0]'
              }`}
            >
              ⬌
            </button>
            <button
              onClick={() => {
                setAlignment('right')
                applyFormat('justifyRight')
              }}
              className={`w-6 h-6 flex items-center justify-center text-xs ${
                alignment === 'right' ? 'bg-[#ffffff] border border-[#808080]' : 'hover:bg-[#e0e0e0]'
              }`}
            >
              ➡
            </button>
          </div>

          {/* Font Size */}
          <div className="flex items-center gap-1">
            <span className="text-xs">Tamaño:</span>
            <select
              value={fontSize}
              onChange={(e) => {
                setFontSize(e.target.value)
                applyFormat('fontSize', e.target.value)
              }}
              className="text-xs border border-[#808080] bg-white px-1"
            >
              <option value="8">8</option>
              <option value="10">10</option>
              <option value="12">12</option>
              <option value="14">14</option>
              <option value="16">16</option>
              <option value="18">18</option>
              <option value="24">24</option>
            </select>
          </div>

          {/* Font Family */}
          <div className="flex items-center gap-1">
            <span className="text-xs">Fuente:</span>
            <select
              value={fontFamily}
              onChange={(e) => {
                setFontFamily(e.target.value)
                applyFormat('fontName', e.target.value)
              }}
              className="text-xs border border-[#808080] bg-white px-1"
            >
              <option value="Tahoma">Tahoma</option>
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Verdana">Verdana</option>
            </select>
          </div>

          {/* Text Color */}
          <div className="flex items-center gap-1">
            <span className="text-xs">Color:</span>
            <input
              type="color"
              value={textColor}
              onChange={(e) => {
                setTextColor(e.target.value)
                applyFormat('foreColor', e.target.value)
              }}
              className="w-6 h-6 border border-[#808080]"
            />
          </div>

          {/* Special Characters */}
          <div className="flex items-center gap-1 border border-[#808080] border-r-[#ffffff] border-t-[#ffffff] p-1">
            <button
              onClick={() => insertText("🏢")}
              className="w-6 h-6 flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
            >
              🏢
            </button>
            <button
              onClick={() => insertText("🎓")}
              className="w-6 h-6 flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
            >
              🎓
            </button>
            <button
              onClick={() => insertText("💻")}
              className="w-6 h-6 flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
            >
              💻
            </button>
            <button
              onClick={() => insertText("🌟")}
              className="w-6 h-6 flex items-center justify-center text-xs hover:bg-[#e0e0e0]"
            >
              🌟
            </button>
          </div>
        </div>
      </div>

      {/* Ruler */}
      <div className="bg-[#e0e0e0] border-b border-[#808080] h-6 relative">
        <div className="absolute inset-0 flex items-center px-4">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="flex-1 border-l border-[#999] h-3"></div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 bg-white overflow-auto">
        <div
          ref={editorRef}
          contentEditable
          onInput={handleTextChange}
          className="w-full h-full p-4 outline-none"
          style={{
            fontFamily: fontFamily,
            fontSize: fontSize + 'px',
            color: textColor,
            textAlign: alignment as any,
            lineHeight: '1.5',
            whiteSpace: 'pre-wrap'
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      {/* Status Bar */}
      <div className="bg-[#f0f0f0] border-t border-[#808080] px-2 py-1">
        <div className="flex items-center justify-between text-xs" style={{ fontFamily: 'Tahoma, sans-serif' }}>
          <span>Página 1</span>
          <span>Caracteres: {content.length}</span>
          <span>WordPad - Documento1</span>
        </div>
      </div>
    </div>
  )
}
