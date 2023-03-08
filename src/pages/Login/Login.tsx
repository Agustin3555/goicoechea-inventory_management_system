import { Button, Icon, Input, SinglePageOnCard, Spinner } from '@/components'
import { useDarkMode } from '@/hooks'
import { LocalStorageEntities } from '@/models'
import { createUser, resetUser } from '@/redux/states/user.state'
import { PrivateRoutes } from '@/routes'
import { AuthService, UsersService } from '@/services'
import { LocalStorageEntity } from '@/tools'
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { loginStyleAdapter, StylizedLogin } from './Login.styled'

const tokenEntity = new LocalStorageEntity<string>(LocalStorageEntities.TOKEN)

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

    const { email, password } = formValues

    try {
      const token = await AuthService.login(email, password)
      tokenEntity.set(token)

      const user = await UsersService.me()
      dispatch(createUser(user))

      navigate(`/${PrivateRoutes.ADMIN}`, { replace: true })
    } catch (error) {
      setAuthError(true)
    } finally {
      setLoading(false)
    }
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
              Email o contraseña incorrecta
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
                      <Icon iconName="fa-solid fa-arrow-right" styleProps={{ size: 's' }} />
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
