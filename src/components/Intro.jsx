"use client";
import React from "react";
import { ReactTyped } from "react-typed";



const Intro = () => {
  const myName = process.env.NEXT_PUBLIC_NAME;
  const pdf = process.env.NEXT_PUBLIC_PDF;

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

        {/* Content on top */}
        <div className="relative z-10 h-full">
          <div className="flex justify-center">
            <div className="text-4xl font-sans mt-2">WELCOME TO MY PORTFOLIO</div>
          </div>
          <div className=" my-30 flex ">
            <div className="w-full ">
              <div className="ml-8 w-[80%] p-2 mt-14">
                <h1 className="text-white font-sans">
                  <span className="text-xl sm:text-2xl font-sans">
                    Hello, I'm
                  </span>
                  {' '}
                  <span className="text-4xl sm:text-4xl font-bold text-blue-400">
                    {myName}
                  </span>
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
                <p>Full-Stack Software Developer specializing in React, Node.js, and AWS to build scalable, high-performance web applications.</p>
              </div>
              <div>
                <div className="installer mt-5 ml-10  ">
                  <label htmlFor="progressLinux" className="cursor-pointer flex items-center">
                    <input
                      id="progressLinux"
                      type="radio"
                      name="resume"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = `/${pdf}`;
                        link.download = `${pdf}`;
                        link.target = "_blank";
                        link.click();
                      }}
                    />
                    <span className=""></span>
                  </label>
                </div>
              </div>
            </div>
            <div className="  overflow-hidden rounded-2xl  w-[28.5%] h-88  flex justify-center items-center">
              <div className="w-[280px] h-[350px] ">
                <div className=" w-full h-full perspective   ">
                  <div className="relative w-full h-full">
                    {/* Rotating Gradient Border Layer */}
                    <div className="absolute inset-0 flex items-center justify-center animate-spin">
                      <div className="w-[200px] h-[600px]  rounded-2xl bg-gradient-to-r from-blue-500 via-purple-400 to-pink-500"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center ">
                      <div className="w-[1900px] h-[340px]   rounded-2xl bg-black"></div>
                    </div>

                    {/* Flip Card (non-rotating content) */}
                    <div className="relative w-full h-full transition-transform duration-500 transform-style preserve-3d hover:rotate-y-180 z-10">
                      {/* Front Image */}
                      <div className="absolute w-[290px] h-[340px] mt-1 ml-[-4px] backface-hidden">
                        <img src="/myImg.jpg" alt="Itz Me" className="object-cover w-full h-full rounded-2xl shadow-md" />
                      </div>

                      {/* Back Side */}
                      <div className="absolute  w-[290px] h-[340px] mt-1 ml-[-4px] [transform:rotateY(180deg)] [backface-visibility:hidden] bg-slate-800/60 backdrop-blur-sm flex flex-col justify-center items-center p-6 rounded-2xl shadow-xl border-4 border-green-400/50">
                        <img
                          src="/myavtar.png"
                          alt="Avatar"
                          className="w-24 h-24 object-contain rounded-full mb-4 ring-4 ring-green-400"
                        />
                        <h2 className="text-white text-2xl font-bold tracking-tight">Software Developer</h2>
                        <p className="text-green-400 text-md mt-2 text-center">
                          I am a passionate technophile .
                        </p>
                        <div className="mt-8  text-sm  text-white">Connect with me!</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div >
      </div >
    </>
  );
};

export default Intro;
