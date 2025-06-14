import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import App from './pages/merchantDashboard/App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { LoginProvider } from './context/login_context.tsx'
import { Provider } from "react-redux"
import store from './store.ts'

createRoot(document.getElementById('root')!).render(

  <BrowserRouter>
    <LoginProvider>
      <StrictMode>
        <Provider store={store}>
          <App />
        </Provider>

        {/* <App />
       */}
        {/* <App /> */}

      </StrictMode>
    </LoginProvider>

  </BrowserRouter>

)
