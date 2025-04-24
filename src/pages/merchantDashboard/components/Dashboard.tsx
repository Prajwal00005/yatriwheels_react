
import Header from './Header'
import PageHeader from './PageHeader'
import Card from './Card'
import AsideCard from './AsideCard'

const Dashboard = () => {
    return (
        <div>
            <div className="main-content p-4 ml-16 md:ml-64 ">
                <Header />
                <main className="p-4">
                    <PageHeader />
                    <div className="flex gap-4">
                        <div className="card grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 flex-1">
                            <Card
                                title="Total Cars"
                                subtitle="Cars listed in the system"
                                value="120"
                                growth="5 new this week"
                                icon="las la-car"
                                chartClass="success bg-green-100 text-green-600"
                            />
                            <Card
                                title="Bookings"
                                subtitle="Total bookings this month"
                                value="650"
                                growth="12% increase"
                                icon="las la-calendar-check"
                                chartClass="yellow bg-yellow-100 text-yellow-600"
                            />
                            <Card
                                title="Earnings"
                                subtitle="Total revenue this month"
                                value="Rs. 142,000"
                                growth="4% growth"
                                icon="las la-coins"
                                chartClass="danger bg-red-100 text-red-600"
                            />
                        </div>
                        <div className="aside w-64">
                            <AsideCard
                                title="Quick Actions"
                                description="Manage your vehicles and bookings."
                                icon="las la-tools"
                            />
                            <AsideCard
                                title="Support"
                                description="Contact our support team."
                                icon="las la-headset"
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Dashboard
