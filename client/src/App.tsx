import { Routes, Route, Navigate } from 'react-router-dom'
import PlayerWaiting from './Components/PlayerWaiting'
import ConnectGame from './Components/ConnectGame'
import GameContainer from './Components/GameContainer'

const App = () => {
  return (
    <Routes>
      <Route path="/game/:id" Component={GameContainer} />
      <Route path="/:token" Component={PlayerWaiting} />
      <Route path="/" Component={ConnectGame} />
      <Route path="/*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  )
}

export default App
