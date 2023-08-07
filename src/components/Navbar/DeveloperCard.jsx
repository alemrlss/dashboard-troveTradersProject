/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// DeveloperCard.js
import React from "react";

const DeveloperCard = ({ name, role, avatarUrl, githubUrl, linkedinUrl }) => {
  return (
    <div className="p-2 border rounded-md shadow-md flex items-center mb-2">
      <img
        className="w-10 h-10 rounded-full mr-3"
        src={avatarUrl}
        alt={`Avatar de ${name}`}
      />
      <div>
        <h3 className="text-sm font-semibold">{name}</h3>
        <p className="text-xs text-gray-600">{role}</p>
        <div className="flex mt-1">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mr-1 text-blue-500 hover:text-blue-600 text-xs"
          >
            GitHub
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 text-xs"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default DeveloperCard;
