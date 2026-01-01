"use client";
import React, { useState, useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiGithub, FiX } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
// const projectsData = [
//   {
//     id: 1,
//     title: "E-Commerce Clone",
//     tags: ["React", "Tailwind", "Stripe"],
//     desc: "A responsive e-commerce clone with product search, cart and checkout flow.",
//     image: "https://picsum.photos/800/600?random=11",
//     github: "https://github.com/yourname/ecommerce-clone",
//     live: "https://your-ecommerce.netlify.app",
//   },
//   {
//     id: 2,
//     title: "Logistics Dashboard",
//     tags: ["React", "Chart.js", "Node"],
//     desc: "Interactive dashboard for fleet & shipment visualization tailored for logistics.",
//     image: "https://picsum.photos/800/600?random=22",
//     github: "https://github.com/yourname/logistics-dashboard",
//     live: "",
//   },
//   {
//     id: 3,
//     title: "Portfolio Website",
//     tags: ["Vite", "React", "Tailwind"],
//     desc: "My personal portfolio with animations, projects and blog links.",
//     image: "https://picsum.photos/800/600?random=33",
//     github: "https://github.com/yourname/portfolio",
//     live: "https://your-portfolio.com",
//   },
// ];

const tagOptions = ["All", "React", "Tailwind", "Node", "Vite", "Chart.js", "Stripe"];

export default function ProjectsPage() {
  const { isAdmin } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTag, setActiveTag] = useState("All");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        // Assuming the API returns { success: true, data: [...] }
        setProjects(data.success ? data.data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleLike = async (projectId) => {
    try {
      const response = await fetch(`/api/projects/${projectId}/like`, {
        method: 'POST',
      });

      if (response.ok) {
        const updatedProject = await response.json();
        setProjects(projects.map(p =>
          p._id === projectId ? updatedProject : p
        ));
      } else {
        console.error('Failed to like project');
      }
    } catch (error) {
      console.error('Error liking project:', error);
    }
  };

  const filtered = projects.filter((p) =>
    activeTag === "All" ? true : p.tags.includes(activeTag)
  );

  return (
    <section className="min-h-screen py-16 px-6 bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-200">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-2">Projects</h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            Selected works with focus on frontend, animations and practical system design.
          </p>
        </header>

        {/* Tag Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {tagOptions.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                activeTag === tag
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 mt-12 p-8"
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-4xl mb-4"
            >
              🔄
            </motion.div>
            <p className="text-lg font-medium mb-2">Loading projects...</p>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center text-red-300/80 mt-12 p-8 bg-red-500/10 rounded-2xl border border-red-500/20 backdrop-blur-sm"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl mb-4"
            >
              ⚠️
            </motion.div>
            <p className="text-lg font-medium mb-2">Failed to load projects</p>
            <p className="text-red-300/70">{error}</p>
          </motion.div>
        )}

        {/* Project Grid */}
        {!loading && !error && (
          <motion.div
            layout
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((project, i) => (
              <motion.article
                key={project._id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.45, type: "spring" }}
                whileHover={{ scale: 1.02 }}
                className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/60 to-black/40 border border-gray-800 shadow-lg"
              >
                <div className="h-48 md:h-44 lg:h-56 w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 ease-out hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                  <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-2 flex-wrap">
                      {project.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-300/90 border border-gray-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Like Button - Only for Admin */}
                    {isAdmin() && (
                      <button
                        onClick={() => handleLike(project._id)}
                        className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-600/20 hover:bg-red-600/30 border border-red-600/40 text-red-300 text-xs font-medium transition-colors"
                      >
                        <FiHeart size={14} />
                        {project.likes || 0}
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
                      >
                        <FiGithub size={18} />
                      </a>
                    )}

                    {project.liveUrl && (
                      <button
                        onClick={() => setSelected(project)}
                        className="px-3 py-1 rounded-full bg-indigo-600 text-sm text-white font-medium hover:brightness-110"
                      >
                        View
                      </button>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="mt-12 text-center text-gray-400">
            No projects match "{activeTag}".
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => setSelected(null)}
              />
              <motion.div
                className="relative z-10 max-w-3xl w-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 shadow-2xl"
                initial={{ y: 40, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 30, opacity: 0, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
              >
                <div className="relative h-64 w-full">
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-4 right-4 bg-black/40 p-2 rounded-full hover:bg-black/30"
                  >
                    <FiX size={18} />
                  </button>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{selected.title}</h3>
                  <p className="text-gray-300 mb-4">{selected.desc}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {selected.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {selected.github && (
                      <a
                        href={selected.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 border border-gray-700"
                      >
                        <FiGithub /> <span>Code</span>
                      </a>
                    )}
                    {selected.live && (
                      <a
                        href={selected.live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:brightness-105"
                      >
                        <FiExternalLink /> <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
