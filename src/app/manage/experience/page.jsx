"use client";
import React from "react";
import ExperienceManager from "@/components/admin/ExperienceManager";

const ManageExperiencePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Manage Experience</h1>
          <p className="text-gray-400">Add, edit, and delete your work experience</p>
        </div>
        <ExperienceManager />
      </div>
    </div>
  );
};

export default ManageExperiencePage;
