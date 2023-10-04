import FigureComponent from './FigureComponent'
import { Cell } from '../models/Cell'

const CellComponent = ({ available, color, figure }: Cell) => {
  return (
    <div
      className={[
        'cell',
        color === 'white' ? 'cell-white' : 'cell-black',
        available ? 'cell-available' : ''
      ].join(' ')}
    >
      {figure && <FigureComponent {...figure} />}
    </div>
  )
}

export default CellComponent
