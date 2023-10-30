import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import socket from '../helpers/socket'
import { GameDataType } from '../types/game'
import Game from './Game'



const GameContainer = () => {
  const { id } = useParams()
  const isJoinGame = useRef(false)
  const [gameData, setGameData] = useState<GameDataType | null>(null)
  const [message, setMessage] = useState('Loading...')

  useEffect(() => {
    if (id && !isJoinGame.current) {
      isJoinGame.current = true
      socket.emit('join', { token: id })
      socket.on('room-full', () => setMessage('Room is full!'))
      socket.on('token-invalid', () => setMessage('Invalid token!'))
      socket.on('joined', (data: any) => {
        setGameData({
          token: id,
          color: data.color,
          time: data.time
        })
      })
      socket.on('rematch-offered', () => setMessage('Opponent offers to restart the game..'))
      socket.on('rematch-declined', () => setMessage(''))
      socket.on('rematch-accepted', () => {
        setGameData((prev) => {
          if (!prev) return prev
          return { ...prev, color: prev.color === 'white' ? 'black' : 'white' }
        })
      })
      socket.on('opponent-disconnected', () => setMessage('Opponent disconnected from the game'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
  <Game gameData={gameData} message={message} setMessage={setMessage} />
  )
}

export default GameContainer
