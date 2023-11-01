import React, { FC, useEffect, useRef, useState } from 'react'
import CellComponent from './CellComponent'
import BoardHeader from './BoardHeader'
import { Board } from '../models/Board'
import { Cell } from '../models/Cell'
import { PlayerColorType } from '../types/game'
import Modal from './Modal'
import Promotion from './Promotion'
import { FigureNames } from '../models/figures/Figure'

interface IBoardComponent {
  board: Board
  setBoard: (board: Board) => void
  meColor: 'white' | 'black' | null
  currentPlayerColor: PlayerColorType | null
  moveHandler: (cell: Cell, target: Cell) => void
}

const BoardComponent: FC<IBoardComponent> = ({
  board,
  setBoard,
  moveHandler,
  meColor,
  currentPlayerColor
}) => {
  const target = useRef<Cell | null>(null)
  const [isPromotion, setIsPromotion] = useState(false)
  const [selected, setSelected] = useState<Cell | null>(null)

  const handlerSelect = (cell: Cell) => {
    if (board && cell.figure?.color === currentPlayerColor) setSelected(cell)
  }

  const move = () => {
    if (selected && target.current) {
      moveHandler(selected, target.current)
      setSelected(null)
      target.current = null
      setBoard(board.copyBoard())
    }
  }

  const handlerMove = (cell: Cell) => {
    if (board && selected?.moveFigure(cell)) {
      target.current = cell
      if (cell.x === 0 || cell.x === 7) setIsPromotion(true) 
      else move()
    }
  }

  const handlerClick = (cell: Cell) => {
    if (meColor === currentPlayerColor) {
      if (!selected || (selected && cell.figure?.color === currentPlayerColor)) handlerSelect(cell)
      else handlerMove(cell)
    }
  }

  useEffect(() => {
    if (!isPromotion && selected && target.current) move()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPromotion])

  const promotionHandler = (figure: FigureNames) => {
    if (meColor && target.current) {
      target.current.promotionFigure(figure, meColor)
      setIsPromotion(false)
    }
  }

  return (
    <>
      <div className="board">
        <BoardHeader isReverse={meColor === 'black'}>
          {board.cells.map((row, index) => (
            <React.Fragment key={index}>
              {row.map((cell) => (
                <CellComponent key={cell.id} selected={selected} click={handlerClick} cell={cell} />
              ))}
            </React.Fragment>
          ))}
        </BoardHeader>
      </div>
      <Modal isShow={isPromotion}>
        <h2 className='text-center'>Turn a pawn into a ...?</h2>
        <Promotion handler={promotionHandler} />
      </Modal>
    </>
  )
}

export default BoardComponent
