import React from 'react';

// Interface for booking data
interface Booking {
    customer: string;
    car: string;
    bookingDate: string;
    returnDate: string;
    location: string;
    status: 'Confirmed' | 'Pending' | 'Canceled';
}

// Bookings Component
const Booking: React.FC = () => {
    const bookings: Booking[] = [
        {
            customer: 'Luffy',
            car: 'Tesla Model 3',
            bookingDate: '2025-04-10',
            returnDate: '2025-04-15',
            location: 'Kathmandu',
            status: 'Confirmed',
        },
        {
            customer: 'Roronoa Zoro',
            car: 'Ford Focus',
            bookingDate: '2025-04-12',
            returnDate: '2025-04-14',
            location: 'Pokhara',
            status: 'Pending',
        },
        {
            customer: 'Eren Yeager',
            car: 'BMW X3',
            bookingDate: '2025-04-08',
            returnDate: '2025-04-12',
            location: 'Chitwan',
            status: 'Canceled',
        },
    ];

    const getStatusButtonClass = (status: Booking['status']) => {
        switch (status) {
            case 'Confirmed':
                return 'bg-green-500 text-white';
            case 'Pending':
                return 'bg-yellow-500 text-white';
            case 'Canceled':
                return 'bg-red-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    return (
        <section className="p-4 ml-16 md:ml-64">
            <h3 className="text-2xl font-bold mb-4">
                Bookings <small className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">View All</small>
            </h3>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600">Customer</th>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600">Car</th>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600">Booking Date</th>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600">Return Date</th>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600">Location</th>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600">Status</th>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600">Booking Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={index} className="border-b last:border-none hover:bg-gray-50">
                                <td className="p-3 whitespace-nowrap">{booking.customer}</td>
                                <td className="p-3 whitespace-nowrap">{booking.car}</td>
                                <td className="p-3 whitespace-nowrap">{booking.bookingDate}</td>
                                <td className="p-3 whitespace-nowrap">{booking.returnDate}</td>
                                <td className="p-3 whitespace-nowrap">{booking.location}</td>
                                <td className="p-3 whitespace-nowrap">
                                    <button className={`px-3 py-1 rounded ${getStatusButtonClass(booking.status)}`}>
                                        {booking.status}
                                    </button>
                                </td>
                                <td className="p-3 whitespace-nowrap flex flex-wrap gap-2">
                                    <button className="edit-btn px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                                        Edit
                                    </button>
                                    <button className="delete-btn px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Booking;
