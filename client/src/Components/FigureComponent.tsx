const FigureComponent = ({ name, logo }: { name: string; logo: string | null }) => {
  return <div className="figure">{logo && <img src={logo} alt={name} />}</div>
}

export default FigureComponent
