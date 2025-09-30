"use client";
import React from "react";
import { ReactTyped } from "react-typed";


const Intro = () => {
  const myName = process.env.NEXT_PUBLIC_NAME;
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
        <div className="relative z-10  h-full">
          <div className="flex justify-center">
            <div className="text-4xl font-sans mt-2">WELCOME TO MY PORTFOLIO</div>
          </div>
          <div>
            <div className="min-h-80 w-full">
              <div className="ml-8 w-1/2 p-2 mt-14">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Intro;
