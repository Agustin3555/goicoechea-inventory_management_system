import { BrowserRouter, Navigate, Route } from 'react-router-dom'
import { Admin, Login } from './pages'
import { Provider } from 'react-redux'
import { AuthGuard } from './guards'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './routes'
import { Background, RoutesWithNotFound, Snackbar } from './components'
import { GlobalStyle } from './styles'
import { store } from './redux'
import { AppStyled } from './App.styled'

const App = () => {
  return (
    <AppStyled.Component>
      <Provider store={store}>
        <GlobalStyle />
        <BrowserRouter>
          <Background />
          <RoutesWithNotFound>
            <Route path="/" element={<Navigate replace to={PRIVATE_ROUTES.admin} />} />

            {/* Public Routes */}
            <Route path={PUBLIC_ROUTES.login} element={<Login />} />

            {/* Protected Routes */}
            <Route element={<AuthGuard />}>
              <Route path={PRIVATE_ROUTES.admin} element={<Admin />} />
            </Route>
          </RoutesWithNotFound>
        </BrowserRouter>
        <Snackbar />
      </Provider>
    </AppStyled.Component>
  )
}

export default App
