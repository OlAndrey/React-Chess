import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Modal from './Modal'
import socket from '../helpers/socket'

const PlayerWaiting = () => {
  const [showModal] = useState(true)
  const { token } = useParams()
  const navigate = useNavigate()
  const inputValues: string[] = [window.location.origin + '/game/' + token, token || 'null']

    useEffect(() => {
      if (token) socket.emit('check-token', { token })
      socket.on('token-invalid', () => navigate('/'))
      socket.on('ready', () => {
        if (token) navigate('game/' + token, { replace: true })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])

  return (
    <Modal className={showModal ? 'bg-image' : ''} isShow={showModal}>
      <div className="text-lg">Challenge to a game</div>
      <div className="my-4">
        <span className="text-sm">To invite someone to play, give this URL:</span>
        <CopyField value={inputValues[0]} />
      </div>
      <div className="text-sm">Or enter this token on the main page:</div>
      <CopyField value={inputValues[1]} />
      <div className="text-sm">The first person to come to this URL will play with you.</div>

      <button className="btn w-1/2 bg-black" onClick={() => navigate('/')}>
        Cancel
      </button>
    </Modal>
  )
}

const CopyField = ({ value }: { value: string }) => {
  const [isClicked, setIsClicked] = useState(false)

  const handlerClick = () => {
    setIsClicked(true)
    navigator.clipboard.writeText(value)
  }

  return (
    <div className="flex ">
      <input type="text" style={{ flexGrow: 1 }} value={value} readOnly />
      <button className={`btn ${isClicked? 'bg-green' :'bg-blue'} p-2`} onClick={handlerClick}>
        {isClicked ? checkSvg : copySvg}
      </button>
    </div>
  )
}

const copySvg = (
  <svg
    width="1.5em"
    height="1.5em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z"
      stroke="#ffffff"
      strokeWidth="1.5"
    />
    <path
      d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5"
      stroke="#ffffff"
      strokeWidth="1.5"
    />
  </svg>
)

const checkSvg = (
  <svg
    fill="#ffffff"
    width="1.5em"
    height="1.5em"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 Z M12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 Z M15.2928932,8.29289322 L10,13.5857864 L8.70710678,12.2928932 C8.31658249,11.9023689 7.68341751,11.9023689 7.29289322,12.2928932 C6.90236893,12.6834175 6.90236893,13.3165825 7.29289322,13.7071068 L9.29289322,15.7071068 C9.68341751,16.0976311 10.3165825,16.0976311 10.7071068,15.7071068 L16.7071068,9.70710678 C17.0976311,9.31658249 17.0976311,8.68341751 16.7071068,8.29289322 C16.3165825,7.90236893 15.6834175,7.90236893 15.2928932,8.29289322 Z"
    />
  </svg>
)

export default PlayerWaiting
