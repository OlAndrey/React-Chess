import FigureComponent from './FigureComponent'
import { Cell } from '../models/Cell'

interface ICellProps {
  cell: Cell
  click: (cell: Cell) => void
  selected: Cell | null
}

const CellComponent = ({ cell, click, selected }: ICellProps) => {
  const { color, figure } = cell
  return (
    <div
      className={[
        'cell',
        color === 'white' ? 'cell-white' : 'cell-black',
        selected === cell ? 'cell-selected' : ''
      ].join(' ')}
      onClick={() => click(cell)}
    >
      {figure && <FigureComponent {...figure} />}
    </div>
  )
}

export default CellComponent
