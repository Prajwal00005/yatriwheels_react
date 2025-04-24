import React, { useEffect, useState } from 'react';
import DeleteModel from '../Dialog/DeleteModel';
import { deleteUser, userFetch } from '../API/UserAPi';
import { toast } from 'react-toastify';
import { User } from '../../../modules/auth/types/Login_type';



const UsersTable: React.FC = () => {



  // Sample data


  const [searchTerm, setSearchTerm] = useState('');
  const [openModel, setOpenModel] = useState(false);
  const [Selectedid, setSelectedId] = useState<string | undefined>(undefined);
  const [Users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);


  const getUser = async () => {
    try {
      setIsLoading(true);
      const response = await userFetch();
      console.log(response)
      setUsers(response)
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      toast.error("Fetching error")
    }
  }


  const deleteTheUser = async (id: string) => {
    try {
      setIsDeleting(true);
      await deleteUser(id);

      const UpdatedUser = Users.filter((user) => user._id !== id);
      setUsers(UpdatedUser);
      setIsDeleting(false);
      setOpenModel(false)
    } catch (e) {
      setIsDeleting(false);
      console.log(e)
      toast.error("Fetching error")
    }
  }

  useEffect(() => {

    getUser();
  }, [])



  const onOpenModel = (id: string) => {
    // setSelectedIndex(id);
    setOpenModel(true);
  };

  const onCloseModel = () => {
    setOpenModel(false);
  };

  const filteredUsers = Users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id: number) => {
    alert(`Editing user with ID: ${id}`);
  };




  if (isLoading) {
    <div className='font-bold text-2xl text-center text-blue-400'>Data is fetching....</div>

  } else {
    return (
      <div className="container mx-auto px-4 py-6">
        {/* Search and Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Search by name or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors shadow-sm">
            Add New User
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Users.map((user, index) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.roles.includes('ADMIN') ? 'bg-purple-100 text-purple-800' :
                        user.roles.includes("MERCHANT") ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                        {(user.roles[0])}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">

                      <button
                        onClick={() => {
                          setSelectedId(user._id)
                          return onOpenModel(user._id);
                        }}
                        className="text-red-600 hover:text-red-900 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {openModel && <DeleteModel onConfirm={() => deleteTheUser(Selectedid!)} onClose={onCloseModel} isLoading={isDeleting} />}
      </div>
    );
  }
};

export default UsersTable;