import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { PrivateInterceptor, PublicInterceptor } from './interceptors'

PublicInterceptor()
PrivateInterceptor()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
