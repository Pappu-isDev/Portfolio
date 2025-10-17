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
        <div className="relative z-10 h-full">
          <div className="flex justify-center">
            {/* <div className="text-4xl font-sans mt-2">WELCOME TO MY PORTFOLIO</div> */}
          </div>

          <div className="my-30 flex">
            <div className="info w-full">
              <div className="ml-8 w-[80%] p-2 mt-14">
                <h1 className="text-white font-sans">
                  <span className="text-xl sm:text-2xl font-sans">Hello, I'm </span>
                  <span className="text-4xl font-bold text-blue-400">{myName}</span>
                  <span className="text-4xl sm:text-4xl font-sans text-white inline-block ml-3">
                    <ReactTyped
                      strings={["Software-Developer", "Full-Stack Developer", "Problem Solver"]}
                      typeSpeed={50}
                      backSpeed={40}
                      loop
                      cursorChar="|"
                    />
                  </span>
                </h1>
              </div>

              <div className="w-1/2 ml-10 font-sans text-2xl">
                <p>
                  Full-Stack Software Developer specializing in React, Node.js, and AWS to build scalable, high-performance web applications.
                </p>
              </div>

              {/* Download Resume Button */}
              <div className="mt-8 ml-10">
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className={`px-6 py-3 text-lg font-semibold rounded-md transition-all duration-300 shadow-md cursor-pointer  ${isDownloading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-400 hover:bg-blue-700 hover:scale-90 text-white"
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

            {/* Flip Card */}
            <div className="info2 overflow-hidden rounded-2xl w-[28.5%] h-88 flex justify-center items-center mr-8">
              <div className="w-[280px] h-[350px]">
                <div className="w-full h-full perspective">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center animate-spin">
                      <div className="w-[200px] h-[600px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-400 to-pink-500"></div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[1900px] h-[340px] rounded-2xl bg-black"></div>
                    </div>

                    <div
                      className="relative w-full h-full transition-transform duration-500 transform-style preserve-3d hover:rotate-y-180 z-10"
                      onMouseEnter={handleCardHover}
                    >
                      <div className="absolute w-[290px] h-[340px] mt-1 ml-[-4px] backface-hidden">
                        <img
                          src="/myImg.jpg"
                          alt="Itz Me"
                          className="object-cover w-full h-full rounded-2xl shadow-md"
                        />
                      </div>

                      {/* Back Side */}
                      <div className="absolute w-[290px] h-[340px] mt-1 ml-[-4px] [transform:rotateY(180deg)] [backface-visibility:hidden] bg-slate-800/60 backdrop-blur-sm flex flex-col justify-center items-center p-6 rounded-2xl shadow-xl border-4 border-green-400/50">
                        <img
                          src="/myavtar.png"
                          alt="Avatar"
                          className="w-24 h-24 object-contain rounded-full mb-4 ring-4 ring-green-400"
                        />
                        <h2 className="text-white text-2xl font-bold tracking-tight">Software Developer</h2>
                        <p className="text-green-400 text-md mt-2 text-center">
                          I am a passionate technophile.
                        </p>
                        <div className="mt-8 text-sm text-white">Connect with me!</div>
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
      </div>
    </>
  );
};

export default Intro;
