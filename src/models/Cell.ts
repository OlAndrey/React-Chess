import { Board } from './Board'
import { Figure } from './figures/Figure'

export class Cell {
  board: Board
  id: number
  readonly x: number
  readonly y: number
  readonly color: 'white' | 'black'
  figure: Figure | null
  available: boolean

  constructor(board: Board, x: number, y: number, color: 'white' | 'black') {
    this.board = board
    this.x = x
    this.y = y
    this.color = color
    this.figure = null
    this.available = false
    this.id = Math.random()
  }

  setFigure(figure: Figure) {
    this.figure = figure
    this.figure.cell = this
  }

  moveFigure(target: Cell) {
    if (this.figure && this.figure.canMove(target)) {
      target.setFigure(this.figure)
      this.figure = null
    }
  }
}
