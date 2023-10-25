import React, { FC, useState } from 'react'
import CellComponent from './CellComponent'
import BoardHeader from './BoardHeader'
import { Board } from '../models/Board'
import { Cell } from '../models/Cell'
import { PlayerColorType } from '../types/color'

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
  const [selected, setSelected] = useState<Cell | null>(null)

  const handlerSelect = (cell: Cell) => {
    if (board && cell.figure?.color === currentPlayerColor) setSelected(cell)
  }

  const handlerMove = (cell: Cell) => {
    if (board && selected?.moveFigure(cell)) {
      moveHandler(selected, cell)
      setSelected(null)
      setBoard(board.copyBoard())
    }
  }

  const handlerClick = (cell: Cell) => {
    console.log(meColor, currentPlayerColor, cell.figure)
    if (meColor === currentPlayerColor) {
      if (!selected || (selected && cell.figure?.color === currentPlayerColor))
        handlerSelect(cell)
      else handlerMove(cell)
    }
  }

  return (
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
  )
}

export default BoardComponent
