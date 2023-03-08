import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { PrivateInterceptor } from './interceptors'
import '@/styles/normalize.css'
import '@/styles/vars.css'

PrivateInterceptor()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
