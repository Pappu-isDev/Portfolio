"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useAnimation } from "framer-motion";
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
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      fontSize: size * 0.5,
      color: "#fff",
      boxShadow: "0 0 20px rgba(102, 126, 234, 0.5)",
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
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  const addSkill = () => {
    const clean = input.trim();
    if (clean && !skills.includes(clean)) {
      setSkills([...skills, clean]);
      setInput("");
    }
  };

  // Enhanced mouse parallax for cards
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  // Card hover animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.8,
      rotateX: 15,
      rotateY: -10,
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.1,
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    }),
    hover: {
      scale: 1.15,
      y: -15,
      rotateZ: 0,
      boxShadow: "0 35px 60px rgba(14, 165, 233, 0.5)",
      borderColor: "rgba(34, 211, 238, 1)",
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 400,
        damping: 15,
      },
    },
    tap: {
      scale: 0.95,
      rotateZ: [-1, 1, -1, 1, 0],
      transition: {
        duration: 0.3,
      },
    },
  };

  // Icon float animation
  const iconFloat = {
    float: {
      y: [0, -12, 0],
      rotateY: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    hover: {
      scale: 1.2,
      rotateZ: 5,
      y: -8,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Text glow animation
  const textGlow = {
    initial: { textShadow: "0 0 10px rgba(6, 182, 212, 0.6)" },
    hover: {
      textShadow: [
        "0 0 10px rgba(6, 182, 212, 0.6)",
        "0 0 20px rgba(6, 182, 212, 0.8)",
        "0 0 30px rgba(6, 182, 212, 1)",
        "0 0 20px rgba(6, 182, 212, 0.8)",
        "0 0 10px rgba(6, 182, 212, 0.6)",
      ],
      transition: {
        duration: 1.5,
        repeat: Infinity,
      },
    },
  };

  // Particle burst animation
  const particleBurst = {
    hidden: { scale: 0, opacity: 0 },
    hover: (i) => ({
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      x: Math.cos((i * 45 * Math.PI) / 180) * 50,
      y: Math.sin((i * 45 * Math.PI) / 180) * 50,
      transition: {
        duration: 0.8,
        delay: i * 0.05,
      },
    }),
  };

  // Ripple effect animation
  const rippleEffect = {
    hidden: { scale: 0, opacity: 0 },
    hover: {
      scale: [1, 2, 2.5],
      opacity: [0.3, 0.1, 0],
      transition: {
        duration: 1,
        times: [0, 0.5, 1],
      },
    },
  };

  // Background shine animation
  const backgroundShine = {
    initial: { x: "-100%" },
    hover: {
      x: "200%",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#050510] via-[#0b1220] to-[#0f172a] text-white px-4 py-10 sm:px-6 lg:px-8"
      onMouseMove={handleMouseMove}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 w-80 h-80 sm:w-96 sm:h-96 md:w-[500px] md:h-[500px] rounded-full bg-cyan-500/20 blur-3xl"
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-72 h-72 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] rounded-full bg-purple-500/15 blur-3xl"
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Title Section */}
      <motion.div className="text-center mb-8 sm:mb-12 w-full max-w-6xl">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-2xl px-2"
        >
          My Core Technology Stack{" "}
          <motion.span
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="inline-block"
          >
            🚀
          </motion.span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg sm:text-xl text-cyan-200/80 font-light max-w-2xl mx-auto px-4"
        >
          Technologies I work with to bring ideas to life
        </motion.p>
      </motion.div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row items-center gap-3 bg-gradient-to-r from-[#1e293b]/80 to-[#334155]/60 p-4 rounded-2xl shadow-2xl w-full max-w-xl mb-12 sm:mb-16 md:mb-20 border border-cyan-500/40 backdrop-blur-xl relative overflow-hidden mx-4"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addSkill()}
          placeholder="Type skill name..."
          className="flex-1 bg-transparent outline-none text-white placeholder-cyan-200/60 text-base sm:text-lg font-medium z-10 w-full mb-3 sm:mb-0 px-2 py-2"
        />
        <motion.button
          onClick={addSkill}
          whileHover={{ 
            scale: 1.05,
            background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
            boxShadow: "0 0 30px rgba(6, 182, 212, 0.6)"
          }}
          whileTap={{ scale: 0.95 }}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl font-semibold text-sm sm:text-base shadow-lg z-10 relative overflow-hidden min-w-[120px]"
        >
          <span className="relative z-10">Add Skill ✨</span>
        </motion.button>
      </motion.div>

      {/* Enhanced Skill Cards Grid */}
      <motion.div
        className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 sm:gap-6 w-full max-w-6xl relative z-10 px-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {skills.map((skill, index) => {
          const IconComp = getTechIconComponent(skill);
          return (
            <motion.div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              whileTap="tap"
              viewport={{ once: false, amount: 0.3 }}
              className="relative 
              
               bg-gradient-to-br from-[#0f172a]/40 to-[#1e293b]/80 rounded-3xl p-4 sm:p-6 border-2 border-cyan-400/20 backdrop-blur-xl shadow-2xl cursor-pointer overflow-hidden group"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Ripple Effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-cyan-400/20"
                variants={rippleEffect}
                initial="hidden"
                whileHover="hover"
              />

              {/* Background Shine */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
                variants={backgroundShine}
                initial="initial"
                whileHover="hover"
              />

              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.5 }}
              />
              
              {/* Floating icon container */}
              <motion.div
                className="p-3 sm:p-4 mb-2 sm:mb-3 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 group-hover:border-cyan-400/40 transition-all duration-500"
                variants={iconFloat}
                animate="float"
                whileHover="hover"
              >
                <IconComp size={32} className="sm:w-10 sm:h-10" />
              </motion.div>
              
              {/* Skill name with glow effect */}
              <motion.p
                className="text-base sm:text-lg font-bold text-cyan-300 text-center drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] relative z-10 px-2"
                variants={textGlow}
                initial="initial"
                whileHover="hover"
              >
                {skill}
              </motion.p>

              {/* Enhanced glowing overlay */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/30 via-blue-500/20 to-purple-500/30 blur-xl opacity-0 group-hover:opacity-70"
                transition={{ duration: 0.6 }}
              />
              
              {/* Particle burst on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full"
                    custom={i}
                    variants={particleBurst}
                    initial="hidden"
                    whileHover="hover"
                  />
                ))}
              </div>

              {/* Corner accents */}
              <motion.div
                className="absolute top-2 left-2 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100"
                whileHover={{
                  scale: [1, 1.5, 1],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 1, delay: 0.2 }}
              />
              <motion.div
                className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100"
                whileHover={{
                  scale: [1, 1.5, 1],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 1, delay: 0.4 }}
              />
              <motion.div
                className="absolute bottom-2 left-2 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100"
                whileHover={{
                  scale: [1, 1.5, 1],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 1, delay: 0.6 }}
              />
              <motion.div
                className="absolute bottom-2 right-2 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100"
                whileHover={{
                  scale: [1, 1.5, 1],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Floating CTA */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-12 sm:mt-16 text-center"
      >
        
      </motion.div>
    </section>
  );
};

export default SkillsPage;
