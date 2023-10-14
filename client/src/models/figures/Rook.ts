import { Cell } from '../Cell'
import { Figure, FigureNames } from './Figure'
import blackFigure from '../../Icons/Black_Rook.svg'
import whiteFigure from '../../Icons/White_Rook.svg'

export class Rook extends Figure {
  isFirstStep: boolean
  constructor(cell: Cell, color: 'white' | 'black') {
    super(cell, color)
    this.isFirstStep = true
    this.logo = color === 'white' ? whiteFigure : blackFigure
    this.name = FigureNames.ROOK
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false
    if (this.cell.emptyHorizontal(target)) return true
    if (this.cell.emptyVertical(target)) return true

    return false
  }
}
