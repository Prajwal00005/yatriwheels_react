import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { addCategory, fetchVehicle, removeCategory, setPriceRange, setSearchTerm } from './slice/homepage_slice';
import { useState, useEffect } from 'react';

const Filter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchValue, selectedCategpryId, minPrice: reduxMinPrice, maxPrice: reduxMaxPrice, loading, error } = useSelector(
    (state: RootState) => state.vehicleStore
  );

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Initialize price inputs from URL or Redux on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const min = params.get('minPrice');
    const max = params.get('maxPrice');
    const newMin = min || (reduxMinPrice !== null ? reduxMinPrice.toString() : '');
    const newMax = max || (reduxMaxPrice !== null ? reduxMaxPrice.toString() : '');
    setMinPrice(newMin);
    setMaxPrice(newMax);
    console.log("🚀 Initial Price State:", { minPrice: newMin, maxPrice: newMax, reduxMinPrice, reduxMaxPrice });
    if (min || max) {
      const minValue = min ? parseFloat(min) : null;
      const maxValue = max ? parseFloat(max) : null;
      console.log("🚀 Dispatching Price Range from URL:", { minPrice: minValue, maxPrice: maxValue });
      dispatch(setPriceRange({ minPrice: minValue, maxPrice: maxValue }));
    }
  }, [dispatch, reduxMinPrice, reduxMaxPrice]);

  const handleSearchChange = (value: string) => {
    dispatch(setSearchTerm({ searchTerm: value }));
  };

  const handleCategoryChange = (value: string) => {
    const existingCategory = selectedCategpryId.find((category) => category === value);
    if (existingCategory) {
      dispatch(removeCategory({ category: value }));
    } else {
      dispatch(addCategory({ category: value }));
    }
  };

  const handleSubmit = () => {
    const min = minPrice ? parseFloat(minPrice) : null;
    const max = maxPrice ? parseFloat(maxPrice) : null;

    // Validate prices
    if (min !== null && min < 0) {
      alert('Minimum price cannot be negative');
      return;
    }
    if (max !== null && max < 0) {
      alert('Maximum price cannot be negative');
      return;
    }
    if (min !== null && max !== null && min > max) {
      alert('Minimum price cannot be greater than maximum price');
      return;
    }

    console.log("🚀 Submitting Price Range:", { minPrice: min, maxPrice: max });
    dispatch(setPriceRange({ minPrice: min, maxPrice: max }));

    // Update URL with price parameters
    const params = new URLSearchParams(window.location.search);
    if (minPrice) {
      params.set('minPrice', minPrice);
    } else {
      params.delete('minPrice');
    }
    if (maxPrice) {
      params.set('maxPrice', maxPrice);
    } else {
      params.delete('maxPrice');
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    console.log("🚀 Updated URL:", newUrl);
    window.history.pushState({}, '', newUrl);

    // Fetch vehicles
    dispatch(fetchVehicle());
  };

  const VehicleCategory = ["Comfortable", "Sport", "Luxuary", "Compatible"];

  return (
    <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Vehicle Filters</h3>

      {/* Search Bar */}
      <div className="w-full mb-6">
        <input
          onChange={(e) => handleSearchChange(e.target.value)}
          value={searchValue}
          type="search"
          placeholder="Search vehicles..."
          className="w-full p-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 transition-colors"
        />
      </div>

      {/* Car Type Filter */}
      <div className="w-full mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Car Type</h4>
        <div className="space-y-2">
          {VehicleCategory.map((category, index) => (
            <div className="flex items-center" key={index}>
              <input
                onChange={() => handleCategoryChange(category)}
                checked={selectedCategpryId.includes(category)}
                type="checkbox"
                id={`category-${index}`}
                className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor={`category-${index}`} className="ml-2 text-sm text-gray-600">{category}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="w-full">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Price Range ($)</h4>
        <div className="flex gap-2 mb-4">
          <input
            type="number"
            placeholder="Min Price ($)"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            min="0"
            className="flex-1 p-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
          />
          <input
            type="number"
            placeholder="Max Price ($)"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            min="0"
            className="flex-1 p-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:bg-blue-300"
        >
          {loading ? 'Loading...' : 'Apply Filters'}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
      </div>
    </div>
  );
};

export default Filter;