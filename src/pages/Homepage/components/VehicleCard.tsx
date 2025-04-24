import { Link } from 'react-router-dom';
import { ASSETS_URL } from '../../../constants.ts';

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

interface VehicleCardProps {
  vehicle: Vehicle; // ✅ expects a single prop called 'vehicle'
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  if (!vehicle) return null;

  return (
    <Link to={`/vehicle/${vehicle._id}`} className="block hover:scale-105 transition-transform">
      <div className="w-[280px] h-[310px] bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg overflow-hidden">
        <img
          className="w-full h-1/3 object-cover"
          src={`${ASSETS_URL}/${vehicle.imageURL} `}
          alt={vehicle.name}
        />
        <div className="p-5 space-y-3">
          <h5 className="text-xl font-semibold text-gray-900">{vehicle.name}</h5>
          <p className="text-sm text-gray-600 line-clamp-2">{vehicle.description.substring(0, 10) + "...see more"}</p>
          <div className="flex flex-wrap gap-2 text-xs font-medium text-white">
            <span className="bg-blue-500 px-2 py-1 rounded">{vehicle.category}</span>
            <span className="bg-green-500 px-2 py-1 rounded">{vehicle.types}</span>
            <span className="bg-purple-500 px-2 py-1 rounded">{vehicle.seat} Seats</span>
          </div>
          <p className="text-sm text-gray-600">📍 {vehicle.location}</p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-lg font-bold text-gray-900">${vehicle.price}/day</span>
            <span className="bg-blue-600 text-white px-4 py-2 text-sm rounded-lg">
              View Details
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VehicleCard;
