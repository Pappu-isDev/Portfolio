"use client";
import React, { useState } from "react";
import ProjectsManager from "@/components/admin/ProjectsManager";
import SkillsManager from "@/components/admin/SkillsManager";
import ExperienceManager from "@/components/admin/ExperienceManager";

const PortfolioManager = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("skills");

  const tabs = [
    { id: "skills", label: "Skills", component: SkillsManager },
    { id: "projects", label: "Projects", component: ProjectsManager },
    { id: "experience", label: "Experience", component: ExperienceManager },
  ];

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex justify-center items-start">
      <div className="bg-gray-900 w-full max-w-6xl h-screen lg:h-auto lg:max-h-[90vh] lg:mt-10 lg:rounded-xl shadow-2xl flex flex-col border border-gray-800 overflow-hidden">
        
        <div className="flex items-center justify-between px-4 py-4 lg:px-6 border-b border-gray-800 bg-gray-900">
          <h1 className="text-lg lg:text-xl font-bold text-white">
            Manage Portfolio
          </h1>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-3xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="border-b border-gray-800 px-3 py-3 bg-gray-900">
          <div className="flex gap-1 bg-gray-800 p-1 rounded-lg overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`min-w-[110px] px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 lg:px-8 bg-gray-900">
          <div className="max-w-4xl mx-auto">
            {ActiveComponent && <ActiveComponent />}
          </div>
          <div className="h-24 lg:hidden" />
        </div>

      </div>
    </div>
  );
};

export default PortfolioManager;
