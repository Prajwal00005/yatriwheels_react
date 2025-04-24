import Filter from './Filter'
import Vehicles from './Vehicles'

const Layout = () => {
  return (
    <div className='flex flex-row gap-5 h-screen w-full p-4 bg-gray-100'>
      <Filter />
      <Vehicles />
    </div>
  )
}

export default Layout
