import { Button, Icon, Input, SinglePageOnCard, Spinner } from '@/components'
import { useDarkMode } from '@/hooks'
import { MessageType, createUser, enqueueMessage, resetUser } from '@/redux'
import { PRIVATE_ROUTES } from '@/routes'
import { AuthService, UsersService, tokenEntity } from '@/services'
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { loginStyleAdapter, StylizedLogin } from './Login.styled'
import { AppError, ERRORS, getErrorInterpretation } from '@/tools'

const Login = () => {
  const darkMode = useDarkMode()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [authError, setAuthError] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    dispatch(resetUser())
  }, [])

  const handleFieldChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { name, value } = event.target

    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event: any) => {
    event.preventDefault()

    setLoading(true)
    setAuthError(false)

    const loginResponse = await AuthService.login(formValues)

    if (!loginResponse) {
      setLoading(false)
    } else if (loginResponse instanceof AppError) {
      if (loginResponse.code === ERRORS.login) setAuthError(true)
    } else {
      tokenEntity.set(loginResponse.token)

      const userResponse = await UsersService.me()

      if (userResponse) {
        dispatch(createUser(userResponse))

        dispatch(
          enqueueMessage({
            text: 'Logueado con éxito',
            type: MessageType.info,
          })
        )

        navigate(`/${PRIVATE_ROUTES.admin}`, { replace: true })
      }
    }

    setLoading(false)
  }

  return (
    <StylizedLogin p={loginStyleAdapter(darkMode)}>
      <SinglePageOnCard title="Iniciar Sesión">
        <form className="content" onSubmit={loading ? undefined : handleSubmit}>
          <div className="fields">
            <Input
              name="email"
              title="Email"
              extraAttrs={{
                type: 'email',
                onChange: handleFieldChange,
                required: true,
              }}
            />
            <Input
              name="password"
              title="Contraseña"
              extraAttrs={{
                type: 'password',
                onChange: handleFieldChange,
                required: true,
              }}
            />
          </div>
          <div className="auth-error-container">
            <div className="auth-error" data-show={authError}>
              {getErrorInterpretation(ERRORS.login)}
            </div>
          </div>
          <Button
            title="Acceder"
            style={{
              backgroundColor: {
                dark: 'a',
              },
            }}
            extraAttrs={{
              type: 'submit',
              disabled: loading,
            }}
          >
            <SwitchTransition>
              <CSSTransition
                key={loading.toString()}
                classNames="fade"
                addEndListener={(node, done) =>
                  node.addEventListener('transitionend', done, false)
                }
              >
                <div className="button-content">
                  {loading ? (
                    <Spinner />
                  ) : (
                    <>
                      <Icon iconName="fa-solid fa-arrow-right" style={{ size: 's' }} />
                      <span className="text">Acceder</span>
                    </>
                  )}
                </div>
              </CSSTransition>
            </SwitchTransition>
          </Button>
        </form>
      </SinglePageOnCard>
    </StylizedLogin>
  )
}

export default Login
