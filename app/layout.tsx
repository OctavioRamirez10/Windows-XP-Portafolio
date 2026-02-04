import React from "react"
import type { Metadata } from 'next'
import { Arima as Tahoma } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Octavio Ramirez - Portfolio | Windows XP',
  description: 'Portfolio interactivo de Octavio Ramirez - Técnico en Desarrollo de Software con temática Windows XP',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`} style={{ fontFamily: 'Tahoma, Verdana, Arial, sans-serif' }}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
