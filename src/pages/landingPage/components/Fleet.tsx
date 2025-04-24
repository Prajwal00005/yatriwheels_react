import bmw from "../../../assets/BmwPic.png";
import suv from "../../../assets/SuvPic.png";
import car from "../../../assets/HeroPic@2x.png"


const Fleet = () => {
  return (
    <div>
      <section id="fleet" className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 fade-in text-primary">Our Premium Fleet</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md fade-in">
                        <img
                            src={suv}
                            alt="Luxury Sedan"
                            className="w-full h-48 object-cover "
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">Luxury Sedans</h3>
                            <p className="text-gray-600 mb-4">
                                Experience ultimate comfort with our range of luxury sedans, perfect for business trips or special occasions.
                            </p>
                            <div className="flex justify-between items-center">
                                <span className="text-primary font-bold">From $89/day</span>
                                <button className="px-4 py-2 bg-secondary text-white rounded hover:bg-blue-700 transition-colors">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md fade-in">
                        <img
                            src={car}
                            alt="SUV"
                            className="w-full  object-cover scale-80"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">Premium SUVs</h3>
                            <p className="text-gray-600 mb-4">
                                Spacious and versatile SUVs ideal for family trips, outdoor adventures, or navigating rough terrain.
                            </p>
                            <div className="flex justify-between items-center">
                                <span className="text-primary font-bold">From $109/day</span>
                                <button className="px-4 py-2 bg-secondary text-white rounded hover:bg-blue-700 transition-colors">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md fade-in">
                        <img
                            src={bmw}
                            alt="Sports Car"
                            className="w-full h-48 object-cover scale-80"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">Sports Cars</h3>
                            <p className="text-gray-600 mb-4">
                                Feel the thrill of driving our high-performance sports cars, designed for those who appreciate speed and style.
                            </p>
                            <div className="flex justify-between items-center">
                                <span className="text-primary font-bold">From $149/day</span>
                                <button className="px-4 py-2 bg-secondary text-white rounded hover:bg-blue-700 transition-colors">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-10">
                    <button className="px-6 py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-primary transition-colors">
                        View All Vehicles
                    </button>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Fleet
