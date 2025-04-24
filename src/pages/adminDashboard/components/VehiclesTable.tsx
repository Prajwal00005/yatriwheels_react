import React, { useEffect, useState } from 'react';
import DeleteModel from '../Dialog/DeleteModel';
import { toast } from 'react-toastify';
import { deleteVehicle, vehicleFetch } from '../API/UserAPi';

interface Vehicle {
    _id: string;
    name: string;
    createdBy: {
        _id: string,
        name: String,
    };
    types: string;
    price: string;
}

const VehiclesTable: React.FC = () => {
    const [openModel, setOpenModel] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<string | undefined>(undefined);
    const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const ondeleteVehicle = async (id: string) => {
        try {
            setIsDeleting(true);
            await deleteVehicle(id);

            const updatedVehicles = vehicleList.filter((vehicle) => vehicle._id !== id);
            setVehicleList(updatedVehicles);
            setIsDeleting(false);
            setOpenModel(false)

        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const vehicles = await vehicleFetch();
                setVehicleList(vehicles);
                setIsLoading(false);
            } catch (e) {
                setIsLoading(false);
                toast.error('Error fetching vehicles');
            }
        };

        fetchData();
    }, []);


    // Filter vehicles based on search term
    const filteredVehicles = vehicleList.filter(vehicle => {
        const searchLower = searchTerm.toLowerCase();
        const nameMatch = vehicle.name?.toLowerCase()?.includes(searchLower) || false;
        const typeMatch = vehicle.types?.toLowerCase()?.includes(searchLower) || false;

        return nameMatch || typeMatch;
    });

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredVehicles.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
    const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

    // Modal handlers
    const onOpenModel = (id: string) => {
        setSelectedIndex(id);
        setOpenModel(true);
    };

    const onCloseModel = () => {
        setOpenModel(false);
    };

    const onConfirmDelete = () => {
        setIsLoading(true);
        if (selectedIndex !== undefined) {
            const updatedVehicles = vehicleList.filter(vehicle => vehicle._id !== selectedIndex);
            setVehicleList(updatedVehicles);
            onCloseModel();
            if (currentItems.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
        }
        setIsLoading(false);
    };



    return (
        <div className="container mx-auto px-4 py-8">
            {/* Search Bar - unchanged */}
            <div className="mb-8">
                {/* ... existing search bar code ... */}
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentItems.map((vehicle, index) => (
                                <tr key={vehicle._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {vehicle.createdBy.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${vehicle.types === 'SUV' ? 'bg-green-100 text-green-800' :
                                                vehicle.types === 'Truck' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-purple-100 text-purple-800'}`}>
                                            {vehicle.types}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            className="mr-2 text-blue-600 hover:text-blue-900"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => { onOpenModel(vehicle._id), setSelectedIndex(vehicle._id) }}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination - unchanged */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    {/* ... existing pagination code ... */}
                </div>
            </div>

            {/* Delete Confirmation Modal - unchanged */}
            {openModel && (
                <DeleteModel
                    onClose={onCloseModel}
                    onConfirm={() => ondeleteVehicle(selectedIndex!)}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
};

export default VehiclesTable;