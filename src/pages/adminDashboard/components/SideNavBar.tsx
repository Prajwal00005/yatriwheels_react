import { Link } from "react-router-dom"

const SideNavBar = () => {
  return (
    <aside className="w-1/3 md:w-1/4 lg:w-1/6 h-screen flex flex-col gap-3 items-center pt-5 shadow-2xl">
      <div className="w-full mb-3 ">
        <img className="w-full md:w-1/2 lg:w-1/2 mx-auto" src='/logo_trial.png' />
      </div>

      <nav className="flex flex-col gap-4">
        <Link to="dashboard" className="font-semibold text-primary text-xl">Dashboard</Link>
        <Link to="merchant" className="font-semibold  text-primary text-xl">Create Merchant</Link>
        <Link to="vehicle" className="font-semibold  text-primary text-xl">Vehicles</Link>
        {/* <Link to="Booking" className="font-semibold text-primary text-xl">Booking</Link> */}
        <Link to="user" className="font-semibold  text-primary text-xl">User</Link>
      </nav>

    </aside>
  )
}

export default SideNavBar
