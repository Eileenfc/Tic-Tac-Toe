import type React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface ScoreBoardProps {
  scores: {
    wins: number
    losses: number
    draws: number
  }
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores }) => {
  return (
    <Card className="mb-6 md:mb-10 w-full max-w-md mx-auto">
      <CardContent className="flex justify-around p-4">
        <div className="text-center">
          <p className="font-bold text-green-500 text-lg md:text-xl">Wins</p>
          <p className="text-2xl md:text-3xl">{scores.wins}</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-red-500 text-lg md:text-xl">Losses</p>
          <p className="text-2xl md:text-3xl">{scores.losses}</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-yellow-500 text-lg md:text-xl">Draws</p>
          <p className="text-2xl md:text-3xl">{scores.draws}</p>
        </div>
      </CardContent>
    </Card>
  )
}