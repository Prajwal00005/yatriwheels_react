import bmw_vehicles from "../../../assets//BmwPic.png";
import suvPic from "../../../assets/SuvPic.png"
const AboutUs = () => {
    return (
        <section id="features" className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 fade-in text-primary">Why Choose YatriWheels?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md slide-in-left">
                        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                        <p className="text-gray-600">
                            Our customer service team is available around the clock to assist you with any issues or questions.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md fade-in">
                        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                ></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Fully Insured</h3>
                        <p className="text-gray-600">
                            All our vehicles come with comprehensive insurance coverage for your peace of mind.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md slide-in-right">
                        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                ></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No Hidden Fees</h3>
                        <p className="text-gray-600">
                            Transparent pricing with no surprise charges. What you see is what you pay.
                        </p>
                    </div>
                </div>
            </div>
            <CarAbout />
            <CarAbout2 />
        </section>
    );
};

const CarAbout: React.FC = () => {
    return (
        <>
            <div  className=" h-auto w-full flex mt-10 p-4 gap-4">
                <div className="flex-1  p-4 space-y-3"><p className="text-sm text-gray-500 ">Experience the Freedom, Embrace the Exceptional</p>
                    <h1 className="font-extrabold text-4xl tracking-wide text-primary">Unleash your journey: <span className="text-nowrap"> The YatriWheels Advantage</span></h1>
                    <p className="text-sm text-gray-500 w-[80%] my-7">Immerse yourself in a world of possibilities with our extensive range of vehicles. From sleek sedans to rugged SUVs and luxurious convertibles, we have the perfect wheels to match your style, preferences, and the demands of your adventure.
                        Explore the posibilites</p>
                        <button className="px-3 py-2 bg-secondary text-white font-bold rounded-lg">Explore the Possibilities</button>
                </div>
                <div className="p-4"><img className="w-full h-full scale-80" src={suvPic} alt="" /></div>
            </div>
        </>
    )
}
const CarAbout2: React.FC = () => {
    return (
        <>
            <div className=" h-auto w-full flex flex-row-reverse  p-4 gap-4">
                <div className="flex-1  p-4 space-y-3"><p className="text-sm text-gray-500 ">Experience the Freedom, Embrace the Exceptional</p>
                    <h1 className="font-extrabold text-4xl tracking-wide text-primary">Beyond Rentals, Building Memories</h1>
                    <p className="text-sm text-gray-500 w-[80%] my-7">We are more than just a car rental service. We strive to be your travel companion, providing recommendations, tips, and local insights to help you create unforgettable memories. Count on us to make your journey not only comfortable but also enriching and unforgettable.</p>
                        <button className="px-3 py-2 bg-secondary text-white font-bold rounded-lg">Book Your Car Today</button>
                </div>
                <div className="p-4"><img className="w-full h-full scale-70" src={bmw_vehicles} alt="" /></div>
            </div>
        </>
    )
}

export default AboutUs;