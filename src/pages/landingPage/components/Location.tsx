import map from "../../../assets/map.png"
const Location = () => {
    return (
        <div id="location" className=" h-auto w-full flex p-4 gap-4">
            <div className="flex-1  p-4 space-y-3"><p className="text-sm text-gray-500 ">Experience the Freedom, Embrace the Exceptional</p>
                <h1 className="font-extrabold text-4xl tracking-wide text-primary">Global Reach, Local Presence: Discover Our 120+ Car Rental Locations Worldwide</h1>
                <p className="text-sm text-gray-500 w-[80%] my-7">At Drivewise, we believe in making car rental convenient and accessible wherever your travels take you. With over 120 locations spread across the globe, we are proud to offer our services in some of the most vibrant cities, popular tourist destinations, and major transportation hubs.</p>
                <button className="px-3 py-2 bg-secondary text-white font-bold rounded-lg">Find your nearest location</button>
            </div>
            <div className="p-4"><img className="w-full h-full scale-100" src={map} alt="" /></div>
        </div>

    )
}

export default Location
