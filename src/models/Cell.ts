import { Board } from './Board'
import { Figure, FigureNames } from './figures/Figure'

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

  emptyVertical(target: Cell): boolean {
    if (target.x !== this.x) return false

    const min = Math.min(this.y, target.y)
    const max = Math.max(this.y, target.y)

    for (let i = min + 1; i < max; i++) {
      if (this.board.getCell(this.x, i).figure) return false
    }

    return true
  }

  emptyHorizontal(target: Cell): boolean {
    if (target.y !== this.y) return false

    const min = Math.min(this.x, target.x)
    const max = Math.max(this.x, target.x)

    for (let i = min + 1; i < max; i++) {
      if (this.board.getCell(i, this.y).figure) return false
    }

    return true
  }

  emptyDiagonal(target: Cell): boolean {
    const absX = Math.abs(target.x - this.x)
    const absY = Math.abs(target.y - this.y)

    if (absX !== absY) return false

    const dx = this.x < target.x ? 1 : -1
    const dy = this.y < target.y ? 1 : -1

    for (let i = 1; i < absY; i++) {
      if (this.board.getCell(this.x + dx * i, this.y + dy * i).figure) return false
    }

    return true
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
