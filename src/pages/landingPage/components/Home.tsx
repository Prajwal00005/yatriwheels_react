import HeroPic from "../../../assets/HeroPic.png";
import carbrand from "../../../assets/Car Brands Section.png";
const Home = () => {
    return (
        <>
            <div className="flex items-center  p-4 mt-20 ">
                <div className=" flex-2/3 flex flex-col gap-4">
                    <h1 className=" font-black text-5xl tracking-wider text-primary leading-13">Explore the freedom of car rental with <span className=" text-secondary">YatriWheels</span>.</h1>
                    <p className="w-[70%] text-primary">Whether you're planning a road trip, need a reliable vehicle for a business trip, or just want the convenience of having a car at your disposal, we've got you covered.</p>
                    <div><button className="px-2 bg-secondary text-white py-2 rounded-lg">Get your car today </button>
                        <button className=" px-3 py-1 self-start text-primary underline cursor-pointer">See all Cars </button></div>
                </div>
                <div className="relative">
                    <img className="scale-90 z-40 relative" src={HeroPic} alt="" />
                    <div className=" absolute top-20 -right-20 h-60 w-80 bg-linear-to-l from-secondary to-white-500 z-10"></div>
                </div>
            </div>
            <div><img className="w-full h-15 mt-4" src={carbrand} alt="" /></div>
            <div className="w-1/2 h-25 my-7 bg-secondary flex justify-around   items-center rounded-tr-4xl">
                <Detail number="450+" title="Cars" />
                <Detail number="90+" title="Sales Exports" />
                <Detail number="45+" title="Pickup Location" />
                <Detail number="4650+" title="Happy Customer" />
            </div>
        </>
    )
}
// Define the types for the props using an interface
interface DetailProps {
    number: string;
    title: string;
}

// Functional component with props typed
function Detail({ number, title }: DetailProps) {
    return (
        <>
            <div className="">
                <div className="text-white font-extrabold text-2xl">{number}</div>
                <p className="text-white">{title}</p>
            </div>
        </>
    );
}


export default Home
