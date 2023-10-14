import { Cell } from '../Cell'
import { Figure, FigureNames } from './Figure'
import blackFigure from '../../Icons/Black_Queen.svg'
import whiteFigure from '../../Icons/White_Queen.svg'

export class Queen extends Figure {
  constructor(cell: Cell, color: 'white' | 'black') {
    super(cell, color)
    this.logo = color === 'white' ? whiteFigure : blackFigure
    this.name = FigureNames.QUEEN
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false
    if (this.cell.emptyDiagonal(target)) return true
    if (this.cell.emptyHorizontal(target)) return true
    if (this.cell.emptyVertical(target)) return true

    return false
  }
}
