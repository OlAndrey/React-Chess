interface ICellProps {
  x: number
  y: number
  figure: string | null
  color: 'white' | 'black'
}

const CellComponent = ({ color }: ICellProps) => {
  return <div className={['cell', color === 'white' ? 'cell-white' : 'cell-black'].join(' ')} />
}

export default CellComponent
