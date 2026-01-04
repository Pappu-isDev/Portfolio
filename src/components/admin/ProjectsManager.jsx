"use client";
import React, { useState, useEffect } from "react";
import { useToast } from "../../context/ToastContext";
import ConfirmModal from "../ui/ConfirmModal";
import ImageUpload from "../ui/ImageUpload";

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmState, setConfirmState] = useState({ open: false, id: null, message: "" });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    githubUrl: "",
    liveUrl: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const data = await response.json();
        setProjects(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const token = localStorage.getItem("token");

    // Map frontend field names to backend model fields
    const projectData = {
      title: formData.title,
      description: formData.description,
      image: formData.imageUrl, // backend expects `image`
      liveUrl: formData.liveUrl,
      githubUrl: formData.githubUrl,
      tags: formData.technologies.split(",").map((tech) => tech.trim()), // backend expects `tags`
    };

    try {
      const url = editing ? `/api/projects/${editing._id}` : "/api/projects";
      const method = editing ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        await fetchProjects();
        resetForm();
        addToast("Saved successfully", "success");
      } else {
        addToast("Save failed", "error");
      }
    } catch (error) {
      console.error("Error saving project:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    setSubmitting(true);

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchProjects();
        addToast("Deleted successfully", "success");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (project) => {
    setEditing(project);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: (project.tags || []).join(", "),
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      imageUrl: project.image || "",
    });
  };

  const resetForm = () => {
    setEditing(null);
    setFormData({
      title: "",
      description: "",
      technologies: "",
      githubUrl: "",
      liveUrl: "",
      imageUrl: "",
    });
  };

  const handleLike = async (projectId) => {
    try {
      const response = await fetch(`/api/projects/${projectId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        await fetchProjects(); // Refresh the projects list to show updated likes
        addToast("Like updated successfully", "success");
      } else {
        addToast("Failed to update like", "error");
      }
    } catch (error) {
      console.error("Error updating like:", error);
      addToast("Error updating like", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      {submitting && (
        <div className="absolute inset-0 bg-gray-900/60 z-50 flex items-center justify-center rounded-lg backdrop-blur-sm">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6">Manage Projects</h2>

      <form onSubmit={handleSubmit} className="mb-8 bg-gray-700 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-600 text-white rounded-md border border-gray-500 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Technologies (comma-separated) *
            </label>
            <input
              type="text"
              value={formData.technologies}
              onChange={(e) =>
                setFormData({ ...formData, technologies: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-600 text-white rounded-md border border-gray-500 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              GitHub URL
            </label>
            <input
              type="url"
              value={formData.githubUrl}
              onChange={(e) =>
                setFormData({ ...formData, githubUrl: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-600 text-white rounded-md border border-gray-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Live URL
            </label>
            <input
              type="url"
              value={formData.liveUrl}
              onChange={(e) =>
                setFormData({ ...formData, liveUrl: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-600 text-white rounded-md border border-gray-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="md:col-span-2">
            <ImageUpload
              label="Project Image"
              value={formData.imageUrl}
              onChange={(url) => setFormData({ ...formData, imageUrl: url })}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className="w-full px-3 py-2 bg-gray-600 text-white rounded-md border border-gray-500 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
          >
            {editing ? "Update Project" : "Add Project"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Existing Projects</h3>
        {projects.length === 0 ? (
          <p className="text-gray-400">No projects found.</p>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              className="bg-gray-700 p-4 rounded-lg flex justify-between items-start"
            >
              <div className="flex-1">
                <h4 className="text-lg font-medium">{project.title}</h4>
                <p className="text-gray-300 text-sm mt-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {(project.tags || project.technologies || []).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-indigo-600 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(project)}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => setConfirmState({ open: true, id: project._id, message: "Are you sure you want to delete this project?" })}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <ConfirmModal
        open={confirmState.open}
        title="Delete Project"
        message={confirmState.message}
        onCancel={() => setConfirmState({ open: false, id: null, message: "" })}
        onConfirm={() => {
          const id = confirmState.id;
          setConfirmState({ open: false, id: null, message: "" });
          handleDelete(id);
        }}
      />
    </div>
  );
};

export default ProjectsManager;
