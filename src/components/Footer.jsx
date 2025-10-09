
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

const myName = process.env.NEXT_PUBLIC_NAME;
const gitUrl = process.env.NEXT_PUBLIC_GIT;
const linkUrl = process.env.NEXT_PUBLIC_LINKEDIN;
const whatsUrl = process.env.NEXT_PUBLIC_WHATSAPP;
const mailUrl = process.env.NEXT_PUBLIC_GMAIL;
const naukriUrl = process.env.NEXT_PUBLIC_NAUKRI;
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold text-white">{myName}</h2>
          <p className="text-sm text-gray-400">
            Full-Stack Developer | React | Tailwind | Next.js
          </p>
        </div>

        {/* Social Links */}
        <div className="flex space-x-6 text-xl">
          <a
            href={gitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <FaLinkedin />
          </a>
          <a
            href={naukriUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <img src="/na.png" alt="naukri" className=" icon w-6 h-6 " />
          </a>
          <a
            href={mailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-6 text-center text-sm text-gray-500 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Virender. All rights reserved.
      </div>
    </footer>
  );
}


export default Footer
