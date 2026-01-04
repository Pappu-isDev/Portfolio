"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiArrowLeft, FiHeart } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { isAdmin } = useAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/projects/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch project');
        }
        const data = await response.json();
        if (data.success) {
          setProject(data.data);
        } else {
          throw new Error(data.error || 'Project not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  const handleLike = async () => {
    if (!project) return;

    try {
      const response = await fetch(`/api/projects/${project._id}/like`, {
        method: 'POST',
      });

      if (response.ok) {
        const updatedProject = await response.json();
        setProject(updatedProject);
      } else {
        console.error('Failed to like project');
      }
    } catch (error) {
      console.error('Error liking project:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-200 flex items-center justify-center">
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-center"
        >
          <div className="text-4xl mb-4">🔄</div>
          <p className="text-lg font-medium">Loading project details...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-200 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-red-300/80 p-8 bg-red-500/10 rounded-2xl border border-red-500/20 backdrop-blur-sm max-w-md"
        >
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Project Not Found</h2>
          <p className="text-red-300/70 mb-4">{error || 'The project you\'re looking for doesn\'t exist.'}</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            Back to Projects
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-200">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800/60 hover:bg-gray-700/60 rounded-lg border border-gray-700/50 backdrop-blur-sm transition-colors mb-6"
        >
          <FiArrowLeft size={18} />
          <span>Back to Projects</span>
        </motion.button>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Project Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/60 to-black/40 border border-gray-800 shadow-2xl">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Project Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="order-1 lg:order-2 space-y-6"
          >
            {/* Title and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {project.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                  {project.updatedAt !== project.createdAt && (
                    <span>Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {isAdmin() && (
                  <button
                    onClick={handleLike}
                    className="flex items-center gap-2 px-3 py-2 rounded-full bg-red-600/20 hover:bg-red-600/30 border border-red-600/40 text-red-300 text-sm font-medium transition-colors"
                  >
                    <FiHeart size={16} />
                    {project.likes || 0}
                  </button>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors"
                  >
                    <FiGithub size={18} />
                    <span>Code</span>
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <FiExternalLink size={18} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-cyan-400">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-600/30 text-cyan-300 text-sm font-medium"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Full Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-cyan-400">Project Description</h3>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Additional Details */}
            {(project.githubUrl || project.liveUrl) && (
              <div className="pt-6 border-t border-gray-800/50">
                <h3 className="text-lg font-semibold mb-3 text-cyan-400">Links</h3>
                <div className="flex flex-wrap gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/60 hover:bg-gray-700/60 rounded-lg border border-gray-700/50 backdrop-blur-sm transition-colors"
                    >
                      <FiGithub size={18} />
                      <span>View Source Code</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/60 hover:bg-indigo-700/60 text-white font-medium rounded-lg border border-indigo-600/50 backdrop-blur-sm transition-colors"
                    >
                      <FiExternalLink size={18} />
                      <span>View Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
