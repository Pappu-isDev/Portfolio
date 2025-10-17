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
                <a href="#intro">

                  <li className="relative group cursor-pointer px-1 font-sans  py-2 text-xl text-gray-200 font-medium transition-all duration-300 hover:text-white hover:scale-105 hover:shadow-blue-500/50
                          hover:-translate-y-2 hover:shadow-none">
                    Home
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded "></span>
                  </li>
                </a>
                <a href="#about">
                  <li className="relative group cursor-pointer px-1 font-sans  py-2 text-xl text-gray-200 font-medium transition-all duration-300 hover:text-white  hover:scale-105 hover:shadow-blue-500/50
                          hover:-translate-y-2 hover:shadow-none">
                    About Me
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded"></span>
                  </li></a>
                <a href="#skills">
                  <li className="relative group cursor-pointer px-1 font-sans  py-2 text-xl text-gray-200 font-medium transition-all duration-300 hover:text-white  hover:scale-105 hover:shadow-blue-500/50
                          hover:-translate-y-2 hover:shadow-none">
                    Skills
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded"></span>
                  </li></a>
                <a href="#projects">
                  <li className="relative group cursor-pointer px-1 font-sans  py-2 text-xl text-gray-200 font-medium transition-all duration-300 hover:text-white  hover:scale-105 hover:shadow-blue-500/50
                          hover:-translate-y-2 hover:shadow-none">
                    Projects
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded"></span>
                  </li></a>
                <a href="#experience">
                  <li className="relative group cursor-pointer px-1 py-2 font-sans  text-xl text-gray-200 font-medium transition-all duration-300 hover:text-white  hover:scale-105 hover:shadow-blue-500/50
                          hover:-translate-y-2 hover:shadow-none">
                    Experience
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded"></span>
                  </li></a>
                <a href="#contact">
                  <li className="relative group cursor-pointer px-1 py-2 font-sans  text-xl text-gray-200 font-medium transition-all duration-300 hover:text-white  hover:scale-105 hover:shadow-blue-500/50
                          hover:-translate-y-2 hover:shadow-none">
                    Contact Me
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded"></span>
                  </li></a>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
