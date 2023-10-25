/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import BoardComponent from './BoardComponent'
import InfoGame from './InfoGame'
import Modal from './Modal'
import { Board } from '../models/Board'
import { Cell } from '../models/Cell'
import socket from '../helpers/socket'
import { PlayerColorType } from '../types/color'

function Game() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isFirstMove = useRef(true)
  const isJoinGame = useRef(false)
  const [message, setMessage] = useState('Loading...')
  const [board, setBoard] = useState<Board | null>(null)
  const [meColor, setMeColor] = useState<PlayerColorType | null>(null)
  const [currentPlayerColor, setCurrentPlayerColor] = useState<PlayerColorType | null>(null)

  const restart = () => {
    isFirstMove.current = true
    const newBoard = new Board()
    newBoard.fill()
    newBoard.getFigures()
    setBoard(newBoard)
  }

  const changePlayer = () => {
    const color = currentPlayerColor !== 'white' ? 'white' : 'black'
    setCurrentPlayerColor(color)
  }

  const handlerMove = (cell: Cell, target: Cell) => {
    const move = {
      from: [cell.x, cell.y].join(''),
      to: [target.x, target.y].join('')
    }
    socket.emit('new-move', { move, token: id })
    changePlayer()
  }

  const move = (to: { from: string; to: string }) => {
    if (board?.moveFigure(to)) changePlayer()
  }

  useEffect(() => {
    if (id && !isJoinGame.current) {
      isJoinGame.current = true
      socket.emit('join', { token: id })
      socket.on('room-full', () => setMessage('Room is full!'))
      socket.on('token-invalid', () => setMessage('Invalid token!'))
      socket.on('joined', (data: any) => {
        restart()
        setMessage('')
        setMeColor(data.color)
        setCurrentPlayerColor('white')
      })
    }
  }, [id])

  useEffect(() => {
    if (currentPlayerColor && !isFirstMove.current) {
      const messageStr = board?.checkMate(currentPlayerColor)
      if (messageStr) setMessage(messageStr)
    }
  }, [board])

  useEffect(() => {
    socket.off('move')
    socket.on('move', move)
    if (board && currentPlayerColor) {
      if (isFirstMove.current) isFirstMove.current = false
      board.calculateAllMoves(currentPlayerColor)
      setBoard(board.copyBoard())
    }
  }, [currentPlayerColor])

  return (
    <div>
      {board ? (
        <div className="app">
          <InfoGame
            playerColor={currentPlayerColor}
            handler={restart}
            isReverse={meColor === 'black'}
            setMessage={setMessage}
            time={300}
          />
          <BoardComponent
            board={board}
            setBoard={setBoard}
            meColor={meColor}
            currentPlayerColor={currentPlayerColor}
            moveHandler={handlerMove}
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
