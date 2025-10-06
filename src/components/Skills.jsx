"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".skill-card",
      { opacity: 0, y: 60, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
        stagger: 0.25,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",            
          end: "bottom 40%",           
          toggleActions: "play none none reverse", 
          
          markers: false, 
        },
      }
    );
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
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">My Skills</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-card cursor-pointer bg-gray-800 rounded-xl p-6 shadow-lg text-lg font-medium hover:bg-gray-700 transition"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
