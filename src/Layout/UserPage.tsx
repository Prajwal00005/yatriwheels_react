import Navbar from '../pages/Homepage/components/Navbar'
import { Outlet } from 'react-router-dom'
import { useUser } from '../context/login_context'

const UserPage = () => {

  const user = useUser();
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default UserPage
