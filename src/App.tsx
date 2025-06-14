import { Route, Routes } from 'react-router-dom'
import './App.css'

import HomePage from './pages/Homepage/HomePage'
// import { LoginProvider } from './context/login_context'
import ProtectedRouteLayout from './context/protected_layout'
import LandingPage from './pages/landingPage/LandingPage'
// import Index from './pages/adminDashboard/Index'
import Routespage from './pages/adminDashboard/routes'
import SingleCard from './pages/Homepage/components/SingleCard'
import ProfilePage from './modules/auth/components/Profile'
import MerchantRoute from './pages/merchantDashboard/merchantRoute'
import BookingDashboard from './pages/Homepage/components/bookingDasboard'
import Test from './Test'
import { Provider } from "react-redux"
import store from './store'
// import VehiclesCard from './pages/Homepage/components/VehicleCard'
// import SideNavBar from './pages/adminDashboard/components/SideNavBar'


function App() {

  return (
    <>

      <Routes >

        <Route path='/' element={<LandingPage />} />

        <Route path="/" element={<ProtectedRouteLayout />}>
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path="/vehicle/:id" element={<SingleCard />} />
          <Route path="/booking" element={<BookingDashboard />} />
          <Route path='/admin/*' element={<Routespage />} />

          <Route path='/merchant/*' element={< MerchantRoute />} />

        </Route>

      </Routes>


      <Provider store={store} >
        <Routes>

          <Route path='/test' element={< Test />} />

        </Routes>
      </Provider>


    </>

  )
}

export default App
