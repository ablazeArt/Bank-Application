import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import MyRoutes from './MyRoute'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MyRoutes/>
  </React.StrictMode>,
)
