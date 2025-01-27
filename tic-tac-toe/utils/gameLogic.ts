export type CellValue = "X" | "O" | null
export type Board = CellValue[]

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export const checkWinner = (board: Board): { winner: CellValue; line: number[] | null } => {
  for (const [a, b, c] of winningCombinations) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] }
    }
  }
  return { winner: null, line: null }
}

export const isBoardFull = (board: Board): boolean => {
  return board.every((cell) => cell !== null)
}

export const getEmptyCells = (board: Board): number[] => {
  return board.reduce<number[]>((acc, cell, index) => {
    if (cell === null) acc.push(index)
    return acc
  }, [])
}

export const minimax = (board: Board, depth: number, isMaximizing: boolean): number => {
  const { winner } = checkWinner(board)
  if (winner === "O") return 10 - depth
  if (winner === "X") return depth - 10
  if (isBoardFull(board)) return 0

  const emptyCells = getEmptyCells(board)

  if (isMaximizing) {
    let bestScore = Number.NEGATIVE_INFINITY
    for (const cell of emptyCells) {
      board[cell] = "O"
      const score = minimax(board, depth + 1, false)
      board[cell] = null
      bestScore = Math.max(score, bestScore)
    }
    return bestScore
  } else {
    let bestScore = Number.POSITIVE_INFINITY
    for (const cell of emptyCells) {
      board[cell] = "X"
      const score = minimax(board, depth + 1, true)
      board[cell] = null
      bestScore = Math.min(score, bestScore)
    }
    return bestScore
  }
}

export const getBestMove = (board: Board): number => {
  let bestScore = Number.NEGATIVE_INFINITY
  let bestMove = -1
  const emptyCells = getEmptyCells(board)

  for (const cell of emptyCells) {
    board[cell] = "O"
    const score = minimax(board, 0, false)
    board[cell] = null
    if (score > bestScore) {
      bestScore = score
      bestMove = cell
    }
  }

  return bestMove
}

export const getRandomMove = (board: Board): number => {
  const emptyCells = getEmptyCells(board)
  return emptyCells[Math.floor(Math.random() * emptyCells.length)]
}

