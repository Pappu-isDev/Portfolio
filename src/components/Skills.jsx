"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BsCardImage } from "react-icons/bs";

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const naukriUrl = process.env.NEXT_PUBLIC_NAUKRI;

 useGSAP(() => {
  gsap.fromTo(
    ".skill-card",
    { 
      opacity: 0, 
      y: -50,      
    },
    {
      opacity: 1,     
      y: 0,    
      scale: 1,
      duration: 0.8,
      ease: 'bounce',
      stagger: {
        from: 'top',
        amount: 3,
        axis: 'y',
        grid: [0,1]
      },
      scrollTrigger: {
        trigger: ".trigger", 
        start: "top 95%",            
        end: "bottom 80%",          
        toggleActions: "play none none reverse",
        markers: false
      }
    }
  );
}, []);


  const skills = [
    "HTML","CSS","JS"
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 sm:px-12 bg-gray-900 text-white"
      id="skills"
    >
      <div className="max-w-5xl relative mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">My Skills</h2>

        <div className="trigger absolute flex justify-center items-center gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-card cursor-pointer bg-gray-800 rounded-xl p-6 shadow-lg text-lg font-medium hover:bg-gray-700 "
            >
              <span>

              {skill}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
