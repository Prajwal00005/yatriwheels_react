
import SideNavBar from './components/SideNavBar'
import NavBar from './components/NavBar'
// import VehiclesTable from './components/VehiclesTable'
// import UsersTable from './components/User'
// import MerchantForm from './components/MerchantForm'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const Index = () => {
    return (
        <div className='flex '>
            <SideNavBar />
            <div className='w-full '>
                <NavBar />
                {/* <MerchantForm /> */}
                <Outlet />
                <ToastContainer />
            </div>
        </div>
    )
}

export default Index
