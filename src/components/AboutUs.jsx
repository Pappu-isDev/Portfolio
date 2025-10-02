import React from 'react'

const AboutUs = () => {
  const myName = process.env.NEXT_PUBLIC_NAME;
  return (
    <>
      <div className='w-full  h-100 flex justify-center items-center bg-gradient-to-b from-black to-gray-800 text-white'>
        <div className='max-w-screen-lg p-4 mx-auto text-xl font-sans flex flex-col justify-center w-full h-full'>
          <h1 className='w-[100%] mx-auto text-center text-5xl p-3 '>About <span className='text-blue-400'>Me</span> </h1>
          <p>
            Hi, I'm <span>{myName}</span>, a passionate and skilled Frontend Developer with a knack for crafting visually appealing, interactive, and responsive web applications.Motivated and self-taught Front-End Developer with a strong foundation in HTML, CSS, JavaScript, and React along with hands-on experience building responsive websites and web applications through personal and academic projects. Eager to contribute to real-world development teams I specialize in turning ideas into ,digital experiences, ensuring both functionality and user satisfaction.
          </p>
        </div>
      </div>
    </>
  )
}

export default AboutUs
