import { Cell } from '../Cell'
import { Figure, FigureNames } from './Figure'
import blackFigure from '../../Icons/Black_Knight.svg'
import whiteFigure from '../../Icons/White_Knight.svg'

export class Knight extends Figure {
  constructor(cell: Cell, color: 'white' | 'black') {
    super(cell, color)
    this.logo = color === 'white' ? whiteFigure : blackFigure
    this.name = FigureNames.KNIGHT
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false

    const absX = Math.abs(target.x - this.cell.x)
    const absY = Math.abs(target.y - this.cell.y)

    if ((absX === 1 && absY === 2) || (absX === 2 && absY === 1)) return true

    return false
  }
}
