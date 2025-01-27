import type React from "react"
import type { Difficulty } from "../hooks/useGameState"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface DifficultySelectorProps {
  difficulty: Difficulty
  onChangeDifficulty: (difficulty: Difficulty) => void
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({ difficulty, onChangeDifficulty }) => {
  return (
    <div className="mb-6 md:mb-10 flex items-center space-x-4 justify-center">
      <Label htmlFor="difficulty" className="text-lg">
        Difficulty:
      </Label>
      <Select value={difficulty} onValueChange={(value) => onChangeDifficulty(value as Difficulty)}>
        <SelectTrigger id="difficulty" className="w-[180px]">
          <SelectValue placeholder="Select difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="easy">Easy</SelectItem>
          <SelectItem value="hard">Hard</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}