import React, { useState } from "react";
import { generateCapstoneProject } from "../utils/api.jsx";

import '../App.css';
const TitleGenerator = () => {
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    description: "",
    techStack: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Generate Capstone Project Details
  const handleGenerateProject = async () => {
    setLoading(true);
    setError("");
    try {
      const generatedProject = await generateCapstoneProject();
      setProjectDetails(generatedProject);
    } catch (error) {
      console.error("Error generating project:", error);
      setError("Failed to generate project details. Please try again.");
      setProjectDetails({ title: "", description: "", techStack: "" });
    }
    setLoading(false);
  };

  return (
  <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-4 p-4">
    {/* Left Card */}
    
    <div className="p-8 rounded-xl shadow-lg w-full max-w-md card bg-opacity-75 mb-4 md:mb-0">
      <h2 className="text-2xl font-bold text-blue-200 mb-3 text-center">
      InnoCapstone
      </h2>
  
      <p className="text-blue-100 font-thin mb-7 text-center md:text-left">
      InnoCapstone is an AI-powered tool that helps IT students
        create unique and innovative project titles. It ensures that each title is
        research-oriented and aligned with industry trends.
      </p>
  
      <button
        onClick={handleGenerateProject}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 mb-6"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Project"}
      </button>

      <p className="mt-5 text-sky-50 opacity-30 text-center">Developed by Jozel Viernes</p>
      <div>

      </div>
    </div>
  
    {/* Right Card */}
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md card">
      <h2 className="text-2xl font-bold text-blue-200 mb-6 text-center">
        Capstone Project Generator
      </h2>
  
      {/* Project Details Display */}
      {projectDetails.title && (
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-lg text-blue-100">Project Title:</h3>
            <p className="text-blue-100">{projectDetails.title}</p>
          </div>
  
          <div>
            <h3 className="font-bold text-lg text-blue-100">Description:</h3>
            <p className="text-blue-100">{projectDetails.description}</p>
          </div>
  
          <div>
            <h3 className="font-bold text-lg text-blue-100">Suggested Tech Stack:</h3>
            <p className="text-blue-100">{projectDetails.techStack}</p>
          </div>
        </div>
      )}
  
      {/* Error Display */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
  
      {/* Initial Prompt */}
      {!projectDetails.title && !loading && (
        <p className="text-blue-100 text-center mt-4">
          Click "Generate Project" to get a unique capstone project idea
        </p>
      )}
    </div>
  </div>
  
  );
};

export default TitleGenerator;