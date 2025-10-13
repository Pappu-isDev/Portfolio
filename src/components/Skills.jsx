"use client";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

const SkillsPage = () => {
  const [skills, setSkills] = useState([
    "React",
    "JavaScript",
    "Tailwind CSS",
    "Node js",
    "Express",
    "MongoDB",
    "Python",
    "Docker",
    "Next js",
    "GitHub",
  ]);
  const [input, setInput] = useState("");

  const addSkill = () => {
    const clean = input.trim();
    if (clean && !skills.includes(clean)) {
      setSkills([...skills, clean]);
      setInput("");
    }
  };

  // Parallax glowing background
  const { scrollYProgress } = useScroll();
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const glowX = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#050510] via-[#0b1220] to-[#0f172a] text-white p-10">
      {/* Parallax glowing orbs */}
      <motion.div
        className="absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full bg-cyan-500/30 blur-[150px]"
        style={{ y: glowY, x: glowX }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-purple-600/20 blur-[130px]"
        style={{ y: glowY, x: glowX }}
      />

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-5xl md:text-6xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.7)]"
      >
        My Core Technology Stack 🚀
      </motion.h1>

      {/* Input Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 bg-[#1e293b]/70 p-3 rounded-2xl shadow-lg w-full max-w-xl mb-16 border border-cyan-500/30 backdrop-blur-md"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type skill name (e.g. Git, AWS, Figma)..."
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
        />
        <button
          onClick={addSkill}
          className="px-5 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl font-semibold transition-all shadow-md hover:shadow-cyan-400/40"
        >
          Add Skill ✨
        </button>
      </motion.div>

      {/* Skill Cards */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 w-full max-w-6xl relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
          },
        }}
      >
        {skills.map((skill, index) => {
          const IconComp = getTechIconComponent(skill);
          return (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 80, scale: 0.8, rotateY: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotateY: 0,
                  transition: {
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                  },
                },
              }}
              whileHover={{
                scale: 1.12,
                rotate: [0, 2, -2, 0],
                boxShadow: "0 0 40px rgba(14,165,233,0.9)",
                transition: { duration: 0.4 },
              }}
              className="relative flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a]/60 to-[#1e293b]/90 rounded-2xl p-8 border border-cyan-400/30 backdrop-blur-md shadow-[0_0_25px_rgba(0,0,0,0.6)] hover:border-cyan-400 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <motion.div
                className="p-5 mb-4 rounded-full bg-cyan-500/10 border border-cyan-400/40"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <IconComp size={60} />
              </motion.div>
              <p className="text-lg font-semibold text-cyan-400 mt-2 text-center drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]">
                {skill}
              </p>

              {/* glowing overlay */}
              <motion.span
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-lg opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default SkillsPage;
