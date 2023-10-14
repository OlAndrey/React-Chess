import { Cell } from '../Cell'
import { Figure, FigureNames } from './Figure'
import blackFigure from '../../Icons/Black_Pawn.svg'
import whiteFigure from '../../Icons/White_Pawn.svg'

export class Pawn extends Figure {
  constructor(cell: Cell, color: 'white' | 'black') {
    super(cell, color)
    this.logo = color === 'white' ? whiteFigure : blackFigure
    this.name = FigureNames.PAWN
  }

  canMove(target: Cell): boolean {
    const absX = Math.abs(target.x - this.cell.x)
    const absY = Math.abs(target.y - this.cell.y)
    const x = this.cell.x
    const dx = this.color === 'black' ? 1 : -1

    if (!super.canMove(target)) return false
    if (absY > 1) return false
    if (absY === 1 && x + dx === target.x && target.figure) return true
    if (target.x - x === dx) return absY === 0 ? !target.figure : !!target.figure
    if (
      this.isFirstStep &&
      absX === 2 &&
      absY === 0 &&
      !this.cell.board.getCell(x + dx, target.y).figure
    )
      return x + dx * absX === target.x && !target.figure

    return false
  }
}
