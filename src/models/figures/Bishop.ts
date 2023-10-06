import { Cell } from '../Cell'
import { Figure, FigureNames } from './Figure'
import blackFigure from '../../Icons/Black_Bishop.svg'
import whiteFigure from '../../Icons/White_Bishop.svg'

export class Bishop extends Figure {
  constructor(cell: Cell, color: 'white' | 'black') {
    super(cell, color)
    this.logo = color === 'white' ? whiteFigure : blackFigure
    this.name = FigureNames.BISHOP
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false
    if (this.cell.emptyDiagonal(target)) return true

    return false
  }
}
