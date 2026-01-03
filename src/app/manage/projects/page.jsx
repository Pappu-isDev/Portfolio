"use client";
import React from "react";
import ProjectsManager from "@/components/admin/ProjectsManager";

const ManageProjectsPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Manage Projects</h1>
          <p className="text-gray-400">Add, edit, and delete your projects</p>
        </div>
        <ProjectsManager />
      </div>
    </div>
  );
};

export default ManageProjectsPage;
