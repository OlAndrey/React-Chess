/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BoardComponent from './BoardComponent'
import InfoGame from './InfoGame'
import Modal from './Modal'
import { Board } from '../models/Board'
import { Cell } from '../models/Cell'
import socket from '../helpers/socket'
import { GameDataType, PlayerColorType } from '../types/game'
import { FigureNames } from '../models/figures/Figure'

interface GamePropsType {
  message: string
  setMessage: (message: string) => void
  gameData: GameDataType | null
}

const Game: FC<GamePropsType> = ({ gameData, message, setMessage }) => {
  const navigate = useNavigate()
  const isFirstMove = useRef(true)
  const isGameOn = useRef(false)
  const time = useRef(0)
  const [board, setBoard] = useState<Board | null>(null)
  const [meColor, setMeColor] = useState<PlayerColorType | null>(null)
  const [currentPlayerColor, setCurrentPlayerColor] = useState<PlayerColorType | null>(null)

  const restart = () => {
    setMessage("Waiting for your opponent's answer")
    isGameOn.current = false
    socket.emit('clock-pause', { token: gameData?.token })
    socket.emit('rematch-offer', { token: gameData?.token })
  }

  const start = () => {
    isFirstMove.current = true
    const newBoard = new Board()
    newBoard.fill()
    newBoard.getFigures()
    newBoard.calculateAllMoves('white')
    setCurrentPlayerColor('white')
    setBoard(newBoard)
  }

  const runClock = (color: PlayerColorType) => ({ token: gameData?.token, color })

  const changePlayer = () => {
    const color = currentPlayerColor !== 'white' ? 'white' : 'black'
    socket.emit('clock-run', runClock(color))
    setCurrentPlayerColor(color)
  }

  const handlerMove = (cell: Cell, target: Cell) => {
    const move = {
      from: [cell.x, cell.y].join(''),
      to: [target.x, target.y].join(''),
      figureName: target.figure?.name
    }
    socket.emit('new-move', { move, token: gameData?.token })
    changePlayer()
  }

  const move = (to: { from: string; to: string; figureName: FigureNames }) => {
    if (board?.moveFigure(to)) changePlayer()
  }

  const gameOver = (message: string) => {
    setMessage(message)
    isGameOn.current = false
  }

  useEffect(() => {
    if (gameData) {
      start()
      setMessage('')
      setMeColor(gameData.color)
      isGameOn.current = true
      time.current = gameData.time ? gameData.time : 0
      if (gameData.color === 'white' && gameData.time) socket.emit('clock-run', runClock('white'))
    }
  }, [gameData])

  useEffect(() => {
    if (currentPlayerColor && !isFirstMove.current) {
      const messageStr = board?.checkMate(currentPlayerColor)
      if (messageStr) gameOver(messageStr)
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
            isReverse={meColor === 'black'}
            setMessage={gameOver}
            handler={restart}
            time={time.current}
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
              {!isGameOn.current ? (
                <button className="btn bg-black" onClick={() => navigate('/', { replace: true })}>
                  Go Home
                </button>
              ) : (
                <div className="flex">
                  <button
                    className="btn bg-green"
                    onClick={() => socket.emit('rematch-accept', { token: gameData?.token })}
                  >
                    Yes
                  </button>
                  <button
                    className="btn bg-black"
                    onClick={() => {
                      socket.emit('clock-run', runClock(currentPlayerColor || 'white'))
                      socket.emit('rematch-decline', { token: gameData?.token })
                      setMessage('')
                    }}
                  >
                    No
                  </button>
                </div>
              )}
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
