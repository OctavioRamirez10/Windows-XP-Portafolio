"use client"

import { useState } from "react"

export function NotepadContent() {
  const [text, setText] = useState(`¡Bienvenido a mi Portfolio!
============================

Hola, soy Octavio Ramirez, 
Técnico en Desarrollo de Software.

Este portfolio está diseñado como 
un sistema operativo Windows XP 
para hacer la experiencia más 
interactiva y memorable.

Explora las carpetas del escritorio
para conocer más sobre mí:

📁 Mi Perfil - Información personal
💼 Experiencia - Historial laboral
🛠️ Habilidades - Competencias
🎓 Educación - Formación
📧 Contacto - Cómo contactarme

¡También puedes jugar al Buscaminas!

Gracias por visitar mi portfolio.
`)

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Menu Bar */}
      <div className="flex gap-4 px-2 py-1 bg-[#ece9d8] border-b border-gray-300 text-sm">
        <button className="hover:underline">Archivo</button>
        <button className="hover:underline">Edición</button>
        <button className="hover:underline">Formato</button>
        <button className="hover:underline">Ver</button>
        <button className="hover:underline">Ayuda</button>
      </div>

      {/* Text Area */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-2 resize-none focus:outline-none font-mono text-sm bg-white"
        style={{ fontFamily: 'Lucida Console, Courier New, monospace' }}
      />

      {/* Status Bar */}
      <div className="px-2 py-1 bg-[#ece9d8] border-t border-gray-300 text-xs text-gray-600 flex justify-between">
        <span>Ln 1, Col 1</span>
        <span>Windows XP Portfolio</span>
      </div>
    </div>
  )
}
