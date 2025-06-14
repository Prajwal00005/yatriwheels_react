
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
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  if (!vehicle) return null;

  return (
    <Link
      to={`/vehicle/${vehicle._id}`}
      className="block group transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="w-full sm:w-60 h-80 bg-gray-50 rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300 flex flex-col">
        {/* Image with gradient overlay and price badge */}
        <div className="relative h-36 overflow-hidden">
          <img
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={`${ASSETS_URL}/${vehicle.imageURL}`}
            alt={vehicle.name}
            onError={(e) => (e.currentTarget.src = '/fallback-image.jpg')}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            ${vehicle.price}/day
          </span>
        </div>

        {/* Card content */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-base font-semibold text-gray-800 truncate mb-2">{vehicle.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-3 mb-3">{vehicle.description}</p>

          {/* Tags */}
          <div className="mt-auto">
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className="bg-blue-100 text-blue-600 text-xs font-medium px-1.5 py-0.5 rounded-full">{vehicle.category}</span>
              <span className="bg-green-100 text-green-600 text-xs font-medium px-1.5 py-0.5 rounded-full">{vehicle.types}</span>
              <span className="bg-purple-100 text-purple-600 text-xs font-medium px-1.5 py-0.5 rounded-full">{vehicle.seat} Seats</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center text-gray-500">
                <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="truncate">{vehicle.location}</span>
              </div>
              <button className="text-blue-500 font-medium hover:text-blue-600 underline transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VehicleCard;