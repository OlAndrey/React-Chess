import classNames from 'classnames'
import FigureComponent from './FigureComponent'
import { Cell } from '../models/Cell'

interface ICellProps {
  cell: Cell
  click: (cell: Cell) => void
  selected: Cell | null
}

const CellComponent = ({ cell, click, selected }: ICellProps) => {
  const { available, color, figure } = cell
  const cellComponentClasses = 'cell ' + (color === 'white' ? 'cell-white' : 'cell-black')

  return (
    <div
      className={
        classNames(cellComponentClasses, {
          'cell-selected': selected === cell,
          'cell-available': available
        })
      }
      onClick={() => click(cell)}
    >
      {available && !figure && <div />}
      {figure && <FigureComponent {...figure} />}
    </div>
  )
}

export default CellComponent
