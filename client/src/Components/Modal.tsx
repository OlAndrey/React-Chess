import classNames from "classnames"
import { FC, ReactNode } from "react"

interface ModalPropsType {
    children: ReactNode
    className?: string
    isShow: boolean
}

const Modal: FC<ModalPropsType> = ({ children, className = '', isShow}) => {
  return (
    <div className={className}>
      <section className={classNames('modal', { hidden: !isShow })}>
        {children}
      </section>

      <div className={classNames('overlay', { hidden: !isShow })}></div>
    </div>
  )
}

export default Modal
