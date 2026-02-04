"use client"

import React from "react"

import { useState, useCallback } from "react"

type CellState = {
  isMine: boolean
  isRevealed: boolean
  isFlagged: boolean
  adjacentMines: number
}

const GRID_SIZE = 9
const MINES_COUNT = 10

export function MinesweeperContent() {
  const [grid, setGrid] = useState<CellState[][]>(() => initializeGrid())
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [minesLeft, setMinesLeft] = useState(MINES_COUNT)

  function initializeGrid(): CellState[][] {
    const newGrid: CellState[][] = Array(GRID_SIZE).fill(null).map(() =>
      Array(GRID_SIZE).fill(null).map(() => ({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        adjacentMines: 0,
      }))
    )

    // Place mines
    let minesPlaced = 0
    while (minesPlaced < MINES_COUNT) {
      const row = Math.floor(Math.random() * GRID_SIZE)
      const col = Math.floor(Math.random() * GRID_SIZE)
      if (!newGrid[row][col].isMine) {
        newGrid[row][col].isMine = true
        minesPlaced++
      }
    }

    // Calculate adjacent mines
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (!newGrid[row][col].isMine) {
          let count = 0
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = row + dr
              const nc = col + dc
              if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE && newGrid[nr][nc].isMine) {
                count++
              }
            }
          }
          newGrid[row][col].adjacentMines = count
        }
      }
    }

    return newGrid
  }

  const revealCell = useCallback((row: number, col: number) => {
    if (gameOver || won) return

    setGrid(prevGrid => {
      const newGrid = prevGrid.map(r => r.map(c => ({...c})))
      
      if (newGrid[row][col].isRevealed || newGrid[row][col].isFlagged) return prevGrid

      newGrid[row][col].isRevealed = true

      if (newGrid[row][col].isMine) {
        setGameOver(true)
        // Reveal all mines
        for (let r = 0; r < GRID_SIZE; r++) {
          for (let c = 0; c < GRID_SIZE; c++) {
            if (newGrid[r][c].isMine) {
              newGrid[r][c].isRevealed = true
            }
          }
        }
        return newGrid
      }

      // Flood fill for empty cells
      if (newGrid[row][col].adjacentMines === 0) {
        const stack = [[row, col]]
        while (stack.length > 0) {
          const [r, c] = stack.pop()!
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr
              const nc = c + dc
              if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE && 
                  !newGrid[nr][nc].isRevealed && !newGrid[nr][nc].isFlagged && !newGrid[nr][nc].isMine) {
                newGrid[nr][nc].isRevealed = true
                if (newGrid[nr][nc].adjacentMines === 0) {
                  stack.push([nr, nc])
                }
              }
            }
          }
        }
      }

      // Check win
      let revealedCount = 0
      for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
          if (newGrid[r][c].isRevealed && !newGrid[r][c].isMine) {
            revealedCount++
          }
        }
      }
      if (revealedCount === GRID_SIZE * GRID_SIZE - MINES_COUNT) {
        setWon(true)
      }

      return newGrid
    })
  }, [gameOver, won])

  const toggleFlag = useCallback((row: number, col: number, e: React.MouseEvent) => {
    e.preventDefault()
    if (gameOver || won) return

    setGrid(prevGrid => {
      const newGrid = prevGrid.map(r => r.map(c => ({...c})))
      if (!newGrid[row][col].isRevealed) {
        newGrid[row][col].isFlagged = !newGrid[row][col].isFlagged
        setMinesLeft(prev => newGrid[row][col].isFlagged ? prev - 1 : prev + 1)
      }
      return newGrid
    })
  }, [gameOver, won])

  const resetGame = () => {
    setGrid(initializeGrid())
    setGameOver(false)
    setWon(false)
    setMinesLeft(MINES_COUNT)
  }

  const getCellColor = (num: number) => {
    const colors = ['', 'text-blue-600', 'text-green-600', 'text-red-600', 'text-purple-800', 'text-red-800', 'text-cyan-600', 'text-black', 'text-gray-600']
    return colors[num] || ''
  }

  return (
    <div className="p-4 bg-[#c0c0c0] h-full flex flex-col items-center">
      {/* Menu Bar */}
      <div className="w-full flex gap-4 mb-2 text-sm">
        <button className="hover:underline">Juego</button>
        <button className="hover:underline">Ayuda</button>
      </div>

      {/* Game Container */}
      <div className="bg-[#c0c0c0] p-2 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-b-gray-600 border-r-gray-600">
        {/* Stats Bar */}
        <div className="flex justify-between items-center mb-2 p-1 bg-[#c0c0c0] border-2 border-t-gray-600 border-l-gray-600 border-b-white border-r-white">
          <div className="bg-black text-red-500 font-mono text-xl px-2 py-1 min-w-[50px] text-center">
            {String(minesLeft).padStart(3, '0')}
          </div>
          <button
            onClick={resetGame}
            className="w-8 h-8 bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-gray-600 border-r-gray-600 flex items-center justify-center text-xl active:border-t-gray-600 active:border-l-gray-600 active:border-b-white active:border-r-white"
          >
            {gameOver ? '😵' : won ? '😎' : '🙂'}
          </button>
          <div className="bg-black text-red-500 font-mono text-xl px-2 py-1 min-w-[50px] text-center">
            000
          </div>
        </div>

        {/* Grid */}
        <div className="border-2 border-t-gray-600 border-l-gray-600 border-b-white border-r-white">
          {grid.map((row, rowIdx) => (
            <div key={rowIdx} className="flex">
              {row.map((cell, colIdx) => (
                <button
                  key={colIdx}
                  onClick={() => revealCell(rowIdx, colIdx)}
                  onContextMenu={(e) => toggleFlag(rowIdx, colIdx, e)}
                  className={`w-6 h-6 text-xs font-bold flex items-center justify-center ${
                    cell.isRevealed
                      ? 'bg-[#c0c0c0] border border-gray-400'
                      : 'bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-gray-600 border-r-gray-600 hover:brightness-105'
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
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Game Over / Win Message */}
      {(gameOver || won) && (
        <div className="mt-4 p-3 bg-white border-2 border-gray-400 rounded shadow text-center">
          <p className="font-bold text-lg mb-2">
            {gameOver ? '¡Game Over!' : '¡Ganaste!'}
          </p>
          <button
            onClick={resetGame}
            className="px-4 py-1 bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-gray-600 border-r-gray-600 hover:brightness-105"
          >
            Jugar de Nuevo
          </button>
        </div>
      )}
    </div>
  )
}
