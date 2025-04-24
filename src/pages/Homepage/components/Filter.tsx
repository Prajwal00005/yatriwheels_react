const Filter = () => {
    return (
      <div className="w-1/3">
        {/* Container for the filter panel */}
        <div className="w-full bg-white  p-5 flex flex-col items-center rounded-lg shadow-lg">
  
          {/* Search bar */}
          <div className="w-full mb-6">
            <input
              type="search"
              placeholder="Search..."
              className="p-3 bg-white border-none h-10 w-full rounded-xl placeholder:text-gray-600 shadow-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          {/* Divider */}
          <div className="border-b w-[90%] mx-auto my-3"></div>
  
          {/* Car Type Filter */}
          <div className="w-full space-y-4">
            <div><h1 className="text-lg font-bold text-black text-center mb-3">Car Type</h1>
  
              {/* Checkboxes for car types */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="convertible"
                    name="convertible"
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="convertible" className="ml-2 text-gray-600">Convertible Car</label>
                </div>
  
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="electric"
                    name="electric"
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="electric" className="ml-2 text-gray-600">Electric Car</label>
                </div>
  
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="luxury"
                    name="luxury"
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="luxury" className="ml-2 text-gray-600">Luxury Car</label>
                </div>
  
  
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="sport"
                    name="sport"
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="sport" className="ml-2 text-gray-600">Sport Car</label>
                </div>
  
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="compatible"
                    name="compatible"
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="compatible" className="ml-2 text-gray-600">Compatible Type</label>
                </div>
  
              </div>
            </div>
  
          </div>
          <div className="border-b w-[90%] mx-auto mt-7 mb-6"></div>
  
          <div className="flex w-full mb-5 gap-1">
            <div className="w-1/2">
              <input
                type="number"
                placeholder="Minimum Price"
                id="minimum"
                className="p-2 w-full bg-white border-none h-10 rounded-xl placeholder:text-gray-500 placeholder:font-semibold shadow-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-1/2">
              <input
                type="number"
                placeholder="Maximum Price"
                id="maximum"
                className="p-2 w-full bg-white border-none h-10 rounded-xl placeholder:text-gray-500 placeholder:font-semibold  shadow-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
  
  
          <div className="flex space-x-5 text-primary">
            <button
              className="bg-secondary px-3 py-1 rounded-lg text-white"
            >
              Search
            </button>
  
          </div>
        </div>
      </div>
    );
  };
  
  export default Filter;
  