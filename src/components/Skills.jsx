"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BsCardImage } from "react-icons/bs";

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".skill-card",
      { opacity: 0, y: 80, scale: 0.8, rotationX: -40 , transformOrigin: "center bottom",duration:1.2, ease: "elastic.out(1, 0.6)",stagger: { each: 0.5, from: "start" } },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
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
         markers:false
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
      <div className="max-w-5xl  mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">My Skills</h2>

        <div className="trigger  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-card cursor-pointer bg-gray-800 rounded-xl p-6 transform translate-y-[100px] scale-0.9  shadow-lg text-lg font-medium hover:bg-gray-700 "
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
