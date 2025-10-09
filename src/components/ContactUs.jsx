
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";


const ContactUs=()=> {
  return (
    <section id="contact" className="bg-gray-900 text-gray-300 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Contact Me</h2>
        <p className="text-gray-400 mb-12">
          Have a project in mind or just want to say hello? Feel free to reach
          out — I’d love to connect with you!
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Contact Info */}
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-blue-400 text-2xl" />
              <div>
                <h4 className="font-semibold text-white">Email</h4>
                <p>virender@example.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-blue-400 text-2xl" />
              <div>
                <h4 className="font-semibold text-white">Phone</h4>
                <p>+91 9350604018</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-blue-400 text-2xl" />
              <div>
                <h4 className="font-semibold text-white">Location</h4>
                <p>Haryana, India</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            className="bg-gray-800 rounded-xl shadow-lg p-6 space-y-4 text-left"
            
          >
            <div>
              <label className="block mb-2 text-sm text-gray-400">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-400">
                Your Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-400">
                Message
              </label>
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
export default ContactUs;