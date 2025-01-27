"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { Board } from "./Board"
import { ScoreBoard } from "./ScoreBoard"
import { DifficultySelector } from "./DifficultySelector"
import { useGameState } from "../hooks/useGameState"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { MoonIcon, SunIcon } from "lucide-react"

export const TicTacToe: React.FC = () => {
  const { board, isPlayerTurn, winner, winningLine, difficulty, scores, makeMove, resetGame, setDifficulty } =
    useGameState()

  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setIsDarkMode(darkModeMediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches)
    darkModeMediaQuery.addEventListener("change", handleChange)

    return () => darkModeMediaQuery.removeEventListener("change", handleChange)
  }, [])

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  const getGameStatus = () => {
    if (winner === "X") return "You win!"
    if (winner === "O") return "You lose!"
    if (winner === "draw") return "It's a draw!"
    return isPlayerTurn ? "Your turn" : "Computer's turn"
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300 ${isDarkMode ? "dark" : ""}`}
    >
      <Card className="w-full max-w-5xl p-6 md:p-8">
        <CardHeader>
          <CardTitle className="text-3xl md:text-4xl font-bold text-center">Tic-Tac-Toe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="md:flex md:justify-between md:items-start md:space-x-8">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <ScoreBoard scores={scores} />
              <DifficultySelector difficulty={difficulty} onChangeDifficulty={setDifficulty} />
            </div>
            <div className="md:w-2/3">
              <Board board={board} winningLine={winningLine} onCellClick={makeMove} />
            </div>
          </div>
          <p className="mt-6 text-xl md:text-2xl font-bold text-center">{getGameStatus()}</p>
          <div className="mt-6 flex justify-center">
            <Button onClick={resetGame} size="lg" className="text-lg px-6 py-3">
              Reset Game
            </Button>
          </div>
          <div className="mt-6 flex items-center justify-center space-x-2">
            <SunIcon className="h-6 w-6" />
            <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} id="dark-mode" />
            <MoonIcon className="h-6 w-6" />
            <Label htmlFor="dark-mode" className="ml-2 text-lg">
              Dark Mode
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}