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

  // useGSAP(() => {
  //   gsap.fromTo(
  //     ".skill-card",
  //     { opacity: 0, y: -80,x:50, scale: 1, rotationX: -40  },
  //     {
  //       opacity: 1,
  //       y: 0,
  //       x:0,
  //       scale: 1,
  //       duration: 1.2,
  //       ease: "bounce.out",
  //       stagger: {
  //         each: 0.2,
  //         from: "start",

  //       },
  //       scrollTrigger: {
  //         trigger: ".trigger", 
  //         start: "top 95%",            
  //         end: "bottom 80%",          
  //         toggleActions: "play none none reverse",
  //        markers:false
  //       }
  //     }
  //   );
  // }, []);
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".trigger",
        start: "top 95%",
        end: "bottom 80%",
       
        toggleActions: "play none none reverse",
        markers: true,
      },
    });

    tl.from(".skill-card", {
      opacity: 0,
      x: 30,
      y: -50,
      duration: 1,
       delay: 2,
      scale: 0.2,
     
    });


    tl.to(".skill-card", {
      opacity: 1,
      scale: 1,
      x: -8,
      y: -10,
       delay: 2,
      duration: 1,
      stagger: {
        each: 0.15,
       
      },
    });
    tl.to(".skill-card", {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
       delay: 1,
      ease: "bounce",
      duration: 1,
      stagger: {
        each: 0.15,
        
      },
    });
   
  }, []);


  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Tailwind CSS",
    "Redux",
    "Bootstrap",
    "Node Js",
    "Nest Js",
    "Next Js",
    "AWS",
    "MongoDB",
    "MySQL",
    "Postman",
    "Git,GitHub",
    "VS-Code",
    "Docker"
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 sm:px-12 bg-gray-900 text-white"
      id="skills"
    >
      <div className="max-w-5xl  mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">My Skills</h2>

        <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-card trigger  cursor-pointer bg-gray-800 rounded-xl p-6 transform translate-y-[100px] scale-0.9  shadow-lg text-lg font-medium hover:bg-gray-700 "
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
