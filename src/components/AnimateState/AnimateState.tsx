import { CSSTransition, SwitchTransition } from 'react-transition-group'

const AnimateState = ({
  state,
  animationClass = 'fade',
  children,
}: {
  state: string
  animationClass?: string
  children: JSX.Element
}) => (
  <SwitchTransition>
    <CSSTransition
      key={state}
      classNames={animationClass}
      addEndListener={(node, done) =>
        node.addEventListener('transitionend', done, false)
      }
    >
      {children}
    </CSSTransition>
  </SwitchTransition>
)

export default AnimateState
