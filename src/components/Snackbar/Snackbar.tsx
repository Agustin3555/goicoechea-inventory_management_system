import { Icon } from '@/components'
import { AppStore } from '@/redux/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { MessageType, dequeueMessage } from '@/redux/states'
import { css } from 'styled-components'
import { COLOR, FONT_SIZE, MICROINTERACTION } from '@/styles'
import { SnackbarStyled } from './Snackbar.styled'

const styleByType: {
  [key: number]: {
    iconName: string
    backgroundColor: string
  }
} = {
  [MessageType.info]: {
    iconName: 'fa-solid fa-info',
    backgroundColor: COLOR.b,
  },
  [MessageType.warning]: {
    iconName: 'fa-solid fa-triangle-exclamation',
    backgroundColor: COLOR.c_d1,
  },
  [MessageType.error]: {
    iconName: 'fa-solid fa-exclamation',
    backgroundColor: COLOR.a_d1,
  },
}

const Snackbar = ({ style }: { style?: SnackbarStyled.Props }) => {
  const dispatch = useDispatch()
  const currentMessage = useSelector((store: AppStore) => store.snackbar.messages[0])
  const currentMessageStyle = styleByType[currentMessage?.info.type]

  useEffect(() => {
    if (currentMessage) {
      const dequeuer = setTimeout(() => {
        dispatch(dequeueMessage())
      }, currentMessage.screenTime)

      return () => clearTimeout(dequeuer)
    }
  }, [currentMessage])

  return (
    <SnackbarStyled.Component p={SnackbarStyled.adapter(style)}>
      <SwitchTransition>
        <CSSTransition
          key={currentMessage ? currentMessage.id : 'blank'}
          classNames="fade"
          addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
        >
          <div className="animation-container">
            {currentMessage && (
              <div
                className="message"
                style={{
                  backgroundColor: currentMessageStyle?.backgroundColor,
                }}
              >
                <Icon
                  iconName={currentMessageStyle?.iconName}
                  style={{
                    size: FONT_SIZE.l,
                    styled: css`
                      flex-grow: 1;
                      flex-shrink: 0;
                      animation: dance ease-in-out ${MICROINTERACTION.xl} infinite reverse;

                      @keyframes dance {
                        0%,
                        30%,
                        60%,
                        100% {
                          transform: rotate(0);
                        }
                        45% {
                          transform: rotate(12.5deg);
                        }
                        55% {
                          transform: rotate(-17.5deg);
                        }
                      }
                    `,
                  }}
                />
                <p className="text">{currentMessage.info.text}</p>
                {/* <div className="close-button">
                  <Icon iconName="fa-solid fa-thumbs-up" style={{ size: 'm' }} />
                </div> */}
              </div>
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </SnackbarStyled.Component>
  )
}

export default Snackbar
