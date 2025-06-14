import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ASSETS_URL } from '../../../constants';


interface Vehicle {
    _id: string;
    name: string;
    description: string;
    category: string;
    types: string;
    price: number;
    seat: number;
    location: string;
    numberPlate: string;
    createdBy: {
        _id: string;
        name: string;
    };
    imageURL: string;
    createdAt: string;
    updatedAt: string;
}

interface BookingFormInputs {
    startDate: string;
    endDate: string;
    pickupLocation: string;
}

const SingleCard: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<BookingFormInputs>();

    const watchStartDate = watch('startDate');
    const watchEndDate = watch('endDate');

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:3000/api/v1/vehicle/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setVehicle(response.data.data);
            } catch (error: any) {
                console.error("Error fetching vehicle:", error.response?.data || error.message);
            }
        };

        if (id) fetchVehicle();
    }, [id]);

    const calculateTotalPrice = () => {
        if (!watchStartDate || !watchEndDate || !vehicle) return vehicle?.price || 0;

        const start = new Date(watchStartDate);
        const end = new Date(watchEndDate);
        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
        return days > 0 ? vehicle.price * days : vehicle.price;
    };

    const onSubmit: SubmitHandler<BookingFormInputs> = async (data) => {
        setLoading(true);
        setError(null);

        const bookingData = {
            vehicle: id,
            startDate: new Date(data.startDate).toISOString(),
            endDate: new Date(data.endDate).toISOString(),
            pickupLocation: data.pickupLocation,
            totalPrice: calculateTotalPrice(),
            status: 'pending'
        };

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/api/v1/create-booking', bookingData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            toast.success('Booking successfully created!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            reset();
            setTimeout(() => navigate('/home'), 3000);
        } catch (error: any) {
            setError(error.response?.data?.message || 'Failed to create booking');
            console.error("Error creating booking:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!vehicle) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <ToastContainer />
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center mb-6 text-blue-600 hover:text-blue-800 transition-colors"
                >

                    Back to Vehicles
                </button>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/2 relative">
                            <img
                                src={`${ASSETS_URL}/${vehicle.imageURL}`}
                                alt={vehicle.name}
                                className="h-96 w-full object-cover md:h-full"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                <h2 className="text-3xl font-bold text-white">{vehicle.name}</h2>
                                <p className="text-blue-300 font-semibold mt-1">${vehicle.price}/day</p>
                            </div>
                        </div>

                        <div className="p-8 md:w-1/2">
                            <div className="flex flex-col h-full">
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Vehicle Details</h3>
                                    <p className="text-gray-600 leading-relaxed">{vehicle.description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-gray-500">Category</p>
                                        <p className="font-medium text-gray-900">{vehicle.category}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-gray-500">Type</p>
                                        <p className="font-medium text-gray-900">{vehicle.types}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-gray-500">Seats</p>
                                        <p className="font-medium text-gray-900">{vehicle.seat}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-gray-500">Location</p>
                                        <p className="font-medium text-gray-900">{vehicle.location}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-gray-500">Number Plate</p>
                                        <p className="font-medium text-gray-900">{vehicle.numberPlate}</p>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-gray-500">Owner</p>
                                        <p className="font-medium text-gray-900">{vehicle.createdBy.name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-gray-50 border-t">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Book This Vehicle</h3>
                        {error && (
                            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        min={new Date().toISOString().split('T')[0]}
                                        {...register('startDate', {
                                            required: 'Start date is required',
                                            validate: value => new Date(value) >= new Date(new Date().setHours(0, 0, 0, 0)) || 'Start date cannot be in the past'
                                        })}
                                        className={`mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.startDate ? 'border-red-500' : ''
                                            }`}
                                    />
                                    {errors.startDate && (
                                        <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                                        End Date
                                    </label>
                                    <input
                                        type="date"
                                        id="endDate"
                                        min={watchStartDate || new Date().toISOString().split('T')[0]}
                                        {...register('endDate', {
                                            required: 'End date is required',
                                            validate: value =>
                                                !watchStartDate || new Date(value) >= new Date(watchStartDate) ||
                                                'End date must be after start date'
                                        })}
                                        className={`mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.endDate ? 'border-red-500' : ''
                                            }`}
                                    />
                                    {errors.endDate && (
                                        <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
                                    )}
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-1">
                                        Pickup Location
                                    </label>
                                    <input
                                        type="text"
                                        id="pickupLocation"
                                        {...register('pickupLocation', { required: 'Pickup location is required' })}
                                        placeholder="Enter pickup location"
                                        className={`mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.pickupLocation ? 'border-red-500' : ''
                                            }`}
                                    />
                                    {errors.pickupLocation && (
                                        <p className="mt-1 text-sm text-red-600">{errors.pickupLocation.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="font-medium text-gray-700">Estimated Total</h4>
                                        <p className="text-sm text-gray-500">
                                            {watchStartDate && watchEndDate ? (
                                                `${Math.ceil(
                                                    (new Date(watchEndDate).getTime() - new Date(watchStartDate).getTime()) /
                                                    (1000 * 3600 * 24)
                                                )} day(s)`
                                            ) : 'Select dates to calculate'}
                                        </p>
                                    </div>
                                    <p className="text-2xl font-bold text-blue-600">
                                        ${calculateTotalPrice().toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-colors duration-200 ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                    } flex items-center justify-center`}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : 'Confirm Booking'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleCard;