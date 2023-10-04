import { Board } from './Board'
import { Figure } from './figures/Figure'

export class Cell {
  board: Board
  id: number
  x: number
  y: number
  color: 'white' | 'black'
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
}
