import { BrowserRouter, Navigate, Route } from 'react-router-dom'
import { Admin, Login } from './pages'
import { Provider } from 'react-redux'
import { AuthGuard } from './guards'
import { PrivateRoutes, PublicRoutes } from './routes'
import { RoutesWithNotFound, Snackbar } from './components'
import { GlobalStyle } from './styles'
import { StylizedApp } from './App.styled'
import { store } from './redux'

const App = () => {
  return (
    <StylizedApp>
      <Provider store={store}>
        <GlobalStyle />
        <BrowserRouter>
          <RoutesWithNotFound>
            <Route path="/" element={<Navigate replace to={PrivateRoutes.ADMIN} />} />

            {/* Public Routes */}
            <Route path={PublicRoutes.LOGIN} element={<Login />} />

            {/* Protected Routes */}
            <Route element={<AuthGuard />}>
              <Route path={PrivateRoutes.ADMIN} element={<Admin />} />
            </Route>
          </RoutesWithNotFound>
        </BrowserRouter>
        <Snackbar />
      </Provider>
    </StylizedApp>
  )
}

export default App
