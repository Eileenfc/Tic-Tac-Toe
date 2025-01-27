import { TicTacToe } from "../components/TicTacToe"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <TicTacToe />
    </main>
  )
}