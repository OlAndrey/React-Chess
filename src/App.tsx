import { useEffect, useState } from 'react';
import { Board } from './models/Board';
import BoardComponent from './Components/BoardComponent';

function App() {
  const [board, setBoard] = useState<Board | null>(null)

  const restart = () => {
    const newBoard = new Board()
    newBoard.fill()
    newBoard.getFigures()
    return newBoard
  }

  useEffect(() => {
    setBoard(restart())
  }, [])

  return (
    <BoardComponent board={board} />
  );
}

export default App;