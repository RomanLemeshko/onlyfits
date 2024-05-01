import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'
//ref
ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router ={router}/>
)
