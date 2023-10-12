import { Board } from './Board'
import { Figure, FigureNames } from './figures/Figure'

export class Cell {
  board: Board
  id: number
  readonly x: number
  readonly y: number
  readonly color: 'white' | 'black'
  figure: Figure | null
  capture: boolean

  constructor(board: Board, x: number, y: number, color: 'white' | 'black') {
    this.board = board
    this.x = x
    this.y = y
    this.color = color
    this.figure = null
    this.capture = false
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

  cellCapture(color: 'white' | 'black') {
    const cells = this.board.cells
    for (let x = 0; x < cells.length; x++) {
      for (let y = 0; y < cells[x].length; y++) {
        if (color !== cells[x][y].figure?.color)
          if (cells[x][y].figure?.name !== FigureNames.KING)
            if (!!cells[x][y]?.figure?.canMove(this)) return true
      }
    }

    return false
  }

  setFigure(figure: Figure) {
    this.figure = figure
    this.figure.cell = this
    this.figure.isFirstStep = false
  }

  moveFigure(target: Cell): boolean {
    if (this.figure && this.figure.possibleMoves.includes(target)) {
      // checking whether a figure is located and whether it is possible to make a move
      if (target.figure?.name === FigureNames.KING) return false
      const color = this.figure.color
      const index = color === 'white' ? 0 : 1

      if (this.figure.name === FigureNames.KING && !target.cellCapture(color)) {
        // if the piece is king then check whether the cell is under attack
        target.setFigure(this.figure)
        this.figure = null
        this.capture = false
        this.board.kingPositions[index] = target

        if (!this.capture && Math.abs(target.y - this.y) === 2) {
          // checking castling possibility
          const y = this.y < target.y ? 7 : 0
          const dy = this.y < target.y ? 1 : -1
          this.board.getCell(this.x, y).moveFigure(this.board.getCell(this.x, this.y + dy))
          return true
        } else {
          if (!this.board.canCaptureKing(color)) return true
          if (target?.figure) {
            this.setFigure(target.figure)
            target.figure = null
          }
          return false
        }
      } else {
        const targetFigure = target.figure
        target.setFigure(this.figure)
        this.figure = null
        if (!this.board.canCaptureKing(color)) {
          this.board.kingPositions[index].capture = false
          return true
        }
        if (target?.figure) {
          // canceling a figure's movement if it threatens the king
          this.setFigure(target.figure)
          target.figure = targetFigure
          return false
        }
      }
    }

    return false
  }
}
