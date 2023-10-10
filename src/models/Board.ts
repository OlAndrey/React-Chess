import { Cell } from './Cell'
import { Bishop } from './figures/Bishop'
import { King } from './figures/King'
import { Knight } from './figures/Knight'
import { Pawn } from './figures/Pawn'
import { Queen } from './figures/Queen'
import { Rook } from './figures/Rook'

export class Board {
  cells: Array<Cell[]>
  kingPositions: Cell[]

  constructor() {
    this.cells = []
    this.kingPositions = []
  }

  copyBoard() {
    const newBoard = new Board()
    newBoard.cells = this.cells
    newBoard.kingPositions = this.kingPositions
    return newBoard
  }

  fill() {
    for (let i = 0; i < 8; i++) {
      const row = []
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 === 0) row.push(new Cell(this, i, j, 'white'))
        else row.push(new Cell(this, i, j, 'black'))
      }
      this.cells.push(row)
    }
    return this
  }

  getFigures() {
    for (let y = 0; y < this.cells.length; y++) {
      if (y === 0 || y === 7) {
        this.cells[0][y].figure = new Rook(this.cells[0][y], 'black')
        this.cells[7][y].figure = new Rook(this.cells[7][y], 'white')
      }
      if (y === 1 || y === 6) {
        this.cells[0][y].figure = new Knight(this.cells[0][y], 'black')
        this.cells[7][y].figure = new Knight(this.cells[7][y], 'white')
      }
      if (y === 2 || y === 5) {
        this.cells[0][y].figure = new Bishop(this.cells[0][y], 'black')
        this.cells[7][y].figure = new Bishop(this.cells[7][y], 'white')
      }
      if (y === 3) {
        this.cells[0][y].figure = new Queen(this.cells[0][y], 'black')
        this.cells[7][y].figure = new Queen(this.cells[7][y], 'white')
      }
      if (y === 4) {
        this.cells[0][y].figure = new King(this.cells[0][y], 'black')
        this.cells[7][y].figure = new King(this.cells[7][y], 'white')
        this.kingPositions = [this.cells[7][y], this.cells[0][y]]
      }
      this.cells[1][y].figure = new Pawn(this.cells[1][y], 'black')
      this.cells[6][y].figure = new Pawn(this.cells[6][y], 'white')
    }
  }

  getCell(x: number, y: number): Cell {
    return this.cells[x][y]
  }

  highlightCells(selected: Cell | null) {
    const figure = selected?.figure
    for (let x = 0; x < this.cells.length; x++) {
      for (let y = 0; y < this.cells[x].length; y++) {
        const cell = this.cells[x][y]
        cell.available = !!figure?.canMove(cell) && !!figure?.isKingSave(cell)
      }
    }
  }

  checkCapture(color: 'white' | 'black') {
    const kingPosition = color === 'white' ? this.kingPositions[0] : this.kingPositions[1]
    kingPosition.capture = this.canCaptureKing(color)
  }

  canCaptureKing(color: 'white' | 'black'): boolean {
    const kingPosition = color === 'white' ? this.kingPositions[0] : this.kingPositions[1]

    return kingPosition.cellCapture()
  }
}
