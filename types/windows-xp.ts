import React from "react"
export interface WindowState {
  id: string
  title: string
  icon: string
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
  position: { x: number; y: number }
  size: { width: number; height: number }
  content: React.ReactNode
}

export interface DesktopIcon {
  id: string
  title: string
  icon: string
  position: { x: number; y: number }
}

export type BootPhase = 'off' | 'bios' | 'loading' | 'welcome' | 'desktop' | 'shutdown' | 'logoff'
