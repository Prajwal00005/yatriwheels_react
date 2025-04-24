import { Suspense } from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-1 w-full transition-all duration-300 ml-64 w-[80%]" role="main">
                <Suspense fallback={<div className="text-center text-gray-600">Loading...</div>}>
                    <Outlet />
                </Suspense>
            </main>
        </div>
    )
}

export default DashboardLayout
