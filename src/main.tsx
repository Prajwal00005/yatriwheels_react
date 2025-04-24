import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import App from './pages/merchantDashboard/App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { LoginProvider } from './context/login_context.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <LoginProvider>
      <StrictMode>

        {/* <App />
       */}
        <App />
      </StrictMode>
    </LoginProvider>
  </BrowserRouter>
)
