import { Routes, Route } from 'react-router-dom'
import Index from './Index' // Your layout component
import VehiclesTable from './components/VehiclesTable'
import UsersTable from './components/User'
import MerchantForm from './components/MerchantForm'
// import Booking from './components/BookingTable'
import Dashboard from './components/Dashboard'

export default function Routespage() {
  return (
    <Routes>
      <Route path="/" element={<Index />}>
        <Route path='dashboard' element={<div><Dashboard /></div>} />
        <Route path="merchant" element={<MerchantForm />} />
        <Route path="vehicle" element={<VehiclesTable />} />
        {/* <Route path="booking" element={<Booking />} /> */}
        <Route path="user" element={<UsersTable />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
    </Routes>
  )
}

