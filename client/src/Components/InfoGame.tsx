import { FC, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { Player } from '../models/Player'
import whitePlayerIcon from '../Icons/White_King.svg'
import blackPlayerIcon from '../Icons/Black_King.svg'

interface IInfoGameProps {
  time: number
  player: Player | null
  handler: () => void
}

const InfoGame: FC<IInfoGameProps> = ({ player, time, handler }) => {
  const [blackTime, setBlackTime] = useState(time)
  const [whiteTime, setWhiteTime] = useState(time)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = () => {
    if (timer.current) clearInterval(timer.current)

    timer.current = setInterval(decrementTimer, 1000)
  }

  const decrementTimer = () => {
    if (player?.color === 'white') setWhiteTime((prev) => (prev > 0 ? prev - 1 : 0))
    else setBlackTime((prev) => (prev > 0 ? prev - 1 : 0))
  }

  useEffect(() => {
    if (player) startTimer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player])

  useEffect(() => {
    if (whiteTime <= 0 && timer.current) {
      alert('Black is win!!')
      clearInterval(timer.current)
    }

    if (blackTime <= 0 && timer.current) {
      alert('White is win!!')
      clearInterval(timer.current)
    }
  }, [whiteTime, blackTime])

  const restart = () => {
    setWhiteTime(time)
    setBlackTime(time)
    handler()
  }

  return (
    <div className="info">
      <PlayerInfo color="black" isActive={player?.color === 'black'} time={blackTime} />

      <div>
        <button className="button" onClick={restart}>
          Restart
        </button>
      </div>

      <PlayerInfo color="white" isActive={player?.color === 'white'} time={whiteTime} />
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
