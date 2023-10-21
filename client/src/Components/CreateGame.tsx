import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import socket from '../helpers/socket'

const CreateGame = ({ handler }: { handler: (a: boolean) => void }) => {
  const token = useRef<string | null>(null)
  const navigate = useNavigate()
  const data = [
    { time: '5', name: 'Blitz' },
    { time: '10', name: 'Rapid' },
    { time: '30', name: 'Classical' },
    { time: '-', name: 'Unlimit' }
  ]

  const createGame = (option: (typeof data)[0]) => {
    socket.emit('create-game', { time: option.time })
    socket.on('ready', () => {
      if (token.current) navigate(token.current, { replace: true })
    })
  }

  return (
    <>
      <div className="flex">
        <span className="text-lg">Please select game type!</span>
        <button className="btn-close" onClick={() => handler(false)}>
          &times;
        </button>
      </div>

      <div className="lpoll">
        {data.map((item) => (
          <div key={Math.random()} onClick={() => createGame(item)}>
            <div className="clock">{item.time} min</div>
            <div className="perf">{item.name}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default CreateGame
