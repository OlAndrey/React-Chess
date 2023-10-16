/* eslint-disable react-hooks/exhaustive-deps */
import { MutableRefObject, useRef, useState } from 'react'
import Modal from './Components/Modal'

function App() {
  const [showModal] = useState(true)
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>

  return (
    <Modal className={showModal ? 'bg-image' : ''} isShow={showModal}>
      <input type="text" ref={inputRef} placeholder="Enter game id" />
      <button className="btn" onClick={() => console.log('clicked!')}>
        Connect
      </button>
    </Modal>
  )
}

export default App
