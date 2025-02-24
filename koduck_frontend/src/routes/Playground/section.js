import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const CollapsibleSection = ({ title, content }) => {
  const shouldBeOpen = (title) => {
    const lowercaseTitle = title.toLowerCase();
    return lowercaseTitle === "terms" || lowercaseTitle === "follow-up questions:";
  };

  const [isOpen, setIsOpen] = useState(shouldBeOpen(title));

  useEffect(() => {
    setIsOpen(shouldBeOpen(title));
  }, [title]);

  return (
    <div className="w-full max-w-lg mt-2 mx-auto">
      <div
        className="bg-white p-1 rounded-md shadow-lg hover:shadow-xl cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-sm ml-6 font-semibold text-gray-800">{title}</h3>
      </div>
      {isOpen && (
        <div className=" p-6 mt-2 rounded-md shadow-md">
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1 id={props.children[0].toLowerCase().replace(/\s+/g, '-')} className="text-xl font-bold mt-6 mb-4 text-gray-900" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 id={props.children[0].toLowerCase().replace(/\s+/g, '-')} className="text-lg font-semibold mt-4 mb-2 text-gray-800" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 id={props.children[0].toLowerCase().replace(/\s+/g, '-')} className="text-base font-medium mt-2 mb-2 text-gray-700" {...props} />
              ),
              p: ({ node, ...props }) => <p className="mb-4 text-gray-800" {...props} />,
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc list-inside mb-4 text-gray-800" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal list-inside mb-4 text-gray-800" {...props} />
              ),
              li: ({ node, ...props }) => <li className="mb-2" {...props} />,
              code: ({ node, inline, className, children, ...props }) => (
                inline ? (
                  <code className="bg-gray-200 rounded px-2 py-1 text-red-500" {...props}>
                    {children}
                  </code>
                ) : (
                  <pre className="bg-gray-800 text-gray-200 p-4 rounded mb-4 overflow-x-auto">
                    <code {...props}>{children}</code>
                  </pre>
                )
              ),
              a: ({ node, ...props }) => (
                <a className="text-blue-500 hover:underline" {...props} />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};
  
export default CollapsibleSection;