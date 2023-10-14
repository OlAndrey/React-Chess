import { Cell } from '../Cell'
import logoImg from '../../Icons/Black_King.svg'

export enum FigureNames {
  FIGURE = 'Figure',
  KING = 'King',
  QUEEN = 'Queen',
  BISHOP = 'Bishop',
  KNIGHT = 'Knight',
  ROOK = 'Rook',
  PAWN = 'Pawn'
}

export class Figure {
  name: FigureNames
  isFirstStep: boolean
  cell: Cell
  logo: typeof logoImg | null
  color: 'white' | 'black'
  possibleMoves: Cell[]

  constructor(cell: Cell, color: 'white' | 'black') {
    this.name = FigureNames.FIGURE
    this.isFirstStep = true
    this.cell = cell
    this.cell.figure = this
    this.logo = null
    this.color = color
    this.possibleMoves = []
  }

  calculateMoves() {
    const board = this.cell.board
    for (let x = 0; x < board.cells.length; x++) {
      for (let y = 0; y < board.cells[x].length; y++) {
        const cell = board.cells[x][y]
        if (!!this.canMove(cell) && !!this.isKingSave(cell)) this.possibleMoves?.push(cell)
      }
    }
  }

  canMove(target: Cell): boolean {
    if (target.figure?.color === this.color) return false

    return true
  }

  isKingSave(target: Cell): boolean {
    if (this.cell === target) return false
    if (this.name === FigureNames.KING) {
      const targetFigure = target.figure
      target.figure = null
      const cellCapture = target.cellCapture(this.color)
      target.figure = targetFigure
      return !cellCapture
    }

    const { x, y } = this.cell
    const targetFigure = target.figure
    target.figure = this
    target.figure.cell = this.cell.board.getCell(x, y)
    this.cell.figure = null
    const flag = !this.cell.board.canCaptureKing(this.color)
    if (target.figure) {
      this.cell.figure = target.figure
      this.cell.figure.cell = this.cell
      target.figure = targetFigure
    }

    return flag
  }
}
