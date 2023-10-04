import { Cell } from '../models/Cell'

const CellComponent = ({ color }: Cell) => {
  return <div className={['cell', color === 'white' ? 'cell-white' : 'cell-black'].join(' ')} />
}

export default CellComponent
