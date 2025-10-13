import AboutUs from '@/components/AboutUs'
import ContactUs from '@/components/ContactUs'
import Experience from '@/components/Experience'
import Footer from '@/components/Footer'
import Intro from '@/components/Intro'
import Navbar from '@/components/Navbar'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'

import Login from '@/components/Login'

import React from 'react'

const page = () => {
  const myName = process.env.NEXT_PUBLIC_NAME;
  return (
    <div className='bg-gray-900'>
     <Navbar name={myName} />
     <Intro />
     <AboutUs />
     <Skills />
     <Projects />
     <Experience />
     <ContactUs />
     <Footer />
     {/* <Login /> */}
    </div>
  )
}

export default page
