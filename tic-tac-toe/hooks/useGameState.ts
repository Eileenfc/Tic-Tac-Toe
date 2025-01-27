import { useState, useEffect } from "react"
import { type Board, type CellValue, checkWinner, isBoardFull, getBestMove, getRandomMove } from "../utils/gameLogic"

export type Difficulty = "easy" | "hard"

export const useGameState = (initialDifficulty: Difficulty = "easy") => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null))
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [winner, setWinner] = useState<CellValue>(null)
  const [winningLine, setWinningLine] = useState<number[] | null>(null)
  const [difficulty, setDifficulty] = useState<Difficulty>(initialDifficulty)
  const [scores, setScores] = useState({ wins: 0, losses: 0, draws: 0 })

  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      const timer = setTimeout(() => {
        const aiMove = difficulty === "easy" ? getRandomMove(board) : getBestMove(board)
        makeMove(aiMove)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isPlayerTurn, winner, board, difficulty])

  const makeMove = (index: number) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = isPlayerTurn ? "X" : "O"
    setBoard(newBoard)

    const { winner: newWinner, line } = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      setWinningLine(line)
      updateScores(newWinner)
    } else if (isBoardFull(newBoard)) {
      setWinner("draw")
      updateScores("draw")
    } else {
      setIsPlayerTurn(!isPlayerTurn)
    }
  }

  const updateScores = (result: CellValue | "draw") => {
    setScores((prevScores) => {
      if (result === "X") return { ...prevScores, wins: prevScores.wins + 1 }
      if (result === "O") return { ...prevScores, losses: prevScores.losses + 1 }
      return { ...prevScores, draws: prevScores.draws + 1 }
    })
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsPlayerTurn(true)
    setWinner(null)
    setWinningLine(null)
  }

  return {
    board,
    isPlayerTurn,
    winner,
    winningLine,
    difficulty,
    scores,
    makeMove,
    resetGame,
    setDifficulty,
  }
}

