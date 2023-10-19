import { MutableRefObject, useRef, useState } from 'react'
import Modal from './Components/Modal'
import socket from './helpers/socket'

const App = () => {
  const [showModal] = useState(true)
  const [isNewGame, setIsNewGame] = useState(false)
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>

  const data = [
    { time: '5', name: 'Blitz' },
    { time: '10', name: 'Rapid' },
    { time: '30', name: 'Classical' },
    { time: '-', name: 'Unlimit' }
  ]

  const connect = () => {
    if (inputRef.current.value.trim()) {
      socket.emit('check-token', { token: inputRef.current.value })
      socket.on('full', () => console.error('room is full'))
      socket.on('token-invalid', () => console.error('invalid'))
      socket.on('token-ok', () => console.log('token is ok'))
    }
  }

  const createGame = (option: (typeof data)[0]) => {
    socket.emit('create-game', { time: option.time })
    console.log(option)
  }

  return (
    <Modal className={showModal ? 'bg-image' : ''} isShow={showModal}>
      {!isNewGame ? (
        <>
          <input type="text" ref={inputRef} placeholder="Enter game id" />
          <button className="btn bg-black" onClick={connect}>
            Connect
          </button>
          <div className="text-center">or</div>
          <button className="btn bg-green" onClick={() => setIsNewGame(true)}>
            Create
          </button>
        </>
      ) : (
        <>
          <div className="flex">
            <span className="text-lg">Please select game type!</span>
            <button className="btn-close" onClick={() => setIsNewGame(false)}>
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
      )}
    </Modal>
  )
}

export default App
