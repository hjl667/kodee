import React, { useState, useEffect } from 'react';

const RotatingTopics = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const topics = [
    "Genetics and Genomics",
    "Neuroscience and Cognitive Science",
    "Astrobiology and Exoplanet Research",
    "Biomedical Engineering",
    "Renewable Energy and Sustainable Technologies",
    "Microbiology and Infectious Diseases",
    "Materials Science and Nanotechnology",
    "CRISPR-Cas9 Gene Editing",
    "Biosensors in Medical Diagnostics",
    "Synthetic Biology and Gene Circuits",
  ];

  const interval = 2000

  useEffect(() => {
    const rotate = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % topics.length);
    }, interval);

    return () => clearInterval(rotate); // Cleanup the interval on component unmount
  }, [topics, interval]);

  return (
    <div className="flex justify-center items-center h-full">
      <div className="text-base text-gray-400 transition-opacity duration-500 ease-in-out">
        {topics[currentIndex]}
      </div>
    </div>
  );
};

export default RotatingTopics;
