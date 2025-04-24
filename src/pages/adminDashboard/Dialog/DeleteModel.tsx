import React from 'react';

interface VehiclesTableProps {
    onClose: () => void;
    onConfirm: () => void;
    isLoading: boolean;
}

const DeleteModel: React.FC<VehiclesTableProps> = ({ onClose, onConfirm, isLoading }) => {


    return (
        <>
            {/* Background Overlay */}
            <div className="fixed inset-0 bg-black/80  bg-opacity-50 z-50 flex justify-center items-center">
                {/* Modal Box */}
                <div className="relative bg-white p-6 rounded-lg shadow-lg w-80">
                    {/* Close Button */}
                    <div
                        className="absolute top-2 right-2 text-xl font-bold cursor-pointer text-gray-500"
                        onClick={onClose}
                    >
                        X
                    </div>
                    {/* Modal Content */}
                    <h1 className="text-center text-xl mb-4">Are you sure you want to delete?</h1>
                    <div className="flex justify-around space-x-4">
                        {/* Buttons */}
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
                            disabled={isLoading == true}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"

                        >
                            {isLoading ? "Loading....." : "Confirm"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeleteModel;
