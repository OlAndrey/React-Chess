/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BoardComponent from './BoardComponent'
import InfoGame from './InfoGame'
import Modal from './Modal'
import { Board } from '../models/Board'
import { Player } from '../models/Player'

function Game() {
  const navigate = useNavigate()
  const isFirstMove = useRef(true)
  const [message, setMessage] = useState('Loading')
  const [board, setBoard] = useState<Board | null>(null)
  const [whitePlayer] = useState<Player>(new Player('white'))
  const [blackPlayer] = useState<Player>(new Player('black'))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

  const restart = () => {
    setMessage('')
    setCurrentPlayer(whitePlayer)
    isFirstMove.current = true
    const newBoard = new Board()
    newBoard.fill()
    newBoard.getFigures()
    setBoard(newBoard)
  }

  const changePlayer = () => {
    const player = currentPlayer === whitePlayer ? blackPlayer : whitePlayer
    setCurrentPlayer(player)
  }

  useEffect(() => {
    restart()
  }, [])

  useEffect(() => {
    if (currentPlayer?.color && !isFirstMove.current) {
      const messageStr = board?.checkMate(currentPlayer.color)
      if (messageStr) setMessage(messageStr)
    }
  }, [board])

  useEffect(() => {
    if (board && currentPlayer?.color) {
      if (isFirstMove.current) isFirstMove.current = false
      board.calculateAllMoves(currentPlayer.color)
      setBoard(board.copyBoard())
    }
  }, [currentPlayer])

  return (
    <div>
      {board ? (
        <div className="app">
          <InfoGame player={currentPlayer} handler={restart} setMessage={setMessage} time={300} />
          <BoardComponent
            board={board}
            setBoard={setBoard}
            currentPlayer={currentPlayer}
            changePlayer={changePlayer}
          />
          {message && (
            <Modal isShow={true}>
              <h1 className="text-center">{message}</h1>
              <button className="btn bg-black" onClick={() => navigate('/', { replace: true })}>
                Go Home
              </button>
            </Modal>
          )}
        </div>
      ) : (
        <div className="bg-image">
          <div className="message-box">{message}</div>
        </div>
      )}
    </div>
  )
}

export default Game
