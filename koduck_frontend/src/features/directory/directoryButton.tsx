import React from "react";

const DirectoryButton = ({ setVisible }) => {
  return (
    <div>
      <button
        onClick={() => setVisible(true)}
        className="mr-7 px-6 py-2 bg-white text-gray-900 font-medium tracking-wider rounded-none 
                            hover:text-gray-900
                            active:bg-gray-200 transition-all duration-300 
                            focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
            clipRule="evenodd"
          />
        </svg>
        Directory
      </button>
    </div>
  );
};

export default DirectoryButton;
