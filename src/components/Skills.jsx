"use client";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { loadIcon } from "@iconify/react/dist/iconify.js";

import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as MdIcons from "react-icons/md";
import * as DiIcons from "react-icons/di";
import * as IoIcons from "react-icons/io5";

const iconLibraries = {
  ...FaIcons,
  ...SiIcons,
  ...MdIcons,
  ...DiIcons,
  ...IoIcons,
};

const DefaultIcon = ({ size }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(255,255,255,0.1)",
      fontSize: size * 0.5,
      color: "#fff",
    }}
  >
    ?
  </div>
);

const getTechIconComponent = (skillName) => {
  const normalized = skillName.toLowerCase().replace(/\s+/g, "");
  
  const possibleReactIconKeys = Object.keys(iconLibraries).filter((key) =>
    key.toLowerCase().includes(normalized)
  );

  const possibleIconifyNames = [
    `logos:${normalized}`,
    `devicon:${normalized}`,
    `simple-icons:${normalized}`,
    `fa6-brands:${normalized}`,
    `mdi:${normalized}`,
  ];

  return function DynamicIcon({ size = 50, className = "" }) {
    const [iconName, setIconName] = useState(null);
    const [ReactIcon, setReactIcon] = useState(null);

    useEffect(() => {
      if (possibleReactIconKeys.length > 0) {
        const IconComp = iconLibraries[possibleReactIconKeys[0]];
        setReactIcon(() => IconComp);
        return;
      }
      
      let isMounted = true;
      const tryIcons = async () => {
        for (const icon of possibleIconifyNames) {
          try {
            const iconData = await loadIcon(icon);
            if (iconData && isMounted) {
              setIconName(icon);
              break;
            }
          } catch {
            continue;
          }
        }
      };
      tryIcons();
      
      return () => {
        isMounted = false;
      };
    }, [skillName]);

    if (ReactIcon) return <ReactIcon size={size} className={className} color="#fff" />;
    if (iconName)
      return <Icon icon={iconName} width={size} height={size} className={className} color="#fff" />;
      
    return <DefaultIcon size={size} />;
  };
};

const Skills = () => {
  const [skills, setSkills] = useState(["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Python", "Docker"]);
  const [input, setInput] = useState("");

  const addSkill = () => {
    const clean = input.trim();
    if (clean && !skills.includes(clean)) {
      setSkills([...skills, clean]);
      setInput("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#0f172a] text-white p-8">
      
      <h1 className="text-4xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          My Core Technology Stack 🚀
      </h1>

      <div className="flex items-center gap-3 bg-[#1e293b] p-3 rounded-xl shadow-2xl w-full max-w-xl mb-12">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type skill name (e.g. Git, AWS, Figma)..."
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
        />
        <button
          onClick={addSkill}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-colors shadow-md"
        >
          Add Skill ✨
        </button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 w-full max-w-6xl">
        {skills.map((skill, index) => {
          const IconComp = getTechIconComponent(skill);
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center 
                         bg-gradient-to-br from-gray-700 to-gray-800 
                         text-white h-48
                         rounded-2xl p-6 shadow-2xl 
                         transform hover:-translate-y-2 hover:shadow-cyan-500/50 
                         transition-all duration-300 cursor-pointer"
            >
                <div className="p-3 mb-3 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                    <IconComp size={50} />
                </div>
              <p className="text-xl font-semibold text-cyan-400 mt-2 text-center">{skill}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;