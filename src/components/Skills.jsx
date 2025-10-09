"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaBootstrap,
  FaAws,
  FaGitAlt,
  FaGithub,
  FaDocker,
} from "react-icons/fa";
import { SiMongodb, SiMysql, SiNestjs, SiNextdotjs, SiPostman, SiRedux, SiTailwindcss } from "react-icons/si";
import { FaNode } from "react-icons/fa6";


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
    gsap.fromTo(
      ".skill-card",
      { opacity: 0, y: -80, scale: 0.8, },  
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.6,
        ease: "bounce.out",
        stagger: {
          each: 0.2,
          from: "start",
        },
        scrollTrigger: {
          trigger: ".trigger",
          start: "top 95%",
          end: "bottom 80%",
          toggleActions: "play none none reverse",
          markers: false,
        },
      }
    );
  }, []);


const skills = [
  { name: "HTML", bg: "#E34F26", icon: <FaHtml5 size={40} /> },
  { name: "CSS", bg: "#1572B6", icon: <FaCss3Alt size={40} /> },
  { name: "JavaScript", bg: "#F7DF1E", icon: <FaJs size={40} color="#000" /> },
  { name: "React", bg: "#61DAFB", icon: <FaReact size={40} /> },
  { name: "Tailwind CSS", bg: "#38BDF8", icon: <SiTailwindcss size={40} /> },
  { name: "Redux", bg: "#764ABC", icon: <SiRedux size={40} /> },
  { name: "Bootstrap", bg: "#7952B3", icon: <FaBootstrap size={40} /> },
  { name: "Node Js", bg: "#68A063", icon: <FaNodeJs size={40} /> },
  { name: "Nest Js", bg: "#E0234E", icon: <SiNestjs size={40} /> },
  { name: "Next Js", bg: "#000000", icon: <SiNextdotjs size={40} color="#fff" /> },
  { name: "AWS", bg: "#FF9900", icon: <FaAws size={40} /> },
  { name: "MongoDB", bg: "#47A248", icon: <SiMongodb size={40} /> },
  { name: "MySQL", bg: "#00758F", icon: <SiMysql size={40} /> },
  { name: "Postman", bg: "#FF6C37", icon: <SiPostman size={40} /> },
  { name: "Git", bg: "#F05032", icon: <FaGitAlt size={40} /> },
  { name: "GitHub", bg: "#181717", icon: <FaGithub size={40} /> },
  // { name: "VS-Code", bg: "#007ACC", icon: <SiVisualstudiocode size={40} /> },
  { name: "Docker", bg: "#2496ED", icon: <FaDocker size={40} /> },
];


  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 sm:px-12 bg-gray-900 text-white"
      id="skills"
    >
      <div className="max-w-5xl  mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">My Skills</h2>

       {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
  {skills.map((skill, index) => (
    <div
      key={index}
      className="skill-card trigger rounded-xl text-white text-center font-semibold flex flex-col items-center justify-center p-6 shadow-lg hover:scale-105 transition-transform duration-300"
      style={{ backgroundColor: skill.bg }}
    >
      {skill.icon}
      <span className="mt-3">{skill.name}</span>
    </div>
  ))}
</div> */}
 <div className="  grid grid-cols-4  gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-card trigger  cursor-pointer bg-gray-800 rounded-xl  flex flex-col items-center justify-center p-3 transform translate-y-[100px] scale-0.9  shadow-lg text-lg font-medium hover:bg-gray-700 "
             style={{ backgroundColor: skill.bg }}
    >
      {skill.icon}
      <span className="mt-2">{skill.name}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
