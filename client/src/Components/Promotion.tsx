import blackQueenIcon from '../Icons/Black_Queen.svg'
import blackRookIcon from '../Icons/Black_Rook.svg'
import blackBishopIcon from '../Icons/Black_Bishop.svg'
import blackKnightIcon from '../Icons/Black_Knight.svg'
import { FigureNames } from '../models/figures/Figure'

const Promotion = ({ handler }: { handler: (figure: FigureNames) => void }) => {
  const figures = [
    {
      name: FigureNames.QUEEN,
      imageSrc: blackQueenIcon
    },
    {
      name: FigureNames.ROOK,
      imageSrc: blackRookIcon
    },
    {
      name: FigureNames.BISHOP,
      imageSrc: blackBishopIcon
    },
    {
      name: FigureNames.KNIGHT,
      imageSrc: blackKnightIcon
    }
  ]

  return (
    <div className="promotion">
      {figures.map((figure, idx) => (
        <div key={idx + Math.random()} onClick={() => handler(figure.name)}>
          <img src={figure.imageSrc} alt={figure.name} />
          <div className="figure-name">{figure.name}</div>
        </div>
      ))}
    </div>
  )
}

export default Promotion
