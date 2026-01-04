"use client";
import React, { useState, useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiGithub, FiX, FiHeart } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
// Dynamic tag options will be generated from projects data

export default function ProjectsPage() {
  const { isAdmin } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTag, setActiveTag] = useState("All");

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

  // Generate dynamic tag options from projects data
  const tagOptions = React.useMemo(() => {
    const allTags = new Set();
    projects.forEach(project => {
      if (project.tags && Array.isArray(project.tags)) {
        project.tags.forEach(tag => allTags.add(tag));
      }
    });
    return ["All", ...Array.from(allTags).sort()];
  }, [projects]);

  const filtered = projects
    .filter((p) =>
      activeTag === "All" ? true : p.tags && p.tags.includes(activeTag)
    )
    .sort((a, b) => (b.likes || 0) - (a.likes || 0)); // Sort by likes descending

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
                      {project.tags && Array.isArray(project.tags) && project.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-300/90 border border-gray-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Like Button - Visible to all visitors */}
                    <button
                      onClick={() => handleLike(project._id)}
                      className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-600/20 hover:bg-red-600/30 border border-red-600/40 text-red-300 text-xs font-medium transition-colors"
                    >
                      <FiHeart size={14} />
                      {project.likes || 0}
                    </button>
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
                      <a
                        href={`/projects/${project._id}`}
                        className="px-3 py-1 rounded-full bg-indigo-600 text-sm text-white font-medium hover:brightness-110 inline-block text-center"
                      >
                        View Details
                      </a>
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


      </div>
    </section>
  );
}
