import React from "react";

const Navbar = ({ name }) => {
  return (
    <>
    <div className="bg-transparent sticky top-0 backdrop-blur-[1.5px]  z-9999 text-gray-200 shadow-md">
      <div className=" mx-auto px-3 py-2 flex justify-between items-center">
        {/* Logo / Brand */}
        {/* <div className="text-xl font-bold text-white">{name}</div> */}

        {/* Menu */}
        <div className="flex justify-between items-center w-full">
          <div className="text-2xl font-sans ">{name}</div>
          <div>
          <ul className="flex gap-8">
            <li className="relative group cursor-pointer px-3 font-sans  py-2 text-xl text-gray-200 font-medium transition-all duration-300 hover:text-white">
              Home
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded"></span>
            </li>

            <li className="relative group cursor-pointer px-3 font-sans  py-2 text-xl text-gray-200 font-medium transition-all duration-300 hover:text-white">
              About Me
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded"></span>
            </li>

            <li className="relative group cursor-pointer px-3 font-sans  py-2 text-xl text-gray-200 font-medium transition-all duration-300 hover:text-white">
              Skills
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded"></span>
            </li>

            <li className="relative group cursor-pointer px-3 font-sans  py-2 text-xl text-gray-200 font-medium transition-all duration-300 hover:text-white">
              Projects
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded"></span>
            </li>

            <li className="relative group cursor-pointer px-3 py-2 font-sans  text-xl text-gray-200 font-medium transition-all duration-300 hover:text-white">
              Experience
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded"></span>
            </li>

            <li className="relative group cursor-pointer px-3 py-2 font-sans  text-xl text-gray-200 font-medium transition-all duration-300 hover:text-white">
              Contact Me
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded"></span>
            </li>
          </ul>
        </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Navbar;
