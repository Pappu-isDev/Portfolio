"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import React, { useState, useEffect } from "react";
import { ReactTyped } from "react-typed";

const Intro = () => {
  const myName = process.env.NEXT_PUBLIC_NAME;
  const pdf = process.env.NEXT_PUBLIC_PDF;

  const [showToast, setShowToast] = useState(false);
  const [showWelcomeToast, setShowWelcomeToast] = useState(false);
  const [showFlipToast, setShowFlipToast] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useGSAP(() => {
    gsap.fromTo(".info", { opacity: 0, x: 0 }, { opacity: 1, x: 50, duration: 1, ease: "power3.inOut", stagger: 0.3, duration: 3, delay: 1 });
    gsap.fromTo(".info2", { opacity: 0, x: 0 }, { opacity: 1, x: -50, duration: 1, ease: "power3.inOut", stagger: 0.3, duration: 3, delay: 1 });
  }, []);

  // Welcome toast on mount
  useEffect(() => {
    setShowWelcomeToast(true);
    const timer = setTimeout(() => { setShowWelcomeToast(false), 2000 }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    setIsDownloading(true);

    const link = document.createElement("a");
    link.href = `/${pdf}`;
    link.download = pdf;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
      setIsDownloading(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }, 800);
  };

  const handleCardHover = () => {
    setShowFlipToast(true);
    setTimeout(() => setShowFlipToast(false), 2000);
  };

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background video */}
        <video
          className="absolute top-0 left-0 opacity-90 w-full h-full object-cover"
          src="/bgVid.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Main Content */}
        <div className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 lg:px-8">
          {/* Left Content Section */}
          <div className="info w-full lg:w-1/2 flex flex-col justify-center items-start mt-8 lg:mt-0">
            <div className="w-full max-w-2xl p-2 lg:mt-14">
              <h1 className="text-white font-sans text-center lg:text-left">
                <span className="text-xl sm:text-2xl lg:text-2xl font-sans block lg:inline">Hello, I'm </span>
                <span className="text-3xl sm:text-4xl lg:text-4xl font-bold text-blue-400 block lg:inline mt-2 lg:mt-0 lg:ml-2">
                  {myName}
                </span>
                <span className="text-xl sm:text-2xl lg:text-3xl font-sans text-white block lg:inline lg:ml-3 mt-2 lg:mt-0">
                  <ReactTyped
                    strings={["Software Developer", "Full-Stack Developer", "Problem Solver"]}
                    typeSpeed={50}
                    backSpeed={40}
                    loop
                    cursorChar="|"
                  />
                </span>
              </h1>
            </div>

            <div className="w-full max-w-2xl font-sans text-lg sm:text-xl lg:text-2xl mt-4 lg:mt-6 text-center lg:text-left">
              <p className="text-white leading-relaxed">
                Full-Stack Software Developer specializing in React, Node.js, and AWS to build scalable, high-performance web applications.
              </p>
            </div>

            {/* Download Resume Button */}
            <div className="mt-6 lg:mt-8 w-full flex justify-center lg:justify-start">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className={`px-6 py-3 text-base sm:text-lg font-semibold rounded-md transition-all duration-300 shadow-md cursor-pointer ${
                  isDownloading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-400 hover:bg-blue-700 hover:scale-95 text-white"
                }`}
              >
                {isDownloading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      ></path>
                    </svg>
                    Downloading...
                  </div>
                ) : (
                  "Download CV"
                )}
              </button>
            </div>
          </div>

          {/* Right Card Section */}
          <div className="info2 w-full lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0 lg:mr-8">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              <div className="w-full h-full perspective">
                <div className="relative w-full h-full flex justify-center">
                  <div className="absolute inset-0 flex items-center justify-center border-b-amber-300 animate-spin">
                    <div className="w-48 sm:w-56 md:w-64 lg:w-72 h-96 sm:h-[28rem] md:h-[32rem] lg:h-[36rem]  rounded-2xl bg-gradient-to-r from-blue-500 via-purple-400 to-pink-500"></div>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-44 sm:w-52 md:w-60 lg:w-85 h-80 sm:h-96 md:h-[30rem] lg:h-[28rem] rounded-2xl bg-black"></div>
                  </div>

                  <div
                    className="relative w-44 sm:w-52 md:w-60 lg:w-85 h-80 sm:h-96 md:h-[30rem] lg:h-[28rem] transition-transform duration-500 transform-style preserve-3d hover:rotate-y-180 z-10"
                    onMouseEnter={handleCardHover}
                  >
                    {/* Front Side */}
                    <div className="absolute w-full h-full backface-hidden">
                      <img
                        src="/myImg.jpg"
                        alt="Itz Me"
                        className="object-cover w-full h-full rounded-2xl shadow-md"
                      />
                    </div>

                    {/* Back Side */}
                    <div className="absolute w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] bg-slate-800/60 backdrop-blur-sm flex flex-col justify-center items-center p-4 sm:p-6 rounded-2xl shadow-xl border-4 border-green-400/50">
                      <img
                        src="/myavtar.png"
                        alt="Avatar"
                        className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain rounded-full mb-3 sm:mb-4 ring-4 ring-green-400"
                      />
                      <h2 className="text-white text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-center">
                        Software Developer
                      </h2>
                      <p className="text-green-400 text-sm sm:text-md lg:text-lg mt-2 text-center">
                        I am a passionate technophile.
                      </p>
                      <div className="mt-4 sm:mt-6 lg:mt-8 text-xs sm:text-sm lg:text-base text-white text-center">
                        Connect with me!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

          <div
            className={`fixed top-1/4 left-0 bg-green-700 text-white px-8 py-4 text-xl rounded-lg shadow-lg z-50 
    transform transition-transform duration-500 ease-out
    ${showToast ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}
          >
            Resume downloaded successfully!
          </div>

          {/* {showWelcomeToast && (
            <div className="fixed top-6 right-6 bg-blue-600 text-white px-4 py-2 rounded shadow-md animate-fade-in-out">
              Welcome to the portfolio!
            </div>
          )} */}
          <div
            className={`fixed top-1/5 left-[35%] justify-center mx-auto self-center w-100 text-center  text-xl rounded-lg  z-50 
    transform transition-transform duration-2000 ease-out
    ${showWelcomeToast ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
          >

            <div className="  min-h-20 min-w-50 mx-auto text-center bg-gradient-to-br from-[#1f1c2c] to-[#928DAB]
    text-white px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-lg
    border border-white/40
    animate-slide-in-left
    flex items-center gap-4 transition-all duration-1000"
            >
              {/* Icon or Avatar */}
              {/* <div className="  rounded-full shadow-inner animate-pulse"> */}
              <div className="flex items-center space-x-2">
                {/* SVG Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 rounded-full text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >

                </svg>

                {/* Image (Avatar) */}
                <img
                  src="/myavtar.png"
                  alt="My Avatar"
                  className="h-15 w-15 rounded-full object-cover"
                />
              </div>

              {/* Toast Message */}
              <div className="text-sm sm:text-base font-medium leading-tight">
                <p className="text-white text-xl p-2 font-semibold">
                  Welcome to the portfolio✨
                </p>
              </div>
            </div>

            
          </div>
        </div>
     
    </>
  );
};

export default Intro;