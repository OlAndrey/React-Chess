import React, { FC, useState } from 'react'
import CellComponent from './CellComponent'
import BoardHeader from './BoardHeader'
import { Board } from '../models/Board'
import { Cell } from '../models/Cell'

interface IBoardComponent {
  board: Board | null
  setBoard: (board: Board) => void
}

const BoardComponent: FC<IBoardComponent> = ({ board, setBoard }) => {
  const [selected, setSelected] = useState<Cell | null>(null)

  const handlerSelect = (cell: Cell) => {
    if (board) {
      setSelected(cell)
      board.highlightCells(cell)
      setBoard(board.copyBoard())
    }
  }

  const handlerMove = (cell: Cell) => {
    if (board) {
      selected?.moveFigure(cell)
      setSelected(null)
      board.highlightCells(null)
      setBoard(board.copyBoard())
    }
  }

  const handlerClick = (cell: Cell) => {
    if (!selected && cell.figure) handlerSelect(cell)
    else handlerMove(cell)
  }

  return (
    <div>
      {board ? (
        <div className="board">
          <BoardHeader>
            {board.cells.map((row, index) => (
              <React.Fragment key={index}>
                {row.map((cell) => (
                  <CellComponent
                    key={cell.id}
                    selected={selected}
                    click={handlerClick}
                    cell={cell}
                  />
                ))}
              </React.Fragment>
            ))}
          </BoardHeader>
        </div>
      ) : (
        'Loading board...'
      )}
    </div>
  )
}

export default BoardComponent
