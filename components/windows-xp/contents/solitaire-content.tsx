"use client"

import { useState, useEffect } from "react"

type Card = {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades'
  rank: string
  value: number
  color: 'red' | 'black'
  faceUp: boolean
  id: string
}

type Pile = Card[]

export function SolitaireContent() {
  const [stock, setStock] = useState<Card[]>([])
  const [waste, setWaste] = useState<Card[]>([])
  const [foundations, setFoundations] = useState<Pile[]>([[], [], [], []])
  const [tableau, setTableau] = useState<Pile[]>([[], [], [], [], [], [], []])
  const [selectedCard, setSelectedCard] = useState<{card: Card, pile: string, index: number} | null>(null)
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)

  const suits = ['hearts', 'diamonds', 'clubs', 'spades'] as const
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
  const suitSymbols = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠'
  }

  const createDeck = (): Card[] => {
    const deck: Card[] = []
    suits.forEach(suit => {
      ranks.forEach((rank, index) => {
        deck.push({
          suit,
          rank,
          value: index + 1,
          color: suit === 'hearts' || suit === 'diamonds' ? 'red' : 'black',
          faceUp: false,
          id: `${suit}-${rank}`
        })
      })
    })
    return deck
  }

  const shuffleDeck = (deck: Card[]): Card[] => {
    const shuffled = [...deck]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const initializeGame = () => {
    const deck = shuffleDeck(createDeck())
    const newTableau: Pile[] = [[], [], [], [], [], [], []]
    
    let deckIndex = 0
    for (let i = 0; i < 7; i++) {
      for (let j = i; j < 7; j++) {
        const card = deck[deckIndex++]
        card.faceUp = i === j
        newTableau[j].push(card)
      }
    }
    
    const remainingCards = deck.slice(deckIndex).map(card => ({ ...card, faceUp: false }))
    
    setTableau(newTableau)
    setStock(remainingCards)
    setWaste([])
    setFoundations([[], [], [], []])
    setMoves(0)
    setGameWon(false)
    setSelectedCard(null)
  }

  useEffect(() => {
    initializeGame()
  }, [])

  const drawFromStock = () => {
    if (stock.length === 0) {
      if (waste.length > 0) {
        setStock(waste.slice().reverse().map(card => ({ ...card, faceUp: false })))
        setWaste([])
      }
    } else {
      const newStock = [...stock]
      const drawnCard = newStock.pop()!
      drawnCard.faceUp = true
      setStock(newStock)
      setWaste([...waste, drawnCard])
      setMoves(moves + 1)
    }
  }

  const canPlaceOnFoundation = (card: Card, foundation: Pile): boolean => {
    if (foundation.length === 0) {
      return card.rank === 'A'
    }
    const topCard = foundation[foundation.length - 1]
    return topCard.suit === card.suit && card.value === topCard.value + 1
  }

  const canPlaceOnTableau = (card: Card, pile: Pile): boolean => {
    if (pile.length === 0) {
      return card.rank === 'K'
    }
    const topCard = pile[pile.length - 1]
    return topCard.color !== card.color && topCard.value === card.value + 1
  }

  const handleCardClick = (card: Card, pile: string, index: number) => {
    if (!card.faceUp) return

    if (selectedCard && selectedCard.card.id === card.id) {
      setSelectedCard(null)
      return
    }

    if (selectedCard) {
      // Try to place the selected card
      if (pile.startsWith('foundation')) {
        const foundationIndex = parseInt(pile.split('-')[1])
        if (canPlaceOnFoundation(selectedCard.card, foundations[foundationIndex])) {
          const newFoundations = [...foundations]
          newFoundations[foundationIndex] = [...newFoundations[foundationIndex], selectedCard.card]
          setFoundations(newFoundations)
          
          // Remove card from original pile
          removeFromOriginalPile()
          setSelectedCard(null)
          setMoves(moves + 1)
          checkWinCondition(newFoundations)
        }
      } else if (pile.startsWith('tableau')) {
        const tableauIndex = parseInt(pile.split('-')[1])
        if (canPlaceOnTableau(selectedCard.card, tableau[tableauIndex])) {
          const newTableau = [...tableau]
          newTableau[tableauIndex] = [...newTableau[tableauIndex], selectedCard.card]
          setTableau(newTableau)
          
          removeFromOriginalPile()
          setSelectedCard(null)
          setMoves(moves + 1)
        }
      }
    } else {
      setSelectedCard({ card, pile, index })
    }
  }

  const removeFromOriginalPile = () => {
    if (!selectedCard) return

    if (selectedCard.pile === 'waste') {
      setWaste(waste.slice(0, -1))
    } else if (selectedCard.pile.startsWith('tableau')) {
      const tableauIndex = parseInt(selectedCard.pile.split('-')[1])
      const newTableau = [...tableau]
      newTableau[tableauIndex] = newTableau[tableauIndex].slice(0, -1)
      // Flip the new top card if needed
      if (newTableau[tableauIndex].length > 0) {
        const topCard = newTableau[tableauIndex][newTableau[tableauIndex].length - 1]
        if (!topCard.faceUp) {
          topCard.faceUp = true
        }
      }
      setTableau(newTableau)
    } else if (selectedCard.pile.startsWith('foundation')) {
      const foundationIndex = parseInt(selectedCard.pile.split('-')[1])
      const newFoundations = [...foundations]
      newFoundations[foundationIndex] = newFoundations[foundationIndex].slice(0, -1)
      setFoundations(newFoundations)
    }
  }

  const checkWinCondition = (currentFoundations: Pile[]) => {
    const totalCards = currentFoundations.reduce((sum, foundation) => sum + foundation.length, 0)
    if (totalCards === 52) {
      setGameWon(true)
    }
  }

  const renderCard = (card: Card | null, isSelected: boolean = false, onClick?: () => void) => {
    if (!card) {
      return (
        <div className="w-16 h-24 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-xs">Vacío</span>
        </div>
      )
    }

    if (!card.faceUp) {
      return (
        <div className="w-16 h-24 bg-gradient-to-br from-blue-800 to-blue-600 border-2 border-blue-900 rounded-lg flex items-center justify-center cursor-pointer" onClick={onClick}>
          <div className="text-white text-xs font-bold">XP</div>
        </div>
      )
    }

    return (
      <div 
        className={`w-16 h-24 bg-white border-2 rounded-lg flex flex-col items-center justify-center cursor-pointer ${
          isSelected ? 'border-blue-500 shadow-lg' : 'border-gray-700'
        } hover:border-blue-400 transition-colors`}
        onClick={onClick}
      >
        <div className={`text-2xl font-bold ${card.color === 'red' ? 'text-red-500' : 'text-black'}`}>
          {card.rank}
        </div>
        <div className={`text-3xl ${card.color === 'red' ? 'text-red-500' : 'text-black'}`}>
          {suitSymbols[card.suit]}
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-green-800 to-green-600">
      {/* Header */}
      <div className="bg-green-900 border-b-2 border-green-700 p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-white font-bold text-lg" style={{ fontFamily: 'Tahoma, sans-serif' }}>
              🃏 Solitario
            </h1>
            <div className="text-white text-sm" style={{ fontFamily: 'Tahoma, sans-serif' }}>
              Movimientos: {moves}
            </div>
          </div>
          <button
            onClick={initializeGame}
            className="px-3 py-1 bg-green-700 hover:bg-green-600 text-white text-sm rounded border border-green-500"
            style={{ fontFamily: 'Tahoma, sans-serif' }}
          >
            Nuevo Juego
          </button>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 p-4">
        {/* Top Row: Stock, Waste, and Foundations */}
        <div className="flex justify-between mb-8">
          <div className="flex gap-4">
            {/* Stock */}
            <div onClick={drawFromStock} className="cursor-pointer">
              {stock.length > 0 ? (
                <div className="w-16 h-24 bg-gradient-to-br from-blue-800 to-blue-600 border-2 border-blue-900 rounded-lg flex items-center justify-center">
                  <div className="text-white text-xs font-bold">XP</div>
                </div>
              ) : (
                <div className="w-16 h-24 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-xs">♻️</span>
                </div>
              )}
            </div>

            {/* Waste */}
            <div>
              {waste.length > 0 ? renderCard(waste[waste.length - 1], selectedCard?.card.id === waste[waste.length - 1].id) : renderCard(null)}
            </div>
          </div>

          {/* Foundations */}
          <div className="flex gap-4">
            {foundations.map((foundation, index) => (
              <div key={index}>
                {foundation.length > 0 ? (
                  renderCard(foundation[foundation.length - 1])
                ) : (
                  <div onClick={() => handleCardClick(null as any, `foundation-${index}`, 0)}>
                    <div className="w-16 h-24 border-2 border-dashed border-yellow-400 rounded-lg flex items-center justify-center">
                      <span className="text-yellow-400 text-lg">{suitSymbols[suits[index]]}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tableau */}
        <div className="flex gap-4 justify-center">
          {tableau.map((pile, pileIndex) => (
            <div key={pileIndex} className="flex flex-col gap-1">
              {pile.length === 0 ? (
                <div onClick={() => handleCardClick(null as any, `tableau-${pileIndex}`, 0)}>
                  <div className="w-16 h-24 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-xs">K</span>
                  </div>
                </div>
              ) : (
                pile.map((card, cardIndex) => (
                  <div 
                    key={card.id} 
                    onClick={() => handleCardClick(card, `tableau-${pileIndex}`, cardIndex)}
                    style={{ marginTop: cardIndex === 0 ? 0 : -80 }}
                  >
                    {renderCard(card, selectedCard?.card.id === card.id)}
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Win Message */}
      {gameWon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4 text-green-600">🎉 ¡Felicidades!</h2>
            <p className="text-lg mb-4">Has ganado en {moves} movimientos</p>
            <button
              onClick={initializeGame}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
            >
              Jugar de Nuevo
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
