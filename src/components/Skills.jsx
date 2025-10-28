"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  const addSkill = () => {
    const clean = input.trim();
    if (clean && !skills.includes(clean)) {
      setSkills([...skills, clean]);
      setInput("");
    }
  };

  // Card animations with 3D effects
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.85,
      rotateX: 15,
      rotateY: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
        scale: { duration: 0.6, ease: "backOut" },
        rotate: { duration: 0.7 }
      }
    },
    hover: {
      scale: 1.08,
      y: -12,
      rotateZ: 0,
      boxShadow: "0 25px 50px rgba(14, 165, 233, 0.4)",
      borderColor: "rgba(34, 211, 238, 0.8)",
      transition: {
        duration: 0.4,
        ease: "easeOut",
        scale: { duration: 0.3 },
      }
    },
    tap: {
      scale: 0.96,
      rotateZ: [0, -1, 1, -1, 0],
      transition: {
        duration: 0.4,
      }
    }
  };

  // Floating icon animation
  const iconFloat = {
    float: {
      y: [0, -8, 0],
      rotateY: [0, 3, -3, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }
    },
    hover: {
      scale: 1.15,
      y: -6,
      rotateZ: 2,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Text glow animation
  const textGlow = {
    hover: {
      textShadow: [
        "0 0 10px rgba(6, 182, 212, 0.6)",
        "0 0 20px rgba(6, 182, 212, 0.8)",
        "0 0 15px rgba(6, 182, 212, 0.7)",
      ],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Particle burst animation
  const particleBurst = {
    hidden: { scale: 0, opacity: 0 },
    hover: (i) => ({
      scale: [0, 1.2, 0],
      opacity: [0, 0.8, 0],
      x: Math.cos((i * 45 * Math.PI) / 180) * 40,
      y: Math.sin((i * 45 * Math.PI) / 180) * 40,
      transition: {
        duration: 0.6,
        delay: i * 0.03,
        ease: "easeOut"
      }
    })
  };

  // Ripple effect animation
  const rippleEffect = {
    hidden: { scale: 0, opacity: 0 },
    hover: {
      scale: [1, 1.8, 2],
      opacity: [0.4, 0.2, 0],
      transition: {
        duration: 0.8,
        ease: "easeOut",
        times: [0, 0.6, 1]
      }
    }
  };

  // Background shine animation
  const backgroundShine = {
    initial: { x: "-100%", opacity: 0 },
    hover: {
      x: "200%",
      opacity: [0, 0.3, 0],
      transition: {
        duration: 0.9,
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }
    }
  };

  // Corner accent animation
  const cornerAccent = {
    hidden: { scale: 0, opacity: 0 },
    hover: {
      scale: [1, 1.4, 1],
      opacity: [0, 1, 0],
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section 
      ref={containerRef}
      id="skills"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#050510] via-[#0b1220] to-[#0f172a] text-white px-4 py-10 sm:px-6 lg:px-8"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 w-80 h-80 sm:w-96 sm:h-96 md:w-[500px] md:h-[500px] rounded-full bg-cyan-500/20 blur-3xl"
          animate={{
            y: [0, -25, 0],
            x: [0, 15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-72 h-72 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] rounded-full bg-purple-500/15 blur-3xl"
          animate={{
            y: [0, 20, 0],
            x: [0, -12, 0],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
      </div>

      {/* Title Section */}
      <motion.div 
        className="text-center mb-8 sm:mb-12 w-full max-w-6xl"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-2xl px-2"
        >
          My Core Technology Stack{" "}
          <motion.span
            animate={{ 
              rotate: [0, 8, -8, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block"
          >
            🚀
          </motion.span>
        </motion.h1>
        
        <motion.p
          className="text-lg sm:text-xl text-cyan-200/80 font-light max-w-2xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          Technologies I work with to bring ideas to life
        </motion.p>
      </motion.div>

      {/* Input Section */}
      <motion.div
        className="flex flex-col sm:flex-row items-center gap-3 bg-gradient-to-r from-[#1e293b]/80 to-[#334155]/60 p-4 rounded-2xl shadow-2xl w-full max-w-xl mb-12 sm:mb-16 md:mb-20 border border-cyan-500/40 backdrop-blur-xl relative overflow-hidden mx-4"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: false, amount: 0.3 }}
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
            boxShadow: "0 0 25px rgba(6, 182, 212, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl font-semibold text-sm sm:text-base shadow-lg z-10 relative overflow-hidden min-w-[120px]"
        >
          <span className="relative z-10">Add Skill ✨</span>
        </motion.button>
      </motion.div>

      {/* Animated Skill Cards Grid - ANIMATES ON EVERY SCROLL */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5 sm:gap-6 w-full max-w-6xl relative z-10 px-2">
        <AnimatePresence>
          {skills.map((skill, index) => {
            const IconComp = getTechIconComponent(skill);
            return (
              <motion.div
                key={`${skill}-${index}`}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                whileTap="tap"
                viewport={{ 
                  once: false, // This makes it animate every time
                  amount: 0.2, // Triggers when 20% of card is visible
                  margin: "0px 0px -100px 0px" // Triggers slightly earlier
                }}
                onViewportEnter={() => {
                  // Force re-animation by resetting the animation state
                }}
                exit="hidden"
                className="relative bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-3xl p-4 sm:p-6 border-2 border-cyan-500/20 backdrop-blur-xl shadow-2xl cursor-pointer overflow-hidden group hover:border-cyan-400/40 transition-colors duration-300"
                style={{ transformStyle: "preserve-3d" }}
                layout
              >
                {/* Dark theme card background with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] opacity-90 rounded-3xl" />
                
                {/* Ripple Effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-cyan-500/10"
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
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
                
                {/* Floating icon container */}
                <motion.div
                  className="relative p-3 sm:p-4 mb-2 sm:mb-3 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 group-hover:border-cyan-400/40 transition-all duration-500 flex items-center justify-center backdrop-blur-sm"
                  animate="float"
                  whileHover="hover"
                  variants={iconFloat}
                >
                  <IconComp size={32} className="sm:w-10 sm:h-10" />
                </motion.div>
                
                {/* Skill name with glow effect */}
                <motion.p
                  className="relative text-base sm:text-lg font-bold text-cyan-300 text-center drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] z-10 px-2"
                  whileHover="hover"
                  variants={textGlow}
                >
                  {skill}
                </motion.p>

                {/* Enhanced glowing overlay */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/15 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-50"
                  transition={{ duration: 0.6, ease: "easeOut" }}
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
                  variants={cornerAccent}
                  initial="hidden"
                  whileHover="hover"
                  transition={{ delay: 0.1 }}
                />
                <motion.div
                  className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100"
                  variants={cornerAccent}
                  initial="hidden"
                  whileHover="hover"
                  transition={{ delay: 0.2 }}
                />
                <motion.div
                  className="absolute bottom-2 left-2 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100"
                  variants={cornerAccent}
                  initial="hidden"
                  whileHover="hover"
                  transition={{ delay: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-2 right-2 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100"
                  variants={cornerAccent}
                  initial="hidden"
                  whileHover="hover"
                  transition={{ delay: 0.4 }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        viewport={{ once: false, amount: 0.3 }}
        className="mt-12 sm:mt-16 text-center"
      >
        <motion.p 
          className="text-cyan-300/80 text-sm"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {skills.length > 10 ? "Scroll to see animations! ↓" : "Add more skills to see them animate in! ✨"}
        </motion.p>
      </motion.div>
    </section>
  );
}

export default SkillsPage;