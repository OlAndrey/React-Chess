const BoardHeader = ({ children }: { children: React.ReactNode }) => {
  const top = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  const aside = [1, 2, 3, 4, 5, 6, 7, 8]

  const topElement = top.map((item) => <div key={Math.random()}>{item}</div>)
  const asideElement = aside.map((item) => <div key={Math.random()}>{item}</div>)

  return (
    <div>
      <div className="coord-top">{topElement}</div>
      <div className="flex">
        <div className="coord-aside">{asideElement}</div>
        <div className="field">{children}</div>
        <div className="coord-aside">{asideElement}</div>
      </div>
      <div className="coord-bottom">{topElement}</div>
    </div>
  )
}

export default BoardHeader
