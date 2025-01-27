import type React from "react"
import type { CellValue } from "../utils/gameLogic"
import { Button } from "@/components/ui/button"

interface CellProps {
  value: CellValue
  onClick: () => void
  isWinningCell: boolean
}

export const Cell: React.FC<CellProps> = ({ value, onClick, isWinningCell }) => {
  return (
    <Button
      variant="outline"
      size="lg"
      className={`w-20 h-20 md:w-32 md:h-32 text-4xl md:text-6xl font-bold flex items-center justify-center transition-all duration-300 ${
        isWinningCell ? "bg-green-200 dark:bg-green-700 border-green-500" : ""
      } ${value === "X" ? "text-blue-500" : "text-red-500"}`}
      onClick={onClick}
      disabled={!!value}
    >
      {value}
    </Button>
  )
}