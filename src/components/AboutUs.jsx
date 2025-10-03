import React from 'react'
import { FaGithub, FaLinkedin,  } from "react-icons/fa6";
import { BsWhatsapp } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
const AboutUs = () => {
  const myName = process.env.NEXT_PUBLIC_NAME;
  return (
    <>
      <div className='w-full flex justify-center items-center border mx-auto text-center h-100 bg-gradient-to-b from-black via-black-200 to-gray-900 text-white'>
        <div className='   text-white'>
          <div className='max-w-screen-lg p-4 mx-auto text-xl font-sans flex flex-col justify-center       w-full  h-full'>
            <h1 className='w-[100%] mx-auto text-center text-5xl p-3 '>About <span className='text-blue-400'>Me</span> </h1>
            <p>
              Hi, I'm <span>{myName}</span>, a passionate and skilled Frontend Developer with a knack for crafting visually appealing, interactive, and responsive web applications.Motivated and self-taught Front-End Developer with a strong foundation in HTML, CSS, JavaScript, and React along with hands-on experience building responsive websites and web applications through personal and academic projects. Eager to contribute to real-world development teams I specialize in turning ideas into ,digital experiences, ensuring both functionality and user satisfaction.
            </p>
          </div>
          <div className='flex justify-center gap-10 mt-5 text-gray-500'>
            <span className="hover:text-[#181717] hover:scale-110 cursor-pointer hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-all">
              <FaGithub size={40} />
            </span>
            <span className="hover:text-[#25D366] hover:scale-110 cursor-pointer hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-all">
              <BsWhatsapp size={40} />
            </span>
            <span className=" hover:text-[#0A66C2] hover:scale-110 cursor-pointer hover:drop-shadow-[0_0_8px_#0A66C2]  transition-all">
  <FaLinkedin size={40} className='rounded-full'  />
</span>
           <span className="hover:text-[#D93025] hover:scale-110 cursor-pointer hover:drop-shadow-[0_0_8px_#D93025] transition-all">
  <BiLogoGmail size={40} />
</span>



          </div>

        </div>
      </div>
    </>
  )
}

export default AboutUs
