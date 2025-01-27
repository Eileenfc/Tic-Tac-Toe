import type React from "react"
import { Cell } from "./Cell"
import type { Board as BoardType } from "../utils/gameLogic"

interface BoardProps {
  board: BoardType
  winningLine: number[] | null
  onCellClick: (index: number) => void
}

export const Board: React.FC<BoardProps> = ({ board, winningLine, onCellClick }) => {
  return (
    <div className="grid grid-cols-3 gap-2 max-w-[300px] md:max-w-[480px] mx-auto">
      {board.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          onClick={() => onCellClick(index)}
          isWinningCell={winningLine?.includes(index) || false}
        />
      ))}
    </div>
  )
}