// import React, { useEffect, useState } from 'react';

// // Extend the window object to include KhaltiCheckout
// declare global {
//     interface Window {
//         KhaltiCheckout: any;
//     }
// }
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { generateKhaltiConfig } from '../../../utils/loadKhalti';

// interface Vehicle {
//     _id: string;
//     name: string;
//     category: string;
//     seat: number;
//     types: string;
//     price: number;
//     description: string;
//     location: string;
//     numberPlate: string;
//     imageURL: string;
//     createdBy: string;
//     createdAt: string;
//     updatedAt: string;
// }

// interface User {
//     _id: string;
//     name: string;
//     email: string;
//     phone: string;
// }

// interface Booking {
//     _id: string;
//     vehicle: Vehicle;
//     user: User;
//     startDate: string;
//     endDate: string;
//     pickupLocation: string;
//     totalPrice: number;
//     status: string;
//     createdAt: string;
//     __v: number;
// }

// const BookingDashboard: React.FC = () => {
//     const [bookings, setBookings] = useState<Booking[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

//     // Fetch user bookings
//     useEffect(() => {
//         const fetchBookings = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await axios.get('http://localhost:3000/api/v1/my-bookings', {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 console.log('Raw API response:', response.data); // Debug log
//                 // Handle different response structures
//                 let fetchedBookings: Booking[] = [];
//                 if (Array.isArray(response.data.data)) {
//                     fetchedBookings = response.data.data;
//                 } else if (Array.isArray(response.data.bookings)) {
//                     fetchedBookings = response.data.bookings;
//                 } else if (Array.isArray(response.data)) {
//                     fetchedBookings = response.data;
//                 }
//                 console.log('Processed bookings:', fetchedBookings); // Debug log
//                 setBookings(fetchedBookings);
//             } catch (error: any) {
//                 const errorMessage = error.response?.data?.message || 'Failed to fetch bookings';
//                 setError(errorMessage);
//                 console.error('Error fetching bookings:', error.response?.data || error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchBookings();
//     }, []);

//     // Open modal for cancellation
//     const openCancelModal = (bookingId: string) => {
//         setSelectedBookingId(bookingId);
//         setModalOpen(true);
//     };

//     // Close modal
//     const closeModal = () => {
//         setModalOpen(false);
//         setSelectedBookingId(null);
//     };

//     // Handle booking cancellation
//     const handleCancelBooking = async () => {
//         if (!selectedBookingId) return;

//         try {
//             const token = localStorage.getItem('token');
//             await axios.delete(`http://localhost:3000/api/v1/cancel/${selectedBookingId}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             setBookings(bookings.filter((booking) => booking._id !== selectedBookingId));
//             toast.success('Booking cancelled successfully!', {
//                 position: 'top-right',
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//             });
//             closeModal();
//         } catch (error: any) {
//             toast.error(error.response?.data?.message || 'Failed to cancel booking', {
//                 position: 'top-right',
//                 autoClose: 3000,
//             });
//             console.error('Error cancelling booking:', error.response?.data || error.message);
//             closeModal();
//         }
//     };

//     const handlePayment = async (bookingId: string) => {
//         try {
//             const booking = bookings.find((booking) => booking._id === bookingId);
//             if (!booking) {
//                 throw new Error("Unknown booking id");
//             }

//             const amountInPaisa = booking.totalPrice * 100; // ← Define it here

//             const config = generateKhaltiConfig({
//                 identity: booking._id,
//                 productName: booking.vehicle.name,
//                 amount: amountInPaisa,
//                 onServerSuccess: () => {
//                     toast.success("Payment confirmed successfully!", {
//                         position: "top-right",
//                         autoClose: 3000,
//                     });
//                     // Optional: refresh bookings, navigate, etc.
//                 },
//             });

//             const checkout = new window.KhaltiCheckout(config);
//             checkout.show({ amount: amountInPaisa }); // Use the same value here too

//         } catch (error: any) {
//             toast.error(error.message || 'Failed to initiate payment', {
//                 position: 'top-right',
//                 autoClose: 3000,
//             });
//             console.error('Error initializing payment:', error.message);
//         }
//     };


//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//             <ToastContainer />
//             <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
//                 <div className="p-8">
//                     <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Bookings</h2>
//                     {error && (
//                         <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
//                             {error}
//                         </div>
//                     )}
//                     {bookings.length === 0 ? (
//                         <p className="text-gray-600">You have no bookings.</p>
//                     ) : (
//                         <div className="overflow-x-auto">
//                             <table className="min-w-full divide-y divide-gray-200">
//                                 <thead className="bg-gray-50">
//                                     <tr>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Vehicle
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Start Date
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             End Date
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Pickup Location
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Total Price
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Status
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Actions
//                                         </th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="bg-white divide-y divide-gray-200">
//                                     {bookings.map((booking) => (
//                                         <tr key={booking._id}>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                                 {booking.vehicle?.name}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                 {new Date(booking.startDate).toLocaleDateString()}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                 {new Date(booking.endDate).toLocaleDateString()}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                 {booking.pickupLocation}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                 ${booking.totalPrice}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                 {booking.status}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                                 {booking.status === 'pending' && (
//                                                     <>
//                                                         <button
//                                                             onClick={() => handlePayment(booking._id)}
//                                                             className="text-blue-600 hover:text-blue-800 mr-4"
//                                                         >
//                                                             Pay Now
//                                                         </button>
//                                                         <button
//                                                             onClick={() => openCancelModal(booking._id)}
//                                                             className="text-red-600 hover:text-red-800"
//                                                         >
//                                                             Cancel
//                                                         </button>
//                                                     </>
//                                                 )}
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Modal for confirming cancellation */}
//             {modalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
//                         <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                             Confirm Cancellation
//                         </h3>
//                         <p className="text-gray-600 mb-6">
//                             Are you sure you want to cancel this booking?
//                         </p>
//                         <div className="flex justify-end space-x-4">
//                             <button
//                                 onClick={closeModal}
//                                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
//                             >
//                                 Close
//                             </button>
//                             <button
//                                 onClick={handleCancelBooking}
//                                 className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//                             >
//                                 Confirm
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default BookingDashboard;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { generateKhaltiConfig } from '../../../utils/loadKhalti';

// // Extend the window object to include KhaltiCheckout
// declare global {
//     interface Window {
//         KhaltiCheckout: any;
//     }
// }

// interface Vehicle {
//     _id: string;
//     name: string;
//     category: string;
//     seat: number;
// }

// interface User {
//     _id: string;
//     name: string;
//     email: string;
//     phone: string;
// }

// interface Booking {
//     _id: string;
//     vehicle: Vehicle;
//     user: User;
//     startDate: string;
//     endDate: string;
//     totalPrice: number;
//     status: string;
//     createdAt: string;
//     __v: number;
// }

// interface KhaltiConfig {
//     publicKey: string;
//     productIdentity: string;
//     productName: string;
//     amount: number;
//     eventHandler: {
//         onSuccess: (payload: any) => void;
//         onError: (error: any) => void;
//         onClose: () => void;
//     };
// }

// const BookingDashboard: React.FC = () => {
//     const [bookings, setBookings] = useState<Booking[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

//     // Fetch bookings
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 console.log('Token:', token); // Debug token
//                 if (!token) {
//                     throw new Error('No authentication token found. Please log in.');
//                 }

//                 const bookingResponse = await axios.get('http://localhost:3000/api/v1/my-bookings', {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 console.log('Bookings response:', bookingResponse.data); // Debug
//                 let fetchedBookings: Booking[] = [];
//                 if (Array.isArray(bookingResponse.data.data)) {
//                     fetchedBookings = bookingResponse.data.data;
//                 } else if (Array.isArray(bookingResponse.data.bookings)) {
//                     fetchedBookings = bookingResponse.data.bookings;
//                 } else if (Array.isArray(bookingResponse.data)) {
//                     fetchedBookings = bookingResponse.data;
//                 }
//                 setBookings(fetchedBookings);
//             } catch (err: any) {
//                 const status = err.response?.status;
//                 let errorMessage = err.response?.data?.message || err.message || 'Failed to fetch bookings';
//                 if (status === 401) {
//                     errorMessage = 'Unauthorized. Please log in again.';
//                 } else if (status === 403) {
//                     errorMessage = 'Access denied. You do not have permission to view bookings.';
//                 }
//                 console.error('Error:', err.response?.data || err.message);
//                 setError(errorMessage);
//                 toast.error(errorMessage, {
//                     position: 'top-right',
//                     autoClose: 5000,
//                 });
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     // Open modal for cancellation
//     const openCancelModal = (bookingId: string) => {
//         setSelectedBookingId(bookingId);
//         setModalOpen(true);
//     };

//     // Close cancellation modal
//     const closeModal = () => {
//         setModalOpen(false);
//         setSelectedBookingId(null);
//     };

//     // Handle booking cancellation
//     const handleCancelBooking = async () => {
//         if (!selectedBookingId) return;

//         try {
//             const token = localStorage.getItem('token');
//             await axios.delete(`http://localhost:3000/api/v1/cancel/${selectedBookingId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setBookings(bookings.filter((booking) => booking._id !== selectedBookingId));
//             toast.success('Booking cancelled successfully!');
//             closeModal();
//         } catch (err: any) {
//             const errorMessage = err.response?.data?.message || 'Failed to cancel booking';
//             toast.error(errorMessage);
//             closeModal();
//         }
//     };

//     // Handle booking payment
//     const handleBookingPayment = async (bookingId: string) => {
//         try {
//             const booking = bookings.find((b) => b._id === bookingId);
//             if (!booking) throw new Error('Booking not found');

//             const amountInPaisa = booking.totalPrice * 100;
//             const config: KhaltiConfig = generateKhaltiConfig({
//                 identity: booking._id,
//                 productName: booking.vehicle.name,
//                 amount: amountInPaisa,
//             });

//             // Add eventHandler for Khalti payment
//             config.eventHandler = {
//                 onSuccess: async (payload: any) => {
//                     try {
//                         // Notify backend of successful payment
//                         await axios.post(
//                             `http://localhost:3000/api/v1/checkout/${bookingId}`,
//                             { paymentDetails: payload },
//                             { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
//                         );
//                         toast.success('Payment confirmed successfully!');
//                         setBookings((prev) =>
//                             prev.map((b) =>
//                                 b._id === bookingId ? { ...b, status: 'confirmed' } : b
//                             )
//                         );
//                     } catch (err: any) {
//                         toast.error('Failed to confirm payment with server');
//                         console.error('Payment confirmation error:', err.response?.data || err.message);
//                     }
//                 },
//                 onError: (error: any) => {
//                     toast.error(error.message || 'Payment failed');
//                     console.error('Payment error:', error);
//                 },
//                 onClose: () => {
//                     console.log('Khalti payment widget closed');
//                 },
//             };

//             const checkout = new window.KhaltiCheckout(config);
//             checkout.show({ amount: amountInPaisa });
//         } catch (err: any) {
//             toast.error(err.message || 'Failed to initiate payment');
//             console.error('Payment initiation error:', err);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//             <ToastContainer />
//             <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
//                 <div className="p-8">
//                     <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Bookings</h2>
//                     {error && (
//                         <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
//                             {error}
//                         </div>
//                     )}
//                     {bookings.length === 0 ? (
//                         <p className="text-gray-600 text-center py-8">You have no bookings yet.</p>
//                     ) : (
//                         <div className="overflow-x-auto">
//                             <table className="min-w-full divide-y divide-gray-200">
//                                 <thead className="bg-gray-50">
//                                     <tr>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Vehicle
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Category
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Seats
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Booking Date
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Trip Dates
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Price
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Status
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Actions
//                                         </th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="bg-white divide-y divide-gray-200">
//                                     {bookings.map((booking) => {
//                                         const isReadOnly = ['completed', 'cancelled'].includes(booking.status.toLowerCase());
//                                         return (
//                                             <tr key={booking._id}>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                                     {booking.vehicle?.name}
//                                                 </td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                     {booking.vehicle?.category}
//                                                 </td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                     {booking.vehicle?.seat}
//                                                 </td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                     {new Date(booking.createdAt).toLocaleDateString()}
//                                                 </td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                     {new Date(booking.startDate).toLocaleDateString()} -{' '}
//                                                     {new Date(booking.endDate).toLocaleDateString()}
//                                                 </td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                     ${booking.totalPrice}
//                                                 </td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm">
//                                                     <span
//                                                         className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${booking.status === 'pending'
//                                                             ? 'bg-yellow-100 text-yellow-800'
//                                                             : booking.status === 'confirmed'
//                                                                 ? 'bg-green-100 text-green-800'
//                                                                 : booking.status === 'completed'
//                                                                     ? 'bg-blue-100 text-blue-800'
//                                                                     : 'bg-red-100 text-red-800'
//                                                             }`}
//                                                     >
//                                                         {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
//                                                     </span>
//                                                 </td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                                     {!isReadOnly && booking.status === 'pending' && (
//                                                         <>
//                                                             <button
//                                                                 onClick={() => handleBookingPayment(booking._id)}
//                                                                 className="text-blue-600 hover:text-blue-800 mr-4"
//                                                             >
//                                                                 Pay Now
//                                                             </button>
//                                                             <button
//                                                                 onClick={() => openCancelModal(booking._id)}
//                                                                 className="text-red-600 hover:text-red-800"
//                                                             >
//                                                                 Cancel
//                                                             </button>
//                                                         </>
//                                                     )}
//                                                 </td>
//                                             </tr>
//                                         );
//                                     })}
//                                 </tbody>
//                             </table>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Modal for Confirming Cancellation */}
//             {modalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
//                         <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Cancellation</h3>
//                         <p className="text-gray-600 mb-6">Are you sure you want to cancel this booking?</p>
//                         <div className="flex justify-end space-x-4">
//                             <button
//                                 onClick={closeModal}
//                                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
//                             >
//                                 Close
//                             </button>
//                             <button
//                                 onClick={handleCancelBooking}
//                                 className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//                             >
//                                 Confirm
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default BookingDashboard;







import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { generateKhaltiConfig, loadKhaltiScript } from '../../../utils/loadKhalti';

// Extend the window object to include KhaltiCheckout
declare global {
    interface Window {
        KhaltiCheckout: any;
    }
}

interface Vehicle {
    _id: string;
    name: string;
    category: string;
    seat: number;
}

interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
}

interface Booking {
    _id: string;
    vehicle: Vehicle;
    user: User;
    startDate: string;
    endDate: string;
    totalPrice: number;
    status: string;
    createdAt: string;
    __v: number;
}

const BookingDashboard: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
    const [khaltiReady, setKhaltiReady] = useState(false);

    // Load Khalti script
    useEffect(() => {
        loadKhaltiScript()
            .then(() => {
                console.log('Khalti script loaded successfully');
                setKhaltiReady(true);
            })
            .catch((err) => {
                console.error('Khalti script error:', err);
                toast.error('Failed to load payment system');
            });
    }, []);

    // Fetch bookings
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log('Token:', token ? token.slice(0, 10) + '...' : 'undefined'); // Debug
                if (!token) {
                    throw new Error('No authentication token found. Please log in.');
                }

                const bookingResponse = await axios.get('http://localhost:3000/api/v1/my-bookings', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log('Bookings response:', bookingResponse.data); // Debug
                let fetchedBookings: Booking[] = [];
                if (Array.isArray(bookingResponse.data.data)) {
                    fetchedBookings = bookingResponse.data.data;
                } else if (Array.isArray(bookingResponse.data.bookings)) {
                    fetchedBookings = bookingResponse.data.bookings;
                } else if (Array.isArray(bookingResponse.data)) {
                    fetchedBookings = bookingResponse.data;
                }
                setBookings(fetchedBookings);
            } catch (err: any) {
                const status = err.response?.status;
                let errorMessage = err.response?.data?.message || err.message || 'Failed to fetch bookings';
                if (status === 401) {
                    errorMessage = 'Unauthorized. Please log in again.';
                } else if (status === 403) {
                    errorMessage = 'Access denied. You do not have permission to view bookings.';
                }
                console.error('Error:', err.response?.data || err.message);
                setError(errorMessage);
                toast.error(errorMessage, {
                    position: 'top-right',
                    autoClose: 5000,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Open modal for cancellation
    const openCancelModal = (bookingId: string) => {
        setSelectedBookingId(bookingId);
        setModalOpen(true);
    };

    // Close cancellation modal
    const closeModal = () => {
        setModalOpen(false);
        setSelectedBookingId(null);
    };

    // Handle booking cancellation
    const handleCancelBooking = async () => {
        if (!selectedBookingId) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/api/v1/cancel/${selectedBookingId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBookings(bookings.filter((booking) => booking._id !== selectedBookingId));
            toast.success('Booking cancelled successfully!');
            closeModal();
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to cancel booking';
            toast.error(errorMessage);
            closeModal();
        }
    };

    // Handle booking payment
    const handleBookingPayment = async (bookingId: string) => {
        if (!khaltiReady) {
            toast.error('Payment system is not ready. Please try again later.');
            return;
        }

        try {
            const booking = bookings.find((b) => b._id === bookingId);
            if (!booking) throw new Error('Booking not found');
            if (!booking.vehicle?.name) throw new Error('Invalid vehicle name');
            if (!booking.totalPrice || booking.totalPrice <= 0) throw new Error('Invalid total price');

            const amountInPaisa = Math.round(booking.totalPrice * 100); // Ensure integer
            console.log('Initiating payment:', {
                bookingId,
                amountInPaisa,
                productIdentity: booking._id,
                productName: booking.vehicle.name,
            }); // Debug

            const config = generateKhaltiConfig({
                identity: booking._id,
                productName: booking.vehicle.name,
                amount: amountInPaisa,
            });

            // Validate configuration
            if (!config.publicKey) throw new Error('Invalid Khalti public key');
            if (!config.productIdentity || !config.productName || !config.amount) {
                throw new Error('Invalid Khalti configuration');
            }

            // Customize eventHandler
            config.eventHandler = {
                onSuccess: async (payload: any) => {
                    try {
                        console.log('Payment payload:', payload); // Debug
                        // Notify backend
                        const response = await axios.post(
                            `http://localhost:3000/api/v1/checkout/${bookingId}`,
                            {
                                status: 'completed',
                                paymentMethod: 'online',
                                transactionId: payload.idx,
                            },
                            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
                        );
                        console.log('Backend response:', response.data); // Debug
                        toast.success('Payment confirmed successfully!');
                        setBookings((prev) =>
                            prev.map((b) =>
                                b._id === bookingId ? { ...b, status: 'confirmed' } : b
                            )
                        );
                    } catch (err: any) {
                        const errorMsg = err.response?.data?.message || 'Failed to confirm payment with server';
                        toast.error(errorMsg);
                        console.error('Payment confirmation error:', err.response?.data || err.message);
                    }
                },
                onError: (error: any) => {
                    const errorMsg =
                        error?.payload?.detail ||
                        error?.payload?.public_key?.[0] ||
                        error?.message ||
                        'Payment initiation failed';
                    toast.error(errorMsg);
                    console.error('Payment error details:', error);
                },
                onClose: () => {
                    console.log('Khalti payment widget closed');
                },
            };

            console.log('Khalti checkout config:', {
                publicKey: config.publicKey.slice(0, 15) + '...',
                productIdentity: config.productIdentity,
                productName: config.productName,
                amount: config.amount,
            }); // Debug

            const checkout = new window.KhaltiCheckout(config);
            checkout.show({ amount: amountInPaisa });
        } catch (err: any) {
            toast.error(err.message || 'Failed to initiate payment');
            console.error('Payment initiation error:', err);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <ToastContainer />
            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Bookings</h2>
                    {error && (
                        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}
                    {bookings.length === 0 ? (
                        <p className="text-gray-600 text-center py-8">You have no bookings yet.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Vehicle
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Seats
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Booking Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Trip Dates
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {bookings.map((booking) => {
                                        const isReadOnly = ['completed', 'cancelled'].includes(booking.status.toLowerCase());
                                        return (
                                            <tr key={booking._id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {booking.vehicle?.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {booking.vehicle?.category}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {booking.vehicle?.seat}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(booking.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(booking.startDate).toLocaleDateString()} -{' '}
                                                    {new Date(booking.endDate).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    ${booking.totalPrice}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <span
                                                        className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${booking.status === 'pending'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : booking.status === 'confirmed'
                                                                ? 'bg-green-100 text-green-800'
                                                                : booking.status === 'completed'
                                                                    ? 'bg-blue-100 text-blue-800'
                                                                    : 'bg-red-100 text-red-800'
                                                            }`}
                                                    >
                                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    {!isReadOnly && booking.status === 'pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleBookingPayment(booking._id)}
                                                                className="text-blue-600 hover:text-blue-800 mr-4"
                                                                disabled={!khaltiReady}
                                                                title={khaltiReady ? 'Initiate payment' : 'Payment system loading'}
                                                            >
                                                                Pay Now
                                                            </button>
                                                            <button
                                                                onClick={() => openCancelModal(booking._id)}
                                                                className="text-red-600 hover:text-red-800"
                                                                title="Cancel booking"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal for Confirming Cancellation */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Cancellation</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to cancel this booking?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleCancelBooking}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingDashboard;