import React from "react";


const Intro = () => {
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
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-4xl font-bold">Welcome to My Site</h1>
        </div>
      </div>
    </>
  );
};

export default Intro;
