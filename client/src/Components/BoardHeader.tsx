import classNames from 'classnames'

const BoardHeader = ({
  children,
  isReverse
}: {
  children: React.ReactNode
  isReverse: boolean
}) => {
  const top = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  const aside = [1, 2, 3, 4, 5, 6, 7, 8]

  const topElement = top.map((item) => <div key={Math.random()}>{item}</div>)
  const asideElement = aside.map((item) => <div key={Math.random()}>{item}</div>)

  return (
    <div>
      <div className="coord-top">{topElement}</div>
      <div className="flex">
        <div
          className={classNames('coord-aside', {
            'flex-column': isReverse
          })}
        >
          {asideElement}
        </div>
        <div className={classNames('field', { 'field-black': isReverse })}>{children}</div>
        <div
          className={classNames('coord-aside', {
            'flex-column': isReverse
          })}
        >
          {asideElement}
        </div>
      </div>
      <div className="coord-bottom">{topElement}</div>
    </div>
  )
}

export default BoardHeader
