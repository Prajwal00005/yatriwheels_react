// import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';

// // Vehicle Interface
// interface Vehicle {
//     id: number;
//     name: string;
//     owner: string;
//     type: string;
//     price: string;
//     status: string;
// }

// // API Fetch Function
// const vehicleFetch = async () => {
//     try {
//         const response = await fetch('http://localhost:3000/api/v1/my-bookings');
//         if (!response.ok) {
//             throw new Error('Failed to fetch bookings');
//         }
//         const data = await response.json();
//         // Transform API data to match Vehicle interface
//         return data.map((item, index) => ({
//             id: index + 1, // Use index as ID since _id is a string; adjust if needed
//             name: item.vehicle.name,
//             owner: item.user.name,
//             type: item.vehicle.types,
//             price: `$${item.totalPrice}`, // Use totalPrice for booking cost
//             status: item.status,
//         }));
//     } catch (error) {
//         throw error;
//     }
// };

// // VehiclesTable Component
// const VehiclesTable = () => {
//     const [vehicleList, setVehicleList] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 5;

//     // Fetch vehicles
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setIsLoading(true);
//                 const vehicles = await vehicleFetch();
//                 setVehicleList(vehicles);
//                 setIsLoading(false);
//             } catch (e) {
//                 setIsLoading(false);
//                 toast.error('Error fetching bookings');
//             }
//         };

//         fetchData();
//     }, []);

//     // Filter vehicles based on search term
//     const filteredVehicles = vehicleList.filter((vehicle) =>
//         vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         vehicle.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         vehicle.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         vehicle.type.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     // Pagination logic
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = filteredVehicles.slice(indexOfFirstItem, indexOfLastItem);
//     const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);
//     const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
//     const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

//     if (isLoading) {
//         return <div className="text-center py-8 text-gray-600">Loading...</div>;
//     }

//     return (
//         <div className="container mx-auto px-4 py-8">
//             {/* Search Bar */}
//             <div className="mb-8">
//                 <div className="relative w-full max-w-2xl mx-auto">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <svg
//                             className="h-5 w-5 text-gray-400"
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                         >
//                             <path
//                                 fillRule="evenodd"
//                                 d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
//                                 clipRule="evenodd"
//                             />
//                         </svg>
//                     </div>
//                     <input
//                         type="text"
//                         value={searchTerm}
//                         onChange={(e) => {
//                             setSearchTerm(e.target.value);
//                             setCurrentPage(1);
//                         }}
//                         placeholder="Search bookings by name, owner, type, or status..."
//                         className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-gray-700 placeholder-gray-400"
//                     />
//                     {searchTerm && (
//                         <button
//                             onClick={() => {
//                                 setSearchTerm('');
//                                 setCurrentPage(1);
//                             }}
//                             className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                         >
//                             <svg
//                                 className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 viewBox="0 0 20 20"
//                                 fill="currentColor"
//                             >
//                                 <path
//                                     fillRule="evenodd"
//                                     d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                                     clipRule="evenodd"
//                                 />
//                             </svg>
//                         </button>
//                     )}
//                 </div>
//             </div>

//             {/* Table */}
//             <div className="bg-white rounded-lg shadow overflow-hidden">
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     <span className="inline-flex items-center">
//                                         Status
//                                         <svg
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             className="ml-1 h-4 w-4"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                         >
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                                         </svg>
//                                     </span>
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {currentItems.map((vehicle) => (
//                                 <tr key={vehicle.id} className="hover:bg-gray-50 transition-colors">
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vehicle.id}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.name}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.owner}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                         <span
//                                             className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${vehicle.type === 'Petrolium'
//                                                     ? 'bg-green-100 text-green-800'
//                                                     : vehicle.type === 'Electric'
//                                                         ? 'bg-blue-100 text-blue-800'
//                                                         : 'bg-purple-100 text-purple-800'
//                                                 }`}
//                                         >
//                                             {vehicle.type}
//                                         </span>
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vehicle.price}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                         <span
//                                             className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${vehicle.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
//                                                 }`}
//                                         >
//                                             {vehicle.status}
//                                         </span>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Pagination */}
//                 <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
//                     <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//                         <div>
//                             <p className="text-sm text-gray-700">
//                                 Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
//                                 <span className="font-medium">{Math.min(indexOfLastItem, filteredVehicles.length)}</span> of{' '}
//                                 <span className="font-medium">{filteredVehicles.length}</span> results
//                             </p>
//                         </div>
//                         <div>
//                             <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
//                                 <button
//                                     onClick={prevPage}
//                                     disabled={currentPage === 1}
//                                     className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
//                                         }`}
//                                 >
//                                     <span className="sr-only">Previous</span>
//                                     <svg
//                                         className="h-5 w-5"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 20 20"
//                                         fill="currentColor"
//                                         aria-hidden="true"
//                                     >
//                                         <path
//                                             fillRule="evenodd"
//                                             d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
//                                             clipRule="evenodd"
//                                         />
//                                     </svg>
//                                 </button>
//                                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
//                                     <button
//                                         key={number}
//                                         onClick={() => paginate(number)}
//                                         className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === number
//                                                 ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
//                                                 : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
//                                             }`}
//                                     >
//                                         {number}
//                                     </button>
//                                 ))}
//                                 <button
//                                     onClick={nextPage}
//                                     disabled={currentPage === totalPages}
//                                     className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
//                                         }`}
//                                 >
//                                     <span className="sr-only">Next</span>
//                                     <svg
//                                         className="h-5 w-5"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 20 20"
//                                         fill="currentColor"
//                                         aria-hidden="true"
//                                     >
//                                         <path
//                                             fillRule="evenodd"
//                                             d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                                             clipRule="evenodd"
//                                         />
//                                     </svg>
//                                 </button>
//                             </nav>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default VehiclesTable;