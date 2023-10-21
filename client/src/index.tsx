import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './styles/index.css'
import reportWebVitals from './reportWebVitals'
import App from './App'
import Game from './Components/Game'
import PlayerWaiting from './Components/PlayerWaiting'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/game/:token" Component={Game} />
        <Route path="/:token" Component={PlayerWaiting} />
        <Route path="/" Component={App} />
        <Route path="/*" element={<Navigate to='/' replace={true} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
