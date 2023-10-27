import { FC, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import whitePlayerIcon from '../Icons/White_King.svg'
import blackPlayerIcon from '../Icons/Black_King.svg'
import { PlayerColorType } from '../types/color'
import socket from '../helpers/socket'

interface IInfoGameProps {
  time: number
  playerColor: PlayerColorType | null
  setMessage: (message: string) => void
  isReverse: boolean
}

const InfoGame: FC<IInfoGameProps> = ({ playerColor, time, isReverse, setMessage }) => {
  const isJoinGame = useRef(false)
  const [blackTime, setBlackTime] = useState(time)
  const [whiteTime, setWhiteTime] = useState(time)

  useEffect(() => {
    if (!isJoinGame.current) {
      socket.on('countdown-gameover', (data: any) =>
        setMessage(`${data.color === 'white' ? 'Black' : 'White'} is win!!`)
      )
      socket.on('countdown', (data: any) => {
        if (data.color === 'white') setWhiteTime(data.time)
        else setBlackTime(data.time)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={classNames('info', {
        reverse: isReverse
      })}
    >
      <PlayerInfo color="black" isActive={playerColor === 'black'} time={blackTime} />
      <PlayerInfo color="white" isActive={playerColor === 'white'} time={whiteTime} />
    </div>
  )
}

const PlayerInfo = ({
  color,
  isActive,
  time
}: {
  color: string
  isActive: boolean
  time: number
}) => {
  const formatingTime = (duration: number) => {
    if (duration === 0) return '--:--'
    let ret = ''
    const mins = ~~(duration / 60)
    const secs = ~~duration % 60

    ret += '' + mins + ':' + (secs < 10 ? '0' : '')
    ret += '' + secs

    return ret
  }

  return (
    <div
      className={classNames('player', {
        'player-active': isActive
      })}
    >
      <img src={color === 'white' ? whitePlayerIcon : blackPlayerIcon} alt={color + ' player'} />
      {color === 'white' ? 'White' : 'Black'} - {formatingTime(time)}
    </div>
  )
}

export default InfoGame
