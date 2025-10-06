"use client";
import React from 'react'
import { FaGithub } from "react-icons/fa6";
import { BsWhatsapp } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from 'gsap';
gsap.registerPlugin(ScrollTrigger);
const AboutUs = () => {
  const myName = process.env.NEXT_PUBLIC_NAME;
  const gitUrl = process.env.NEXT_PUBLIC_GIT;
  const linkUrl = process.env.NEXT_PUBLIC_LINKEDIN;
  const whatsUrl = process.env.NEXT_PUBLIC_WHATSAPP;
  const mailUrl = process.env.NEXT_PUBLIC_GMAIL;
  const naukriUrl = process.env.NEXT_PUBLIC_NAUKRI;

  useGSAP(() => {
    gsap.fromTo(
      ".icon",
      { opacity: 0, y: -40, scale: 0.5 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power1.inOut",
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".icons-container", 
          start: "top 95%",            
          end: "bottom 80%",          
          toggleActions: "play none none reverse",
         markers:false
        }
      }
    );
  }, []);




  return (


    <>
      <div className='w-full flex justify-center items-center  mx-auto text-center h-100 bg-gradient-to-b from-black via-black-200 to-gray-900 text-white'>
        <div className='   text-white'>
          <div className='max-w-screen-lg p-4 mx-auto text-xl font-sans flex flex-col justify-center       w-full  h-full'>
            <h1 className='w-[100%] mx-auto text-center text-5xl p-3 '>About <span className='text-blue-400'>Me</span> </h1>
            <p>
              Hi, I'm <span>{myName}</span>, a passionate and skilled Frontend Developer with a knack for crafting visually appealing, interactive, and responsive web applications.Motivated and self-taught Front-End Developer with a strong foundation in HTML, CSS, JavaScript, and React along with hands-on experience building responsive websites and web applications through personal and academic projects. Eager to contribute to real-world development teams I specialize in turning ideas into ,digital experiences, ensuring both functionality and user satisfaction.
            </p>
          </div>
          <div className="icons-container flex justify-center items-center gap-10 mt-5 text-gray-500 ">
            <div className=" flex justify-center items-center gap-10  text-gray-500">
              <a
                href={gitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer transition-all duration-300 hover:text-[#181717] hover:scale-110 hover:drop-shadow-[0_0_8px_rgb(59,130,246),0_0_15px_rgb(59,130,246),0_0_25px_rgb(59,130,246)] rounded-full"
              >
                <FaGithub size={40} className='icon' />
              </a>
            </div>
            <div
              className="  hover:text-[#25D366] hover:scale-110 cursor-pointer hover:drop-shadow-[0_0_8px_rgba(37, 211, 102, 0.8)] transition-all flex items-center justify-center"
              style={{ width: 40, height: 40 }}
            >
              <a
                href={whatsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:text-[#25D366] hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(37,211,102,0.8)]"
              >
                <BsWhatsapp size={40} className='icon' />
              </a>
            </div>

            <div className=" w-13 h-13 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white hover:drop-shadow-[0_0_8px_#0A66C2]">
              <a
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn size={28} className='icon' />
              </a>
            </div>
            <div className=" h-12 w-12 cursor-pointer transition-all duration-300 flex items-center justify-center rounded-full hover:bg-blue-100 hover:text-[#0A66C2] hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">
              <a
                href={mailUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/gmail.png" alt="Gmail" className="icon w-8 h-8 mb-1" />
              </a>
            </div>

            <div className=" h-12 w-12 cursor-pointer transition-all duration-300 flex items-center justify-center rounded-full hover:bg-blue-900 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] hover:text-[#25D366] hover:scale-110">
              <a
                href={naukriUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/na.png" alt="naukri" className=" icon w-7 h-7 mb-1" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default AboutUs
