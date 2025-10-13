import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const myName = process.env.NEXT_PUBLIC_NAME;
const gitUrl = process.env.NEXT_PUBLIC_GIT;
const linkUrl = process.env.NEXT_PUBLIC_LINKEDIN;
const mailUrl = process.env.NEXT_PUBLIC_GMAIL;
const naukriUrl = process.env.NEXT_PUBLIC_NAUKRI;

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold text-white">{myName}</h2>
          <p className="text-sm text-gray-400">
            Full-Stack Developer | React | Tailwind | Next.js
          </p>
        </div>
        <div className="flex space-x-4 md:space-x-6 text-xl items-center"> 
          <a
            href={gitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block" 
          >
            <div className="p-3 rounded-full bg-gray-800 border border-gray-700
                            transform group-hover:-translate-y-2 group-hover:shadow-lg group-hover:shadow-blue-500/50
                            transition-all duration-300 cursor-pointer">
              <FaGithub className="text-white text-xl md:text-2xl group-hover:text-blue-400 transition-colors" />
            </div>
          </a>
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="p-3 rounded-full bg-gray-800 border border-gray-700
                            transform group-hover:-translate-y-2 group-hover:shadow-lg group-hover:shadow-blue-500/50
                            transition-all duration-300 cursor-pointer">
              <FaLinkedin className="text-white text-xl md:text-2xl group-hover:text-blue-400 transition-colors" />
            </div>
          </a>
          <a
            href={naukriUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="p-3 rounded-full bg-gray-800 border border-gray-700
                            transform group-hover:-translate-y-2 group-hover:shadow-lg group-hover:shadow-blue-500/50
                            transition-all duration-300 cursor-pointer flex items-center justify-center">
              {typeof SiNaukri !== 'undefined' ? (
                <SiNaukri className="text-white text-xl md:text-2xl group-hover:text-blue-400 transition-colors" />
              ) : (
                <img src="/na.png" alt="Naukri" className="w-5 h-5 md:w-6 md:h-6 group-hover:brightness-125 transition-all" />
              )}
            </div>
          </a>
          <a
            href={mailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="p-3 rounded-full bg-gray-800 border border-gray-700
                            transform group-hover:-translate-y-2 group-hover:shadow-lg group-hover:shadow-blue-500/50
                            transition-all duration-300 cursor-pointer">
              <FaEnvelope className="text-white text-xl md:text-2xl group-hover:text-blue-400 transition-colors" />
            </div>
          </a>

        </div>
      </div>
      <div className="mt-6 text-center text-sm text-gray-500 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} {myName}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;