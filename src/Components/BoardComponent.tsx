import React from 'react'
import CellComponent from './CellComponent'
import BoardHeader from './BoardHeader'
import { Board } from '../models/Board'

const BoardComponent = ({ board }: { board: Board | null }) => {
  return (
    <div>
      {board ? (
        <div className="board">
          <BoardHeader>
            {board.cells.map((row, index) => (
              <React.Fragment key={index}>
                {row.map((cell) => (
                  <CellComponent key={cell.id} {...cell} />
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
