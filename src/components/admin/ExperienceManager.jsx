"use client";
import React, { useState, useEffect } from "react";

const ExperienceManager = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    location: "",
    period: "",
    description: "",
    techStack: "",
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await fetch("/api/experience");
      if (response.ok) {
        const data = await response.json();
        setExperiences(data);
      }
    } catch (error) {
      console.error("Error fetching experiences:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const experienceData = {
      ...formData,
      techStack: formData.techStack.split(",").map((tech) => tech.trim()),
      description: formData.description.split("\n").filter((line) => line.trim()),
    };

    try {
      const url = editing ? `/api/experience/${editing._id}` : "/api/experience";
      const method = editing ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(experienceData),
      });

      if (response.ok) {
        fetchExperiences();
        resetForm();
      }
    } catch (error) {
      console.error("Error saving experience:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/experience/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchExperiences();
      }
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  };

  const handleEdit = (experience) => {
    setEditing(experience);
    setFormData({
      jobTitle: experience.jobTitle,
      company: experience.company,
      location: experience.location,
      period: experience.period,
      description: experience.description.join("\n"),
      techStack: experience.techStack.join(", "),
    });
  };

  const resetForm = () => {
    setEditing(null);
    setFormData({
      jobTitle: "",
      company: "",
      location: "",
      period: "",
      description: "",
      techStack: "",
    });
  };

  if (loading) {
    return <div className="text-center py-8">Loading experiences...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Experience</h2>

      <form onSubmit={handleSubmit} className="mb-8 bg-gray-700 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Job Title *
            </label>
            <input
              type="text"
              value={formData.jobTitle}
              onChange={(e) =>
                setFormData({ ...formData, jobTitle: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-600 text-white rounded-md border border-gray-500 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Company *
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-600 text-white rounded-md border border-gray-500 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-600 text-white rounded-md border border-gray-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Period *
            </label>
            <input
              type="text"
              value={formData.period}
              onChange={(e) =>
                setFormData({ ...formData, period: e.target.value })
              }
              placeholder="e.g., Jan 2020 - Present"
              className="w-full px-3 py-2 bg-gray-600 text-white rounded-md border border-gray-500 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Tech Stack (comma-separated)
            </label>
            <input
              type="text"
              value={formData.techStack}
              onChange={(e) =>
                setFormData({ ...formData, techStack: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-600 text-white rounded-md border border-gray-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description (one point per line) *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={6}
              placeholder="• Point 1&#10;• Point 2&#10;• Point 3"
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
            {editing ? "Update Experience" : "Add Experience"}
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
        <h3 className="text-xl font-semibold">Existing Experiences</h3>
        {experiences.length === 0 ? (
          <p className="text-gray-400">No experiences found.</p>
        ) : (
          experiences.map((experience) => (
            <div
              key={experience._id}
              className="bg-gray-700 p-4 rounded-lg flex justify-between items-start"
            >
              <div className="flex-1">
                <h4 className="text-lg font-medium">
                  {experience.jobTitle} at {experience.company}
                </h4>
                <p className="text-gray-300 text-sm mt-1">
                  {experience.period}
                  {experience.location && ` • ${experience.location}`}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {experience.techStack.map((tech, index) => (
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
                  onClick={() => handleEdit(experience)}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(experience._id)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExperienceManager;
