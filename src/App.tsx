import { useEffect, useState } from 'react'
import BoardComponent from './Components/BoardComponent'
import { Board } from './models/Board'
import { Player } from './models/Player'

function App() {
  const [board, setBoard] = useState<Board | null>(null)
  const [whitePlayer, setWhitePlayer] = useState<Player>(new Player('white'))
  const [blackPlayer, setBlackPlayer] = useState<Player>(new Player('black'))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

  const restart = () => {
    const newWhitePlayer = new Player('white')
    setCurrentPlayer(newWhitePlayer)
    setWhitePlayer(newWhitePlayer)
    setBlackPlayer(new Player('black'))
    const newBoard = new Board()
    newBoard.fill()
    newBoard.getFigures()
    return newBoard
  }

  const changePlayer = () => {
    const player = currentPlayer === whitePlayer ? blackPlayer : whitePlayer
    setCurrentPlayer(player)
  }

  useEffect(() => {
    setBoard(restart())
  }, [])

  useEffect(() => {
    if (board && currentPlayer?.color) {
      board.checkCapture(currentPlayer.color)
      setBoard(board.copyBoard())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayer])

  return (
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        changePlayer={changePlayer}
      />
  )
}

export default App
