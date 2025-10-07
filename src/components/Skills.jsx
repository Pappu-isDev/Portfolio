// "use client";
// import React, { useRef, useState } from "react";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// import { 
//   FaHtml5, FaCss3Alt, FaJs, FaReact, FaPython, FaGitAlt, FaDatabase, FaBootstrap, 
//   FaFigma, FaNodeJs, FaJava, FaPhp, FaAngular, FaVuejs, FaAws, FaDocker, FaWordpress,
//   FaLaravel, FaSass, FaLess, FaCloud, FaLinux
// } from "react-icons/fa";
// import { 
//   SiTailwindcss, SiNextdotjs, SiTypescript, SiVercel, SiMongodb, SiPostgresql, 
//   SiMysql, SiFirebase, SiRedux, SiJest, SiCypress, SiTestinglibrary, SiJira, 
//   SiKubernetes, SiTerraform, SiCplusplus, SiGo, SiKotlin, SiSolidity,
//   SiPwa
// } from "react-icons/si";
// import { DiDotnet } from "react-icons/di"; 

// gsap.registerPlugin(ScrollTrigger);

// const skillMap = {
//   "html": { icon: FaHtml5, color: "from-orange-500 via-orange-600 to-amber-700" },
//   "html5": { icon: FaHtml5, color: "from-orange-500 via-orange-600 to-amber-700" },
//   "css": { icon: FaCss3Alt, color: "from-blue-500 via-blue-600 to-sky-700" },
//   "css3": { icon: FaCss3Alt, color: "from-blue-500 via-blue-600 to-sky-700" },
//   "javascript": { icon: FaJs, color: "from-yellow-400 via-yellow-500 to-yellow-600" },
//   "js": { icon: FaJs, color: "from-yellow-400 via-yellow-500 to-yellow-600" },
//   "typescript": { icon: SiTypescript, color: "from-blue-600 via-blue-700 to-blue-800" },
//   "ts": { icon: SiTypescript, color: "from-blue-600 via-blue-700 to-blue-800" },
//   "pwa": { icon: SiPwa, color: "from-indigo-500 via-indigo-600 to-indigo-700" },

//   "react": { icon: FaReact, color: "from-cyan-400 via-cyan-500 to-cyan-600" },
//   "redux": { icon: SiRedux, color: "from-purple-500 via-purple-600 to-purple-700" },
//   "nextjs": { icon: SiNextdotjs, color: "from-gray-700 via-gray-800 to-black" },
//   "angular": { icon: FaAngular, color: "from-red-600 via-red-700 to-red-800" },
//   "vue": { icon: FaVuejs, color: "from-green-500 via-green-600 to-green-700" },
//   "vuejs": { icon: FaVuejs, color: "from-green-500 via-green-600 to-green-700" },
//   "tailwind": { icon: SiTailwindcss, color: "from-teal-400 via-teal-500 to-teal-600" },
//   "tailwindcss": { icon: SiTailwindcss, color: "from-teal-400 via-teal-500 to-teal-600" },
//   "bootstrap": { icon: FaBootstrap, color: "from-purple-500 via-purple-600 to-purple-700" },
//   "sass": { icon: FaSass, color: "from-pink-500 via-pink-600 to-pink-700" },
//   "less": { icon: FaLess, color: "from-blue-400 via-blue-500 to-blue-600" },

//   "node": { icon: FaNodeJs, color: "from-green-600 via-green-700 to-green-800" },
//   "nodejs": { icon: FaNodeJs, color: "from-green-600 via-green-700 to-green-800" },
//   "express": { icon: FaNodeJs, color: "from-gray-700 via-gray-800 to-black" },
//   "python": { icon: FaPython, color: "from-blue-700 via-yellow-400 to-blue-800" },
//   "django": { icon: FaPython, color: "from-green-800 via-green-900 to-black" },
//   "java": { icon: FaJava, color: "from-red-500 via-red-600 to-red-700" },
//   "spring": { icon: FaJava, color: "from-green-700 via-green-800 to-green-900" },
//   "php": { icon: FaPhp, color: "from-indigo-400 via-indigo-500 to-indigo-600" },
//   "laravel": { icon: FaLaravel, color: "from-red-700 via-red-800 to-red-900" },
//   "c#": { icon: DiDotnet, color: "from-purple-700 via-purple-800 to-purple-900" }, // 👈 UPDATED TO DiDotnet
//   "c++": { icon: SiCplusplus, color: "from-blue-700 via-blue-800 to-blue-900" },
//   "go": { icon: SiGo, color: "from-cyan-500 via-cyan-600 to-cyan-700" },
//   "golang": { icon: SiGo, color: "from-cyan-500 via-cyan-600 to-cyan-700" },
//   "kotlin": { icon: SiKotlin, color: "from-orange-500 via-orange-600 to-orange-700" },
//   "solidity": { icon: SiSolidity, color: "from-gray-500 via-gray-600 to-gray-700" },

//   "sql": { icon: FaDatabase, color: "from-gray-400 via-gray-500 to-gray-600" },
//   "mongodb": { icon: SiMongodb, color: "from-green-500 via-green-600 to-green-700" },
//   "postgres": { icon: SiPostgresql, color: "from-blue-600 via-blue-700 to-blue-800" },
//   "postgresql": { icon: SiPostgresql, color: "from-blue-600 via-blue-700 to-blue-800" },
//   "mysql": { icon: SiMysql, color: "from-blue-800 via-blue-900 to-black" },
//   "firebase": { icon: SiFirebase, color: "from-yellow-500 via-yellow-600 to-orange-700" },
  
//   "git": { icon: FaGitAlt, color: "from-red-500 via-red-600 to-red-700" },
//   "github": { icon: FaGitAlt, color: "from-gray-700 via-gray-800 to-black" },
//   "docker": { icon: FaDocker, color: "from-blue-400 via-blue-500 to-blue-600" },
//   "kubernetes": { icon: SiKubernetes, color: "from-blue-500 via-blue-600 to-blue-700" },
//   "aws": { icon: FaAws, color: "from-orange-600 via-orange-700 to-orange-800" },
//   "gcp": { icon: FaCloud, color: "from-red-500 via-blue-500 to-yellow-500" },
//   "vercel": { icon: SiVercel, color: "from-black via-gray-900 to-black" },
//   "terraform": { icon: SiTerraform, color: "from-purple-400 via-purple-500 to-purple-600" },
//   "linux": { icon: FaLinux, color: "from-amber-600 via-amber-700 to-amber-800" },

//   "jest": { icon: SiJest, color: "from-red-600 via-red-700 to-red-800" },
//   "cypress": { icon: SiCypress, color: "from-green-400 via-green-500 to-green-600" },
//   "testinglibrary": { icon: SiTestinglibrary, color: "from-red-700 via-red-800 to-red-900" },
//   "jira": { icon: SiJira, color: "from-blue-700 via-blue-800 to-blue-900" },
//   "figma": { icon: FaFigma, color: "from-red-400 via-purple-400 to-cyan-400" },
//   "wordpress": { icon: FaWordpress, color: "from-blue-400 via-blue-500 to-blue-600" },

//   "default": { icon: FaDatabase, color: "from-purple-500 via-pink-500 to-red-500" },
// };

// const staticSkills = [];

// const SkillCard = ({ name, Icon, color }) => (
//   <div
//     className={`skill-card p-6 rounded-xl bg-gradient-to-br ${color} shadow-xl
//       transform transition-all duration-300
//       hover:scale-105 hover:shadow-2xl hover:brightness-110
//       flex flex-col items-center justify-center space-y-3 
//       text-white cursor-pointer
//     `}
//   >
//     <div className="logo flex justify-center items-center">
//       <Icon
//         size={50}
//         className="icon transition-all duration-300 ease-in-out transform hover:rotate-6 hover:scale-110"
//       />
//     </div>
//     <div className="name text-center text-lg font-bold tracking-wider">
//       {name}
//     </div>
//   </div>
// );

// export default function SkillsSection() {
//   const sectionRef = useRef(null);
//   const [newSkillName, setNewSkillName] = useState("");
//   const [dynamicSkills, setDynamicSkills] = useState([]);
  
//   const allSkills = [...staticSkills, ...dynamicSkills]; 

//   useGSAP(() => {
//     gsap.fromTo(
//       ".skill-card", 
//       { opacity: 0, y: 80, scale: 0.8, rotationX: -40, transformOrigin: "center bottom" },
//       {
//         opacity: 1,
//         y: 0,
//         scale: 1,
//         rotationX: 0, 
//         duration: 1.2,
//         ease: "elastic.out(1, 0.6)", 
//         stagger: {
//           each: 0.1,
//           from: "start",
//         },
//         scrollTrigger: {
//           trigger: ".trigger-container",
//           start: "top 85%", 
//           end: "bottom 70%", 
//           toggleActions: "play none none reverse",
//           markers: false,
//         }
//       }
//     );
//   }, [allSkills.length]);

//   const addSkill = (e) => {
//     e.preventDefault(); 
//     const skillName = newSkillName.trim();

//     if (skillName && !allSkills.some(skill => skill.name.toLowerCase() === skillName.toLowerCase())) {
      
//       const normalizedInput = skillName.toLowerCase().replace(/[\s\.]/g, ''); 
      
//       const skillDetails = skillMap[normalizedInput] || skillMap["default"];

//       const newSkill = {
//         name: skillName, 
//         icon: skillDetails.icon,
//         color: skillDetails.color,
//         id: Date.now(),
//       };

//       setDynamicSkills(prevSkills => [newSkill, ...prevSkills]);
//       setNewSkillName("");
//     }
//   };

//   return (
//     <section ref={sectionRef} className="py-20 px-6 bg-gray-900 min-h-screen">
//       <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-white">
//         My <span className="text-blue-500">Core</span> Skills
//       </h2>
      
//       <form onSubmit={addSkill} className="max-w-2xl mx-auto mb-12 flex space-x-3 p-4 bg-gray-800 rounded-xl shadow-2xl">
//         <input
//           type="text"
//           placeholder="Add ANY skill (e.g., Docker, Kotlin, Jest)..."
//           value={newSkillName}
//           onChange={(e) => setNewSkillName(e.target.value)}
//           className="flex-grow p-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition duration-300"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap"
//         >
//           Add Skill ✨
//         </button>
//       </form>

//       <div 
//         className="trigger-container max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-4"
//       >
//         {allSkills.map((skill) => (
//           <SkillCard
//             key={skill.name}
//             name={skill.name}
//             Icon={skill.icon}
//             color={skill.color}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }

"use client";
import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaReact, FaNodeJs, FaGitAlt, FaDatabase } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb } from "react-icons/si";
import { FaQuestionCircle } from "react-icons/fa"; 

gsap.registerPlugin(ScrollTrigger);

const iconLibraryMap = {
    'nextjs': 'Si',
    'react': 'Si',
    'tailwind': 'Si',
    'typescript': 'Si',
    'mongodb': 'Si',
    'default': 'Si' 
};

/**
 * Dynamically loads an icon component based on the skill name.
 * * FIX: Using explicit switch statement for dynamic imports to satisfy Next.js/Webpack bundler.
 * * @param {string} skillName 
 * @returns {React.Component | null} 
 */
async function dynamicallyGetIcon(skillName) {
    // 1. Normalize the input
    const cleanedName = skillName
        .replace(/[\s\.-]/g, '') 
        .toLowerCase();
        
    // 2. Determine prefix
    let prefix = iconLibraryMap[cleanedName] || 'Si'; // Default to Si

    // 3. Construct the Icon name (e.g., Si + NextdotJs)
    const iconName = prefix + cleanedName.charAt(0).toUpperCase() + cleanedName.slice(1);
    
    let module;
    
    try {
        // 4. Use switch for explicit dynamic import paths
        switch (prefix) {
            case 'Fa':
                module = await import('react-icons/fa');
                break;
            case 'Si':
                module = await import('react-icons/si');
                break;
            // Add other prefixes (Di, Tb, etc.) if you want broader dynamic support
            // case 'Di':
            //     module = await import('react-icons/di');
            //     break;
            default:
                module = await import('react-icons/fa'); // Fallback library module
        }
        
        // 5. Return the specific named export component, or FaQuestionCircle as a final fallback
        return module[iconName] || FaQuestionCircle; 
    } catch (error) {
        console.error(`Could not load module or icon for skill: ${skillName}`, error);
        // Fallback to a reliable, imported icon
        return FaDatabase; 
    }
}
const coreColorMap = {
    "React": "from-cyan-400 via-cyan-500 to-cyan-600",
    "TypeScript": "from-blue-600 via-blue-700 to-blue-800",
    "Next.js": "from-gray-700 via-gray-800 to-black",
    "Tailwind CSS": "from-teal-400 via-teal-500 to-teal-600",
    "Node.js": "from-green-600 via-green-700 to-green-800",
    "MongoDB": "from-green-500 via-green-600 to-green-700",
    "Git": "from-red-500 via-red-600 to-red-700",
};

const staticSkills = [
    { name: "React", icon: FaReact, color: coreColorMap.React },
    { name: "TypeScript", icon: SiTypescript, color: coreColorMap.TypeScript },
    { name: "Next.js", icon: SiNextdotjs, color: coreColorMap["Next.js"] },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: coreColorMap["Tailwind CSS"] },
    { name: "Node.js", icon: FaNodeJs, color: coreColorMap["Node.js"] },
    { name: "MongoDB", icon: SiMongodb, color: coreColorMap.MongoDB },
    { name: "Git", icon: FaGitAlt, color: coreColorMap.Git },
];
const getRandomColor = () => {
    const gradients = [
        "from-purple-500 via-pink-500 to-red-500",
        "from-green-400 via-yellow-400 to-orange-400",
        "from-indigo-600 via-blue-600 to-cyan-600",
        "from-yellow-500 via-amber-500 to-orange-500",
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
};

const DynamicIconWrapper = ({ name, color }) => {
    const [IconComponent, setIconComponent] = useState(null);
    
    useEffect(() => {
        dynamicallyGetIcon(name).then(Icon => {
            setIconComponent(() => Icon);
        });
    }, [name]);
    if (!IconComponent) return (
         <div className={`skill-card p-6 rounded-xl bg-gradient-to-br ${color} shadow-xl flex flex-col items-center justify-center space-y-3 text-white animate-pulse`}>
             <div className="h-[50px] w-[50px] rounded-full bg-gray-500/50"></div>
             <div className="text-center text-lg font-bold tracking-wider">{name}</div>
         </div>
     );

    // Render the card once the Icon component is loaded
    return (
        <SkillCard name={name} Icon={IconComponent} color={color} />
    );
};


const SkillCard = ({ name, Icon, color }) => (
  <div
    className={`skill-card p-6 rounded-xl bg-gradient-to-br ${color} shadow-xl
      transform transition-all duration-300
      hover:scale-105 hover:shadow-2xl hover:brightness-110
      flex flex-col items-center justify-center space-y-3 
      text-white cursor-pointer
    `}
  >
    <div className="logo flex justify-center items-center">
      <Icon
        size={50}
        className="icon transition-all duration-300 ease-in-out transform hover:rotate-6 hover:scale-110"
      />
    </div>
    <div className="name text-center text-lg font-bold tracking-wider">
      {name}
    </div>
  </div>
);

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const [newSkillName, setNewSkillName] = useState("");
  const [dynamicSkills, setDynamicSkills] = useState([]); 
  
  const allSkills = [...staticSkills, ...dynamicSkills]; 

  useGSAP(() => {
    gsap.fromTo(
      ".skill-card", 
      { opacity: 0, y: 80, scale: 0.8, rotationX: -40, transformOrigin: "center bottom" },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0, 
        duration: 1.2,
        ease: "elastic.out(1, 0.6)", 
        stagger: {
          each: 0.1,
          from: "start",
        },
        scrollTrigger: {
          trigger: ".trigger-container",
          start: "top 85%", 
          end: "bottom 70%", 
          toggleActions: "play none none reverse",
          markers: false,
        }
      }
    );
  }, [allSkills.length]);

  const addSkill = (e) => {
    e.preventDefault(); 
    const skillName = newSkillName.trim();

    if (skillName && !allSkills.some(skill => skill.name.toLowerCase() === skillName.toLowerCase())) {
      
      const newSkill = {
        name: skillName, 
        color: getRandomColor(), 
        id: Date.now(),
      };
      setDynamicSkills(prevSkills => [newSkill, ...prevSkills]);
      setNewSkillName("");
    }
  };

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-gray-900 min-h-screen">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-white">
        My <span className="text-blue-500">Core</span> Skills
      </h2>
      
      <form onSubmit={addSkill} className="max-w-2xl mx-auto mb-12 flex space-x-3 p-4 bg-gray-800 rounded-xl shadow-2xl">
        <input
          type="text"
          placeholder="Type any icon name (e.g., Jira, Python, Kubernetes)..."
          value={newSkillName}
          onChange={(e) => setNewSkillName(e.target.value)}
          className="flex-grow p-3 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition duration-300"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap"
        >
          Add Skill ✨
        </button>
      </form>

      <div 
        className="trigger-container max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-4"
      >
        {staticSkills.map((skill) => (
          <SkillCard
            key={skill.name}
            name={skill.name}
            Icon={skill.icon}
            color={skill.color}
          />
        ))}
        {dynamicSkills.map((skill) => (
            <DynamicIconWrapper 
                key={skill.id}
                name={skill.name}
                color={skill.color}
            />
        ))}
      </div>
    </section>
  );
}