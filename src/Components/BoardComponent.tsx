import React, { useEffect, useState } from 'react'
import CellComponent from './CellComponent'
import BoardHeader from './BoardHeader'

interface ICell {
  id: number
  x: number
  y: number
  figure: string | null
  color: 'white' | 'black'
}

interface IBoard {
  cells: Array<ICell[]>
}

const BoardComponent = () => {
  const [board, setBoard] = useState<IBoard | null>(null)

  const fillBoard = () => {
    const board: IBoard = { cells: [] }
    for (let x = 0; x < 8; x++) {
      const row = []
      for (let y = 0; y < 8; y++) {
        const cell: ICell = {
          id: Math.random(),
          x,
          y,
          figure: null,
          color: 'white'
        }
        if ((x + y) % 2 === 0) cell.color = 'white'
        else cell.color = 'black'
        row.push(cell)
      }
      board.cells.push(row)
    }

    return board
  }

  useEffect(() => {
    if (!board) setBoard(fillBoard())
  }, [])

  return (
    <div>
      {board ? (
        <div className="board">
            <BoardHeader >
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
