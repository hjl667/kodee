import React, { useState } from "react";
import {enqueueSnackbar} from "notistack";
import { glossaryGet } from '../../service/api'

const CreateGlossary = () => {
  const [prompt, setPrompt] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async () => {
    if (!prompt) {
      enqueueSnackbar('Please enter a prompt!', { variant: 'warning' });
      // alert("Please enter a prompt!");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      enqueueSnackbar('Please log in to create a new glossary.', { variant: 'error' });
      console.error('No token found. User might not be authenticated.');
      return;
    }

    setLoading(true);

    try {
      const response = await glossaryGet(prompt);

      if (response.status === 200) {
        const { data } = response;
        console.log("Glossary created", data);
        setUrl(data.glossary);
        setPrompt("");
      } else {
        enqueueSnackbar("Failed to create glossary.", { variant: 'error' });
        // alert("Failed to create glossary.");
      }
    } catch (error) {
      console.error("Error creating glossary:", error);
      enqueueSnackbar('An error occurred. Please try again.', { variant: 'error' });
      // alert("An error occurred. Please try again.");
    }finally {
      setLoading(false); // Stop loading when the process is complete
    }
  };

  const handleDownload = async () => {
    if (!url) {
      enqueueSnackbar('No glossary URL available for download.', { variant: 'warning' });
      // alert("No glossary URL available for download.");
      return;
    }

    try {
      // Trigger download of the glossary CSV file
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'glossary.csv'); // Set the file name for download
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      console.log("Downloading", url);
    } catch (error) {
      console.error("Error downloading the glossary:", error);
      enqueueSnackbar('An error occurred. Please try again.', { variant: 'error' });
      // alert("An error occurred during download. Please try again.");
    }
  };

  const renderButtonContent = () => {
    if (loading) {
      return "Creating Glossary..."; // Show when glossary is being created
    } else if (url) {
      return "Download"; // Show when glossary is ready for download
    } else {
      return "Create & Download"; // Default state, when no glossary is being created
    }
  };

  return (
    <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl mx-auto my-4 text-center">
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center border-2 border-gray-500 rounded-full p-2 md:p-3 bg-gray-100 flex-grow">
          <input
            type="text"
            placeholder="Enter prompt to create a glossary on any topic..."
            value={prompt}
            onChange={handleInputChange}
            disabled={loading}
            onKeyDown={(e)=>{if (e.key === 'Enter'){
              handleSubmit();
            }}}
            className="flex-1 border-none outline-none text-base md:text-lg lg:text-xl p-1 md:p-2 bg-gray-100"
          />
          <button onClick={handleSubmit} className="bg-transparent border-none cursor-pointer">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 17L15 12L10 7V17Z" fill="gray" />
            </svg>
          </button>
        </div>
        <button
          onClick={url ? handleDownload : handleSubmit}
          className="download-button bg-black text-white rounded-full px-3 py-3 border-2 border-gray-500 focus:border-gray-500 transition duration-300 hover:bg-gray-700 focus:outline-none focus:ring-0 sm:ml-4"
          disabled={loading}
        >
           {renderButtonContent()}
        </button>
      </div>
    </div>
  );

};

export default CreateGlossary;
