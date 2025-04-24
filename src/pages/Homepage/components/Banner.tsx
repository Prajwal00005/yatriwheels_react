import banner from "../../../assets/banner.jpg";
import { useUser } from "../../../context/login_context";

const Banner = () => {
  const user = useUser();
  return (
    <div className="h-[45vh] p-2 pr-9">
      <div className="h-full w-full rounded-xl overflow-hidden relative">
        {/* Background Image */}
        <img
          className="object-cover w-full h-full"
          src={banner}
          alt="Banner"
        />
        {/* Overlay with Secondary Color and Blend Mode */}
        <div className="absolute top-0 left-0 bottom-0 right-0 w-full h-full bg-black/60  bg-opacity-50 bg-blend-overlay"></div>
        {/* Centered Text */}
        <div className="font-extrabold text-4xl absolute top-[50%] left-[50%] text-white shadow-2xl z-10 transform -translate-x-[50%] -translate-y-[50%]">
          Welcome {user?.name}
        </div>
      </div>
    </div>
  );
};

export default Banner;
