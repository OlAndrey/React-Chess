import { Cell } from './Cell'

export class Board {
  cells: Array<Cell[]>

  constructor() {
    this.cells = []
  }

  copyBoard() {
    const newBoard = new Board()
    newBoard.cells = this.cells
    return newBoard
  }

  fill() {
    for (let i = 0; i < 8; i++) {
      const row = []
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 === 0) row.push(new Cell(this, i, j, 'white'))
        else row.push(new Cell(this, i, j, 'black'))
      }
      this.cells.push(row)
    }
    return this
  }
}
