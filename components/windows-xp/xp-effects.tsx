"use client"

interface SoundEffects {
  startup: string
  shutdown: string
  error: string
  notification: string
  click: string
  minimize: string
  maximize: string
  open: string
  close: string
}

export class XPSoundManager {
  private audioContext: AudioContext | null = null
  private sounds: Map<string, AudioBuffer> = new Map()
  private isEnabled = true

  constructor() {
    // Initialize Web Audio API
    if (typeof window !== 'undefined' && window.AudioContext) {
      this.audioContext = new AudioContext()
      this.generateSounds()
    }
  }

  private generateSounds() {
    if (!this.audioContext) return

    // Create synthetic sounds using Web Audio API
    this.sounds.set('startup', this.createStartupSound())
    this.sounds.set('shutdown', this.createShutdownSound())
    this.sounds.set('error', this.createErrorSound())
    this.sounds.set('notification', this.createNotificationSound())
    this.sounds.set('click', this.createClickSound())
    this.sounds.set('minimize', this.createMinimizeSound())
    this.sounds.set('maximize', this.createMaximizeSound())
    this.sounds.set('open', this.createOpenSound())
    this.sounds.set('close', this.createCloseSound())
  }

  private createStartupSound(): AudioBuffer {
    if (!this.audioContext) return this.createSilentSound()
    
    const duration = 2.5
    const sampleRate = this.audioContext.sampleRate
    const buffer = this.audioContext.createBuffer(2, sampleRate * duration, sampleRate)
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = buffer.getChannelData(channel)
      for (let i = 0; i < channelData.length; i++) {
        const t = i / sampleRate
        // XP startup sound - ascending chime
        const frequency1 = 523.25 * Math.exp(t * 0.5) // C5 ascending
        const frequency2 = 659.25 * Math.exp(t * 0.3) // E5 ascending
        const envelope = Math.sin(t * Math.PI / duration) // Smooth envelope
        
        channelData[i] = (
          Math.sin(2 * Math.PI * frequency1 * t) * 0.3 +
          Math.sin(2 * Math.PI * frequency2 * t) * 0.2
        ) * envelope * 0.3
      }
    }
    
    return buffer
  }

  private createShutdownSound(): AudioBuffer {
    if (!this.audioContext) return this.createSilentSound()
    
    const duration = 1.5
    const sampleRate = this.audioContext.sampleRate
    const buffer = this.audioContext.createBuffer(2, sampleRate * duration, sampleRate)
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = buffer.getChannelData(channel)
      for (let i = 0; i < channelData.length; i++) {
        const t = i / sampleRate
        // XP shutdown sound - descending chime
        const frequency = 440 * Math.exp(-t * 2) // A4 descending
        const envelope = Math.cos(t * Math.PI / (2 * duration)) // Smooth fade
        
        channelData[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.4
      }
    }
    
    return buffer
  }

  private createErrorSound(): AudioBuffer {
    if (!this.audioContext) return this.createSilentSound()
    
    const duration = 0.3
    const sampleRate = this.audioContext.sampleRate
    const buffer = this.audioContext.createBuffer(2, sampleRate * duration, sampleRate)
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = buffer.getChannelData(channel)
      for (let i = 0; i < channelData.length; i++) {
        const t = i / sampleRate
        // Error sound - harsh buzz
        const frequency = 200 + Math.random() * 100
        const noise = (Math.random() - 0.5) * 0.5
        const envelope = Math.exp(-t * 10) // Quick decay
        
        channelData[i] = (Math.sin(2 * Math.PI * frequency * t) + noise) * envelope * 0.5
      }
    }
    
    return buffer
  }

  private createNotificationSound(): AudioBuffer {
    if (!this.audioContext) return this.createSilentSound()
    
    const duration = 0.4
    const sampleRate = this.audioContext.sampleRate
    const buffer = this.audioContext.createBuffer(2, sampleRate * duration, sampleRate)
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = buffer.getChannelData(channel)
      for (let i = 0; i < channelData.length; i++) {
        const t = i / sampleRate
        // Notification sound - gentle chime
        const frequency = 800
        const envelope = Math.sin(t * Math.PI / duration) * Math.exp(-t * 3)
        
        channelData[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.3
      }
    }
    
    return buffer
  }

  private createClickSound(): AudioBuffer {
    if (!this.audioContext) return this.createSilentSound()
    
    const duration = 0.05
    const sampleRate = this.audioContext.sampleRate
    const buffer = this.audioContext.createBuffer(2, sampleRate * duration, sampleRate)
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = buffer.getChannelData(channel)
      for (let i = 0; i < channelData.length; i++) {
        const t = i / sampleRate
        // Click sound - short tap
        const frequency = 1000
        const envelope = Math.exp(-t * 50)
        
        channelData[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.2
      }
    }
    
    return buffer
  }

  private createMinimizeSound(): AudioBuffer {
    if (!this.audioContext) return this.createSilentSound()
    
    const duration = 0.2
    const sampleRate = this.audioContext.sampleRate
    const buffer = this.audioContext.createBuffer(2, sampleRate * duration, sampleRate)
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = buffer.getChannelData(channel)
      for (let i = 0; i < channelData.length; i++) {
        const t = i / sampleRate
        // Minimize sound - quick descending sweep
        const frequency = 600 * (1 - t / duration)
        const envelope = Math.exp(-t * 10)
        
        channelData[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.3
      }
    }
    
    return buffer
  }

  private createMaximizeSound(): AudioBuffer {
    if (!this.audioContext) return this.createSilentSound()
    
    const duration = 0.2
    const sampleRate = this.audioContext.sampleRate
    const buffer = this.audioContext.createBuffer(2, sampleRate * duration, sampleRate)
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = buffer.getChannelData(channel)
      for (let i = 0; i < channelData.length; i++) {
        const t = i / sampleRate
        // Maximize sound - quick ascending sweep
        const frequency = 400 * (1 + t / duration)
        const envelope = Math.exp(-t * 10)
        
        channelData[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.3
      }
    }
    
    return buffer
  }

  private createOpenSound(): AudioBuffer {
    if (!this.audioContext) return this.createSilentSound()
    
    const duration = 0.15
    const sampleRate = this.audioContext.sampleRate
    const buffer = this.audioContext.createBuffer(2, sampleRate * duration, sampleRate)
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = buffer.getChannelData(channel)
      for (let i = 0; i < channelData.length; i++) {
        const t = i / sampleRate
        // Open sound - gentle pop
        const frequency = 400
        const envelope = Math.exp(-t * 15)
        
        channelData[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.25
      }
    }
    
    return buffer
  }

  private createCloseSound(): AudioBuffer {
    if (!this.audioContext) return this.createSilentSound()
    
    const duration = 0.1
    const sampleRate = this.audioContext.sampleRate
    const buffer = this.audioContext.createBuffer(2, sampleRate * duration, sampleRate)
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = buffer.getChannelData(channel)
      for (let i = 0; i < channelData.length; i++) {
        const t = i / sampleRate
        // Close sound - soft click
        const frequency = 300
        const envelope = Math.exp(-t * 20)
        
        channelData[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.2
      }
    }
    
    return buffer
  }

  private createSilentSound(): AudioBuffer {
    if (!this.audioContext) {
      // Return a simple empty buffer for fallback - using any to bypass type checking
      return {} as AudioBuffer
    }
    return this.audioContext.createBuffer(1, 1, this.audioContext.sampleRate)
  }

  play(soundName: keyof SoundEffects) {
    if (!this.isEnabled || !this.audioContext) return
    
    const sound = this.sounds.get(soundName)
    if (!sound) return
    
    const source = this.audioContext.createBufferSource()
    source.buffer = sound
    
    const gainNode = this.audioContext.createGain()
    gainNode.gain.value = 0.3 // Volume control
    
    source.connect(gainNode)
    gainNode.connect(this.audioContext.destination)
    
    source.start(0)
  }

  setEnabled(enabled: boolean) {
    this.isEnabled = enabled
  }

  toggle() {
    this.isEnabled = !this.isEnabled
    return this.isEnabled
  }
}

// Visual Effects Manager
export class XPVisualEffects {
  private static instance: XPVisualEffects
  private effects: Map<string, HTMLElement> = new Map()

  static getInstance(): XPVisualEffects {
    if (!XPVisualEffects.instance) {
      XPVisualEffects.instance = new XPVisualEffects()
    }
    return XPVisualEffects.instance
  }

  createCursorTrail(x: number, y: number) {
    const trail = document.createElement('div')
    trail.className = 'xp-cursor-trail'
    trail.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, rgba(135, 206, 235, 0.6) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      animation: cursorFade 0.5s ease-out forwards;
    `
    
    document.body.appendChild(trail)
    
    setTimeout(() => {
      trail.remove()
    }, 500)
  }

  createClickEffect(x: number, y: number) {
    const effect = document.createElement('div')
    effect.className = 'xp-click-effect'
    effect.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 30px;
      height: 30px;
      border: 2px solid #316ac5;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      animation: clickRipple 0.4s ease-out forwards;
      transform: translate(-50%, -50%);
    `
    
    document.body.appendChild(effect)
    
    setTimeout(() => {
      effect.remove()
    }, 400)
  }

  createWindowOpenEffect(element: HTMLElement) {
    element.style.animation = 'windowOpen 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  }

  createWindowCloseEffect(element: HTMLElement) {
    element.style.animation = 'windowClose 0.2s ease-in forwards'
  }

  createNotificationSlide(element: HTMLElement) {
    element.style.animation = 'notificationSlide 0.3s ease-out'
  }

  createBootEffect() {
    const effect = document.createElement('div')
    effect.className = 'xp-boot-effect'
    effect.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle, rgba(135, 206, 235, 0.2) 0%, transparent 70%);
      pointer-events: none;
      z-index: 9998;
      animation: bootPulse 0.5s ease-out forwards;
    `
    
    document.body.appendChild(effect)
    
    setTimeout(() => {
      effect.remove()
    }, 500)
  }
}

// Add CSS animations
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes cursorFade {
      from {
        opacity: 1;
        transform: scale(1);
      }
      to {
        opacity: 0;
        transform: scale(0.5);
      }
    }
    
    @keyframes clickRipple {
      from {
        opacity: 1;
        transform: translate(-50%, -50%) scale(0);
      }
      to {
        opacity: 0;
        transform: translate(-50%, -50%) scale(2);
      }
    }
    
    @keyframes windowOpen {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    @keyframes windowClose {
      from {
        opacity: 1;
        transform: scale(1);
      }
      to {
        opacity: 0;
        transform: scale(0.95);
      }
    }
    
    @keyframes notificationSlide {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes bootPulse {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `
  document.head.appendChild(style)
}
