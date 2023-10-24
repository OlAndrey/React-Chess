import React, { FC, useState } from 'react'
import CellComponent from './CellComponent'
import BoardHeader from './BoardHeader'
import { Board } from '../models/Board'
import { Cell } from '../models/Cell'
import { Player } from '../models/Player'

interface IBoardComponent {
  board: Board
  setBoard: (board: Board) => void
  currentPlayer: Player | null
  moveHandler: (select: Cell, target: Cell) => void
}

const BoardComponent: FC<IBoardComponent> = ({ board, setBoard, currentPlayer, moveHandler }) => {
  const [selected, setSelected] = useState<Cell | null>(null)

  const handlerSelect = (cell: Cell) => {
    if (board && cell.figure?.color === currentPlayer?.color) setSelected(cell)
  }

  const handlerMove = (cell: Cell) => {
    if (board && selected?.moveFigure(cell)) {
      moveHandler(selected, cell)
      setSelected(null)
      setBoard(board.copyBoard())
    }
  }

  const handlerClick = (cell: Cell) => {
    if (!selected || (selected && cell.figure?.color === currentPlayer?.color)) handlerSelect(cell)
    else handlerMove(cell)
  }

  return (
    <div className="board">
      <BoardHeader>
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
