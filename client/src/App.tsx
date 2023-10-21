import { Routes, Route, Navigate } from 'react-router-dom'
import Game from './Components/Game'
import PlayerWaiting from './Components/PlayerWaiting'
import ConnectGame from './Components/ConnectGame'

const App = () => {
  return (
    <Routes>
      <Route path="/game/:token" Component={Game} />
      <Route path="/:token" Component={PlayerWaiting} />
      <Route path="/" Component={ConnectGame} />
      <Route path="/*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  )
}

export default App
