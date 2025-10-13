"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaBuilding, FaMapMarkerAlt, FaCalendarAlt, FaStar } from 'react-icons/fa';

// NOTE: Use your existing data (as provided)
const experiences = [
  {
    id: 1,
    title: "Senior Full-Stack Developer",
    company: "Tech Solutions Inc.",
    location: "San Francisco, CA (Remote)",
    period: "Jan 2022 - Present",
    description: [
      "Led the development of a scalable e-commerce platform using Next.js, Node.js, and MongoDB, resulting in a 30% increase in conversion rates.",
      "Implemented robust RESTful APIs and real-time data synchronization with WebSockets.",
      "Mentored junior developers and conducted code reviews to ensure high code quality and best practices.",
    ],
    techStack: ["Next.js", "React", "Node.js", "Express", "MongoDB", "TypeScript", "AWS", "Docker"],
  },
  {
    id: 2,
    title: "Software Engineer",
    company: "Innovate Labs",
    location: "New York, NY",
    period: "Mar 2019 - Dec 2021",
    description: [
      "Developed and maintained critical features for a SaaS product using React and Python/Django.",
      "Optimized database queries and backend services, reducing API response times by 20%.",
      "Collaborated with UX/UI designers to translate wireframes into high-fidelity user interfaces.",
    ],
    techStack: ["React", "Redux", "Python", "Django", "PostgreSQL", "JavaScript", "Git"],
  },
  {
    id: 3,
    title: "Junior Developer",
    company: "WebCrafters Studio",
    location: "Austin, TX",
    period: "Jun 2017 - Feb 2019",
    description: [
      "Assisted in front-end development of client websites using HTML, CSS, and jQuery.",
      "Learned version control (Git) and participated in agile development sprints.",
      "Contributed to basic backend scripts in PHP.",
    ],
    techStack: ["HTML", "CSS", "JavaScript", "jQuery", "PHP", "MySQL", "Git"],
  },
];

// VARIANTS: Motion now moves the cards left-to-right or right-to-left
const leftVariants = {
  hidden: { opacity: 0, x: -100 }, 
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }, 
};

const rightVariants = {
  hidden: { opacity: 0, x: 100 }, 
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }, 
};

const ExperienceCard = ({ experience }) => {
  return (
    <div 
      className="p-8 rounded-3xl shadow-2xl 
                 bg-gray-800/80 backdrop-blur-sm 
                 border border-blue-500/30 text-gray-100 
                 transform hover:scale-[1.02] hover:shadow-cyan-400/50 
                 transition-all duration-300 cursor-pointer group h-full flex flex-col"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-extrabold text-blue-400 group-hover:text-cyan-300 transition-colors">
          {experience.title}
        </h3>
        <p className="flex items-center text-sm font-semibold text-gray-400 p-1 px-3 bg-gray-700 rounded-full">
          <FaCalendarAlt className="mr-1 text-blue-500" /> {experience.period}
        </p>
      </div>
      
      <p className="flex items-center text-md text-gray-300 mb-2">
        <FaBuilding className="mr-2 text-cyan-500" /> {experience.company}
      </p>
      <p className="flex items-center text-sm text-gray-400 mb-4">
        <FaMapMarkerAlt className="mr-2 text-cyan-500" /> {experience.location}
      </p>

      <ul className="list-none space-y-3 mb-6 flex-grow">
        {experience.description.map((point, index) => (
          <li key={index} className="flex items-start text-sm leading-relaxed text-gray-300">
            <FaStar className="mr-3 mt-1 flex-shrink-0 text-yellow-400 text-xs" />
            {point}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-700/50 mt-auto">
        {experience.techStack.map((tech, index) => (
          <span 
            key={index} 
            className="px-3 py-1 bg-cyan-600/20 text-cyan-300 text-xs font-medium rounded-full
                       hover:bg-cyan-600/30 transition-colors shadow-inner"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="bg-[#0f172a] text-white py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto"> 
        <h2 className="text-5xl font-extrabold text-center mb-16 
                       text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          Professional Evolution 🚀
        </h2>

        {/* --- MAIN TIMELINE CONTAINER --- */}
        <div className="relative">
          
          {/* Central Vertical Line (Visible on md and up) */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-cyan-600/30"></div>
          
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0; // 0, 2, 4... will be on the left
            const variants = isLeft ? leftVariants : rightVariants;

            return (
              <motion.div
                key={exp.id}
                className={`flex mb-16 last:mb-0 ${isLeft ? 'justify-start' : 'justify-end'} w-full`}
                variants={variants}
                initial="hidden"
                whileInView="visible" 
                viewport={{ once: false, amount: 0.1 }} 
                transition={{ delay: index * 0.15 }}
              >
                {/* Timeline Dot (Centered on the line, visible on md and up) */}
                <div 
                  className={`hidden md:flex absolute top-0 w-8 h-8 rounded-full 
                             bg-cyan-600 border-4 border-[#0f172a] shadow-xl shadow-cyan-500/50 
                             items-center justify-center text-white font-bold z-10`}
                  style={{ left: '50%', transform: 'translateX(-50%)' }}
                >
                  {index + 1}
                </div>

                {/* Experience Card Container (50% width on desktop) */}
                <div 
                  className={`w-full md:w-5/12 ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}
                >
                  <ExperienceCard experience={exp} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;