import React from 'react';

const PageHeader: React.FC = () => {
    return (
        <div className="page-header flex justify-between items-center p-4">
            <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <small className="text-gray-500">Monitor key metrics. Check reporting and review insights.</small>
            </div>
            <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    <span className="las la-file-export"></span> Export
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                    <span className="las la-tools"></span> Setting
                </button>
            </div>
        </div>
    );
};

export default PageHeader;