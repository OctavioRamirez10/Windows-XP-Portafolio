"use client"

import { useState } from "react"

export function CalculatorContent() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.")
      setWaitingForOperand(false)
      return
    }
    if (!display.includes(".")) {
      setDisplay(display + ".")
    }
  }

  const clear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      let result = 0

      switch (operation) {
        case "+":
          result = currentValue + inputValue
          break
        case "-":
          result = currentValue - inputValue
          break
        case "*":
          result = currentValue * inputValue
          break
        case "/":
          result = currentValue / inputValue
          break
        default:
          result = inputValue
      }

      setDisplay(String(result))
      setPreviousValue(result)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = () => {
    if (!operation || previousValue === null) return

    const inputValue = parseFloat(display)
    let result = 0

    switch (operation) {
      case "+":
        result = previousValue + inputValue
        break
      case "-":
        result = previousValue - inputValue
        break
      case "*":
        result = previousValue * inputValue
        break
      case "/":
        result = previousValue / inputValue
        break
      default:
        result = inputValue
    }

    setDisplay(String(result))
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(true)
  }

  const buttonStyle = "w-10 h-8 bg-[#e8e8e8] border border-gray-400 rounded-sm hover:bg-[#d0d0d0] active:bg-[#c0c0c0] text-sm font-semibold"
  const operatorStyle = "w-10 h-8 bg-[#f0e8d8] border border-gray-400 rounded-sm hover:bg-[#e0d8c8] active:bg-[#d0c8b8] text-sm font-semibold"

  return (
    <div className="p-2 bg-[#ece9d8] h-full">
      {/* Menu Bar */}
      <div className="flex gap-4 mb-2 text-sm">
        <button className="hover:underline">Ver</button>
        <button className="hover:underline">Edición</button>
        <button className="hover:underline">Ayuda</button>
      </div>

      {/* Display */}
      <input
        type="text"
        value={display}
        readOnly
        className="w-full p-2 mb-2 text-right text-xl font-mono bg-white border-2 border-t-gray-600 border-l-gray-600 border-b-white border-r-white"
      />

      {/* Buttons */}
      <div className="grid grid-cols-5 gap-1">
        {/* Row 1 */}
        <button className={buttonStyle} onClick={() => {}}>MC</button>
        <button className={buttonStyle} onClick={() => {}}>MR</button>
        <button className={buttonStyle} onClick={() => {}}>MS</button>
        <button className={buttonStyle} onClick={() => {}}>M+</button>
        <button className={buttonStyle} onClick={() => {}}>M-</button>

        {/* Row 2 */}
        <button className={buttonStyle} onClick={() => setDisplay(display.slice(0, -1) || "0")}>←</button>
        <button className={buttonStyle} onClick={clear}>CE</button>
        <button className={buttonStyle} onClick={clear}>C</button>
        <button className={buttonStyle} onClick={() => setDisplay(String(-parseFloat(display)))}>±</button>
        <button className={operatorStyle} onClick={() => setDisplay(String(Math.sqrt(parseFloat(display))))}>√</button>

        {/* Row 3 */}
        <button className={buttonStyle} onClick={() => inputDigit("7")}>7</button>
        <button className={buttonStyle} onClick={() => inputDigit("8")}>8</button>
        <button className={buttonStyle} onClick={() => inputDigit("9")}>9</button>
        <button className={operatorStyle} onClick={() => performOperation("/")}>/</button>
        <button className={operatorStyle} onClick={() => setDisplay(String(100 / parseFloat(display)))}>%</button>

        {/* Row 4 */}
        <button className={buttonStyle} onClick={() => inputDigit("4")}>4</button>
        <button className={buttonStyle} onClick={() => inputDigit("5")}>5</button>
        <button className={buttonStyle} onClick={() => inputDigit("6")}>6</button>
        <button className={operatorStyle} onClick={() => performOperation("*")}>*</button>
        <button className={operatorStyle} onClick={() => setDisplay(String(1 / parseFloat(display)))}>1/x</button>

        {/* Row 5 */}
        <button className={buttonStyle} onClick={() => inputDigit("1")}>1</button>
        <button className={buttonStyle} onClick={() => inputDigit("2")}>2</button>
        <button className={buttonStyle} onClick={() => inputDigit("3")}>3</button>
        <button className={operatorStyle} onClick={() => performOperation("-")}>-</button>
        <button 
          className="w-10 h-[72px] row-span-2 bg-[#f0e8d8] border border-gray-400 rounded-sm hover:bg-[#e0d8c8] active:bg-[#d0c8b8] text-xl font-bold"
          onClick={calculate}
        >=</button>

        {/* Row 6 */}
        <button className={`${buttonStyle} col-span-2`} onClick={() => inputDigit("0")}>0</button>
        <button className={buttonStyle} onClick={inputDecimal}>.</button>
        <button className={operatorStyle} onClick={() => performOperation("+")}>+</button>
      </div>
    </div>
  )
}
