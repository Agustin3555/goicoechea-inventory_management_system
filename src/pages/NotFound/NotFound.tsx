import { Button, Icon, SinglePageOnCard } from '@/components'
import { useDarkMode } from '@/hooks'
import { PRIVATE_ROUTES } from '@/routes'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { COLOR, FONT_SIZE } from '@/styles'
import { NotFoundStyled } from './NotFound.styled'

const NotFound = () => {
  const darkMode = useDarkMode()
  const navigate = useNavigate()

  const handleGoBack = useCallback(() => navigate(PRIVATE_ROUTES.admin, { replace: true }), [])

  return (
    <NotFoundStyled.Component p={NotFoundStyled.adapter(darkMode)}>
      <SinglePageOnCard title="Error 404">
        <div className="content">
          <p className="description">
            El error 404 es un mensaje que se muestra cuando intentas acceder a una página que
            no existe en un sitio web. Esto puede suceder por varias razones, como una URL
            incorrecta o una página que ha sido eliminada. En resumen, este error indica que la
            página que estás buscando no se puede encontrar.
          </p>
          <Button
            title="Volver"
            style={{
              backgroundColor: {
                dark: COLOR.a,
              },
            }}
            handleClick={handleGoBack}
          >
            <div className="button-content">
              <Icon iconName="fa-solid fa-arrow-left" style={{ size: FONT_SIZE.s }} />
              <span className="text">Volver</span>
            </div>
          </Button>
        </div>
      </SinglePageOnCard>
    </NotFoundStyled.Component>
  )
}

export default NotFound
