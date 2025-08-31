import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

export default function FeatureCard({ title, description, link }) {
  return (
    <div className="relative bg-white shadow rounded p-4 hover:shadow-lg flex flex-col justify-evenly">
      {/* link icon in top right */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-2 right-2 text-gray-500 hover:text-green-600"
      >
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      </a>

      {/* card content */}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <a href={link} className="text-green-600 font-medium">
        Read more
      </a>
    </div>
  );
}
