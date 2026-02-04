"use client"

import React from "react"
import { useState } from "react"

export function ContactContent() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
    setFormData({ name: '', email: '', message: '' })
  }

  const contactInfo = [
    { icon: '📧', label: 'Email', value: 'octaarami@gmail.com', href: 'mailto:octaarami@gmail.com' },
    { icon: '📱', label: 'Telefono', value: '+54 342-432-4206', href: 'tel:+543424324206' },
    { icon: '📍', label: 'Ubicacion', value: 'Santa Fe, Argentina', href: null },
    { icon: '🐙', label: 'GitHub', value: 'github.com/OctavioRamirez10', href: 'https://github.com/OctavioRamirez10' },
  ]

  return (
    <div className="flex h-full" style={{ fontFamily: 'Tahoma, Verdana, sans-serif' }}>
      {/* Left sidebar */}
      <div className="w-[170px] shrink-0 p-2" style={{ background: '#d6dff7' }}>
        <div 
          className="rounded-lg overflow-hidden"
          style={{ 
            background: 'linear-gradient(180deg, #6b9dd6 0%, #4080c0 100%)',
            border: '1px solid #2b5b8a'
          }}
        >
          <div className="px-3 py-2 text-white text-[11px] font-bold">
            Contacto rapido
          </div>
          <div className="bg-[#d6dff7] p-2 space-y-1">
            <a 
              href="mailto:octaarami@gmail.com"
              className="block w-full text-left text-[11px] text-[#215dc6] hover:underline py-1"
            >
              📧 Enviar email
            </a>
            <a 
              href="https://github.com/OctavioRamirez10"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-left text-[11px] text-[#215dc6] hover:underline py-1"
            >
              🐙 Ver GitHub
            </a>
            <a 
              href="tel:+543424324206"
              className="block w-full text-left text-[11px] text-[#215dc6] hover:underline py-1"
            >
              📱 Llamar
            </a>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-3 bg-white overflow-auto">
        <div className="grid grid-cols-2 gap-4">
          {/* Contact Info */}
          <div>
            <h2 className="text-[12px] font-bold text-[#003399] mb-2 flex items-center gap-2">
              <span>📇</span> Informacion de Contacto
            </h2>
            
            <div className="space-y-2">
              {contactInfo.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-2 bg-[#f5f5f5] rounded border border-gray-300 flex items-center gap-2 hover:bg-[#e8f0fb] transition-colors"
                >
                  <span className="text-[16px]">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] text-gray-500">{item.label}</p>
                    {item.href ? (
                      <a 
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[11px] text-[#003399] hover:underline truncate block"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-semibold text-[11px] truncate">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div 
              className="mt-3 p-3 rounded text-white"
              style={{ background: 'linear-gradient(180deg, #0054e3 0%, #003399 100%)' }}
            >
              <h3 className="font-bold text-[11px] mb-1">Conectemos!</h3>
              <p className="text-[10px] opacity-90 mb-2">
                Estoy abierto a nuevas oportunidades y colaboraciones.
              </p>
              <a 
                href="https://github.com/OctavioRamirez10"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2 py-1 bg-white text-[#003399] rounded text-[10px] font-semibold hover:bg-gray-100"
              >
                <span>🐙</span> Ver GitHub
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-[12px] font-bold text-[#003399] mb-2 flex items-center gap-2">
              <span>✉️</span> Enviar Mensaje
            </h2>
            
            {showSuccess && (
              <div className="mb-2 p-2 bg-[#c8e6c9] border border-[#a5d6a7] rounded text-[#2e7d32] text-[10px] flex items-center gap-2">
                <span>✓</span> Mensaje enviado con exito!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-2">
              <div>
                <label className="block text-[10px] font-semibold mb-[2px]">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-2 py-1 text-[11px] bg-white focus:outline-none focus:ring-1 focus:ring-[#003399]"
                  style={{ border: '1px solid #7f9db9', borderRight: '1px solid #ced4da', borderBottom: '1px solid #ced4da' }}
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold mb-[2px]">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-2 py-1 text-[11px] bg-white focus:outline-none focus:ring-1 focus:ring-[#003399]"
                  style={{ border: '1px solid #7f9db9', borderRight: '1px solid #ced4da', borderBottom: '1px solid #ced4da' }}
                  placeholder="tu@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold mb-[2px]">Mensaje</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-2 py-1 text-[11px] bg-white focus:outline-none focus:ring-1 focus:ring-[#003399] h-[80px] resize-none"
                  style={{ border: '1px solid #7f9db9', borderRight: '1px solid #ced4da', borderBottom: '1px solid #ced4da' }}
                  placeholder="Escribe tu mensaje..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-[6px] text-white text-[11px] font-semibold rounded-[3px] hover:brightness-110 transition-all"
                style={{
                  background: 'linear-gradient(180deg, #0066cc 0%, #003399 100%)',
                  border: '1px solid #002266',
                  boxShadow: '0 1px 0 rgba(255,255,255,0.3) inset'
                }}
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
