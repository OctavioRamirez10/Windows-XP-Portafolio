"use client"

import { useState, useRef, useEffect } from "react"

export function MediaPlayerContent() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration] = useState(240) // 4 minutes demo
  const [volume, setVolume] = useState(75)
  const [currentTrack, setCurrentTrack] = useState(0)
  
  const tracks = [
    { title: "Demo Track 1", artist: "Windows XP", duration: "3:45" },
    { title: "Startup Sound", artist: "Microsoft", duration: "0:08" },
    { title: "Error Sound", artist: "System", duration: "0:02" },
    { title: "Shutdown Sound", artist: "Microsoft", duration: "0:05" }
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, duration])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.target.value))
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value))
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-[#1e3a8a] to-[#1e293b]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4a5568] to-[#2d3748] p-2 border-b border-[#1a202c]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#f59e0b] to-[#d97706] rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">▶</span>
            </div>
            <span className="text-white font-bold text-sm" style={{ fontFamily: 'Tahoma, sans-serif' }}>
              Windows Media Player
            </span>
          </div>
          <div className="flex gap-1">
            <button className="w-4 h-4 bg-[#ef4444] hover:bg-[#dc2626] rounded-full"></button>
            <button className="w-4 h-4 bg-[#eab308] hover:bg-[#ca8a04] rounded-full"></button>
            <button className="w-4 h-4 bg-[#22c55e] hover:bg-[#16a34a] rounded-full"></button>
          </div>
        </div>
      </div>

      {/* Visualization Area */}
      <div className="flex-1 relative bg-gradient-to-b from-[#0f172a] to-[#1e293b] p-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-end gap-1 h-32">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-3 bg-gradient-to-t from-[#3b82f6] to-[#60a5fa] rounded-t"
                style={{
                  height: isPlaying ? `${Math.random() * 100 + 20}%` : '20%',
                  transition: 'height 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Album Art */}
        <div className="absolute top-4 left-4 w-24 h-24 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-lg shadow-2xl flex items-center justify-center">
          <span className="text-white text-2xl">🎵</span>
        </div>

        {/* Track Info */}
        <div className="absolute top-4 right-4 text-white">
          <h3 className="font-bold text-lg" style={{ fontFamily: 'Tahoma, sans-serif' }}>
            {tracks[currentTrack].title}
          </h3>
          <p className="text-sm opacity-80" style={{ fontFamily: 'Tahoma, sans-serif' }}>
            {tracks[currentTrack].artist}
          </p>
        </div>
      </div>

      {/* Playlist */}
      <div className="bg-[#1f2937] border-t border-[#374151] p-2 max-h-32 overflow-y-auto">
        <div className="text-xs text-gray-400 mb-1" style={{ fontFamily: 'Tahoma, sans-serif' }}>
          Playlist
        </div>
        {tracks.map((track, index) => (
          <div
            key={index}
            onClick={() => setCurrentTrack(index)}
            className={`flex items-center justify-between p-1 rounded cursor-pointer text-xs ${
              currentTrack === index ? 'bg-[#374151] text-white' : 'text-gray-300 hover:bg-[#374151]'
            }`}
            style={{ fontFamily: 'Tahoma, sans-serif' }}
          >
            <span>{track.title}</span>
            <span className="text-gray-400">{track.duration}</span>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="bg-[#111827] border-t border-[#374151] p-3">
        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex items-center gap-2 text-xs text-gray-400" style={{ fontFamily: 'Tahoma, sans-serif' }}>
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1 bg-[#374151] rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentTime / duration) * 100}%, #374151 ${(currentTime / duration) * 100}%, #374151 100%)`
              }}
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Previous */}
            <button
              onClick={() => {
                setCurrentTrack(prev => (prev - 1 + tracks.length) % tracks.length)
                setCurrentTime(0)
              }}
              className="w-8 h-8 bg-[#374151] hover:bg-[#4b5563] rounded-full flex items-center justify-center text-white"
            >
              ⏮
            </button>

            {/* Play/Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 bg-[#3b82f6] hover:bg-[#2563eb] rounded-full flex items-center justify-center text-white font-bold"
            >
              {isPlaying ? '⏸' : '▶'}
            </button>

            {/* Next */}
            <button
              onClick={() => {
                setCurrentTrack(prev => (prev + 1) % tracks.length)
                setCurrentTime(0)
              }}
              className="w-8 h-8 bg-[#374151] hover:bg-[#4b5563] rounded-full flex items-center justify-center text-white"
            >
              ⏭
            </button>

            {/* Stop */}
            <button
              onClick={() => {
                setIsPlaying(false)
                setCurrentTime(0)
              }}
              className="w-8 h-8 bg-[#374151] hover:bg-[#4b5563] rounded-full flex items-center justify-center text-white"
            >
              ⏹
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <span className="text-white text-xs" style={{ fontFamily: 'Tahoma, sans-serif' }}>🔊</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-[#374151] rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume}%, #374151 ${volume}%, #374151 100%)`
              }}
            />
            <span className="text-gray-400 text-xs w-8" style={{ fontFamily: 'Tahoma, sans-serif' }}>
              {volume}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
