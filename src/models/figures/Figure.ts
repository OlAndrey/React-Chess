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

  constructor(cell: Cell, color: 'white' | 'black') {
    this.name = FigureNames.FIGURE
    this.isFirstStep = true
    this.cell = cell
    this.cell.figure = this
    this.logo = null
    this.color = color
  }

  canMove(target: Cell): boolean {
    if (target.figure?.color === this.color) return false
    if (target.figure?.name === FigureNames.KING) return false

    return true
  }
}
