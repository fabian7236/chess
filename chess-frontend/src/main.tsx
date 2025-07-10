import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="flex justify-center items-center m-auto w-screen h-screen" onMouseDown={(e) => e.preventDefault()}>
      <App />
    </div>
  </StrictMode>,
)
