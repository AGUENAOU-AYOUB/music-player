import HarmonyLogo from "../assets/HarmonyLogo.png";
import { Link } from "react-router-dom";
function SideBar() {
  const image = HarmonyLogo;
  return (
    <div className="w-full h-full bg-[#ffffffc9] backdrop-blur-lg flex flex-row  md:flex-col md:justify-between md:items-center justify-between items-center rounded-lg px-1 md:py-2 font-poppins">
      <div className="w-[105px] h-[33px] md:w-[205px] md:h-[65px] mt-2">
        <img src={image} className="w-full h-full object-fill object-center" />
      </div>
      <div className="w-[300px] h-full md:w-full md:h-[550px] flex flex-row  md:flex-col md:justify-center md:items-center justify-center items-center md:my-3 md:px-2 ">
        <ul className="w-full h-full flex flex-row justify-end items-center  md:flex-col md:gap-2 md:items-center md:justify-start text-[18px]">
          <li className="w-full h-[50px] flex items-center justify-center md:rounded-2xl md:hover:bg-[#ffffffc2] transition-all duration-500 ease-in-out hover:shadow-sm md:px-2 md:py-1">
            <Link to="/" className="text-xl md:text-3xl flex flex-row w-full justify-end md:justify-start items-center ">
              <i className="fa-regular fa-house"></i>
              <span className="ml-2 hidden md:inline text-[20px]">Home</span>
            </Link>
          </li>

          <li className="w-20 md:w-full h-[50px]  flex items-center justify-center md:rounded-2xl md:hover:bg-[#ffffffc2] transition-all duration-500 ease-in-out hover:shadow-sm md:px-2 md:py-1">
            <Link to="/favorites" className="text-xl md:text-3xl flex flex-row w-full justify-end md:justify-start items-center">
              <i className="fa-regular fa-heart"></i>
              <span className="ml-2 hidden md:inline text-[20px]">
                Favorites
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-20 md:w-full md:h-[50px] flex flex-row  md:flex-col md:justify-center md:items-center justify-center items-center md:mb-2">
        <li className="w-full h-full flex items-center justify-center md:rounded-2xl md:hover:bg-[#ffffffc2] transition-all duration-500 ease-in-out hover:shadow-sm md:px-2 md:py-1">
          <Link to="/profile" className="text-xl md:text-3xl flex flex-row w-full justify-end md:justify-start items-center ">
            <i className="fa-regular fa-user"></i>
            <span className="ml-3 hidden md:inline text-[20px]">Profile</span>
          </Link>
        </li>
      </div>
    </div>
  );
}


function PlayingNow() {
  return <div className="bg-blue-400 w-full h-full"></div>;
}

export { SideBar, PlayingNow };
