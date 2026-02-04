"use client"

import React, { useState, useCallback } from 'react'

interface MobileSolitaireProps {
  onClose: () => void
}

export function MobileSolitaire({ onClose }: MobileSolitaireProps) {
  const [cards, setCards] = useState([
    // Simplified mobile version with fewer cards
    { id: 1, suit: '♠', value: 'A', color: 'black', faceUp: true },
    { id: 2, suit: '♠', value: '2', color: 'black', faceUp: true },
    { id: 3, suit: '♥', value: 'A', color: 'red', faceUp: true },
    { id: 4, suit: '♥', value: '2', color: 'red', faceUp: true },
    { id: 5, suit: '♦', value: 'K', color: 'red', faceUp: false },
    { id: 6, suit: '♣', value: 'Q', color: 'black', faceUp: false },
  ])

  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [score, setScore] = useState(0)

  const handleCardClick = useCallback((cardId: number) => {
    if (selectedCard === cardId) {
      setSelectedCard(null)
    } else {
      setSelectedCard(cardId)
      setScore(prev => prev + 10)
    }
  }, [selectedCard])

  const resetGame = useCallback(() => {
    setCards(cards.map(card => ({ ...card, faceUp: Math.random() > 0.5 })))
    setSelectedCard(null)
    setScore(0)
  }, [])

  return (
    <div className="flex flex-col h-full bg-green-800">
      {/* Game Header */}
      <div className="bg-green-900 p-4 flex justify-between items-center">
        <div className="text-white">
          <span className="font-bold">Solitario</span>
          <span className="ml-4">Puntos: {score}</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={resetGame}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
          >
            Nuevo
          </button>
          <button 
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>

      {/* Game Board */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`h-24 rounded-lg border-2 transition-all transform ${
                selectedCard === card.id 
                  ? 'border-yellow-400 scale-105 shadow-lg' 
                  : 'border-white/50'
              } ${
                card.faceUp 
                  ? 'bg-white text-black' 
                  : 'bg-blue-900 text-blue-700'
              }`}
              disabled={!card.faceUp}
            >
              {card.faceUp ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <span className="text-2xl font-bold">{card.value}</span>
                  <span className="text-xl">{card.suit}</span>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-3xl">🎴</span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Foundation Areas */}
        <div className="grid grid-cols-2 gap-4 mt-6 max-w-sm mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i}
              className="h-24 border-2 border-dashed border-yellow-400/50 rounded-lg flex items-center justify-center"
            >
              <span className="text-yellow-400/50 text-sm">Fundamento {i}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Controls */}
      <div className="bg-green-900 p-3 flex justify-center gap-4">
        <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors">
          💡 Pista
        </button>
        <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors">
          ↩️ Deshacer
        </button>
        <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors">
          📊 Estadísticas
        </button>
      </div>
    </div>
  )
}

interface MobileMinesweeperProps {
  onClose: () => void
}

export function MobileMinesweeper({ onClose }: MobileMinesweeperProps) {
  const [grid, setGrid] = useState(() => {
    const newGrid = []
    for (let i = 0; i < 6; i++) {
      const row = []
      for (let j = 0; j < 6; j++) {
        row.push({
          isMine: Math.random() < 0.15,
          isRevealed: false,
          isFlagged: false,
          adjacentMines: 0
        })
      }
      newGrid.push(row)
    }
    
    // Calculate adjacent mines
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        if (!newGrid[i][j].isMine) {
          let count = 0
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              if (i + di >= 0 && i + di < 6 && j + dj >= 0 && j + dj < 6) {
                if (newGrid[i + di][j + dj].isMine) count++
              }
            }
          }
          newGrid[i][j].adjacentMines = count
        }
      }
    }
    
    return newGrid
  })

  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [flagsLeft, setFlagsLeft] = useState(5)

  const handleCellClick = useCallback((row: number, col: number) => {
    if (gameOver || won) return
    if (grid[row][col].isFlagged || grid[row][col].isRevealed) return

    const newGrid = [...grid]
    newGrid[row][col] = { ...newGrid[row][col], isRevealed: true }

    if (newGrid[row][col].isMine) {
      setGameOver(true)
      // Reveal all mines
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
          if (newGrid[i][j].isMine) {
            newGrid[i][j].isRevealed = true
          }
        }
      }
    }

    setGrid(newGrid)
    
    // Check win condition
    let revealedCount = 0
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        if (newGrid[i][j].isRevealed && !newGrid[i][j].isMine) {
          revealedCount++
        }
      }
    }
    if (revealedCount === 36 - 5) {
      setWon(true)
    }
  }, [grid, gameOver, won])

  const handleLongPress = useCallback((row: number, col: number) => {
    if (gameOver || won || grid[row][col].isRevealed) return

    const newGrid = [...grid]
    newGrid[row][col] = { ...newGrid[row][col], isFlagged: !newGrid[row][col].isFlagged }
    setGrid(newGrid)
    setFlagsLeft(prev => newGrid[row][col].isFlagged ? prev - 1 : prev + 1)
  }, [grid, gameOver, won])

  const resetGame = useCallback(() => {
    window.location.reload()
  }, [])

  const getCellColor = (num: number) => {
    const colors = ['', 'text-blue-600', 'text-green-600', 'text-red-600', 'text-purple-800', 'text-red-800']
    return colors[num] || ''
  }

  return (
    <div className="flex flex-col h-full bg-gray-200">
      {/* Game Header */}
      <div className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="text-white">
          <span className="font-bold">Buscaminas</span>
          <span className="ml-4">🚩 {flagsLeft}</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={resetGame}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
          >
            Nuevo
          </button>
          <button 
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>

      {/* Game Board */}
      <div className="flex-1 p-4 flex items-center justify-center">
        <div className="grid grid-cols-6 gap-1 bg-gray-300 p-2 rounded-lg">
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                onContextMenu={() => handleLongPress(rowIndex, colIndex)}
                className={`w-10 h-10 text-sm font-bold flex items-center justify-center ${
                  cell.isRevealed
                    ? 'bg-gray-100 border border-gray-400'
                    : 'bg-gray-400 border-2 border-t-white border-l-white border-b-gray-600 border-r-gray-600'
                } ${getCellColor(cell.adjacentMines)}`}
                disabled={cell.isRevealed}
              >
                {cell.isRevealed
                  ? cell.isMine
                    ? '💣'
                    : cell.adjacentMines > 0
                      ? cell.adjacentMines
                      : ''
                  : cell.isFlagged
                    ? '🚩'
                    : ''
                }
              </button>
            ))
          )}
        </div>
      </div>

      {/* Game Over / Win Message */}
      {(gameOver || won) && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
          <div className="bg-white rounded-xl p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">
              {gameOver ? '💥 ¡Game Over!' : '🎉 ¡Ganaste!'}
            </h2>
            <button
              onClick={resetGame}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Jugar de Nuevo
            </button>
          </div>
        </div>
      )}

      {/* Mobile Controls */}
      <div className="bg-gray-800 p-3 text-center text-white text-sm">
        Mantén presionado para marcar con bandera
      </div>
    </div>
  )
}

interface MobileCalculatorProps {
  onClose: () => void
}

export function MobileCalculator({ onClose }: MobileCalculatorProps) {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  const handleNumber = useCallback((num: string) => {
    if (waitingForNewValue) {
      setDisplay(num)
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }, [display, waitingForNewValue])

  const handleOperation = useCallback((nextOperation: string) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForNewValue(true)
    setOperation(nextOperation)
  }, [display, previousValue, operation])

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+': return firstValue + secondValue
      case '-': return firstValue - secondValue
      case '*': return firstValue * secondValue
      case '/': return firstValue / secondValue
      default: return secondValue
    }
  }

  const handleEqual = useCallback(() => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }, [display, previousValue, operation])

  const handleClear = useCallback(() => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }, [])

  return (
    <div className="flex flex-col h-full bg-gray-800">
      {/* Calculator Display */}
      <div className="bg-gray-900 p-4">
        <div className="text-right text-white text-3xl font-mono overflow-hidden">
          {display}
        </div>
      </div>

      {/* Calculator Buttons */}
      <div className="flex-1 p-4">
        <div className="grid grid-cols-4 gap-2 h-full">
          {/* First Row */}
          <button
            onClick={handleClear}
            className="bg-gray-600 hover:bg-gray-700 text-white text-xl font-bold rounded-lg transition-colors"
          >
            C
          </button>
          <button
            onClick={() => handleOperation('/')}
            className="bg-gray-600 hover:bg-gray-700 text-white text-xl font-bold rounded-lg transition-colors"
          >
            ÷
          </button>
          <button
            onClick={() => handleOperation('*')}
            className="bg-gray-600 hover:bg-gray-700 text-white text-xl font-bold rounded-lg transition-colors"
          >
            ×
          </button>
          <button
            onClick={() => handleOperation('-')}
            className="bg-gray-600 hover:bg-gray-700 text-white text-xl font-bold rounded-lg transition-colors"
          >
            −
          </button>

          {/* Numbers and Operations */}
          {['7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleNumber(num)}
              className="bg-gray-500 hover:bg-gray-600 text-white text-xl font-bold rounded-lg transition-colors"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleOperation('+')}
            className="bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold rounded-lg transition-colors row-span-2"
          >
            +
          </button>

          {['4', '5', '6'].map((num) => (
            <button
              key={num}
              onClick={() => handleNumber(num)}
              className="bg-gray-500 hover:bg-gray-600 text-white text-xl font-bold rounded-lg transition-colors"
            >
              {num}
            </button>
          ))}

          {['1', '2', '3'].map((num) => (
            <button
              key={num}
              onClick={() => handleNumber(num)}
              className="bg-gray-500 hover:bg-gray-600 text-white text-xl font-bold rounded-lg transition-colors"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleEqual}
            className="bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold rounded-lg transition-colors row-span-2"
          >
            =
          </button>

          {/* Bottom Row */}
          <button
            onClick={() => handleNumber('0')}
            className="bg-gray-500 hover:bg-gray-600 text-white text-xl font-bold rounded-lg transition-colors col-span-2"
          >
            0
          </button>
          <button
            onClick={() => handleNumber('.')}
            className="bg-gray-500 hover:bg-gray-600 text-white text-xl font-bold rounded-lg transition-colors"
          >
            .
          </button>
        </div>
      </div>

      {/* Close Button */}
      <div className="p-4">
        <button
          onClick={onClose}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-bold transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  )
}
