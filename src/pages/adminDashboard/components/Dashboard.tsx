import React from 'react'

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Summary Section */}
      <div className="mb-8 bg-gray-50 p-4 rounded-md shadow">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-md shadow">
            <p className="text-sm font-medium text-gray-500">Total Stock Quantity</p>
            <p className="text-xl font-semibold text-gray-800">123</p>
          </div>
          <div className="p-4 bg-white rounded-md shadow">
            <p className="text-sm font-medium text-gray-500">Total Bookings Quantity</p>
            <p className="text-xl font-semibold text-gray-800">45</p>
          </div>
          <div className="p-4 bg-white rounded-md shadow">
            <p className="text-sm font-medium text-gray-500">Total Sales Price</p>
            <p className="text-xl font-semibold text-gray-800">$78,900</p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bookings Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sales Price
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Vehicle A</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$15,000</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Vehicle B</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">50</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$30,000</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Vehicle C</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">30</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">25</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$33,900</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
