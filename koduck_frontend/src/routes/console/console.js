import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { graphqlPost } from '../../service/api';

const Console = () => {
  const [practices, setPractices] = useState([]);
  const [filteredPractices, setFilteredPractices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState({});
  const [selectedPracticeId, setSelectedPracticeId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPractices = async () => {
      const query = `
        {
          practicesByUser {
            id
            dateCreated
            translation
            feedback
            terms
            speech {
              id
              name
              audioUrl
            }
          }
        }
      `;
  
      try {
        const response = await graphqlPost(query)
        const { data: result } = response;
  
        if (result.data && result.data.practicesByUser) {
          const practices = result.data.practicesByUser;
          setPractices(practices);
          setFilteredPractices(practices);
        } else {
          console.error('Failed to fetch practices:', result.errors);
        }
      } catch (error) {
        console.error('Error fetching practices:', error);
      }
    };
  
    fetchPractices();
  }, []);

  useEffect(() => {
    const filtered = practices.filter(
      (practice) =>
        practice.speech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        practice.translation.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPractices(filtered);
  }, [searchQuery, practices]);

  const toggleExpand = (index) => {
    setExpanded((prevState) => ({ ...prevState, [index]: !prevState[index] }));
  };

  const truncateText = (text, length) => {
    if (text.length <= length) {
      return text;
    }
    return `${text.slice(0, length)}...`;
  };

  const handleCardClick = (id, feedback) => {
    const formattedFeedback = formatFeedback(feedback);
    localStorage.setItem('formattedFeedback', JSON.stringify(formattedFeedback));
    localStorage.setItem('selectedPracticeId', id);
    console.log(`Saved practice ID: ${id} and formatted feedback to local storage`);
    navigate(`/feedback/${id}`);
  };

  const handlePracticeAgainClick = (id, url) => {
    // Logic to start practicing the speech again
    localStorage.setItem('selectedSpeechUrl', url);
    localStorage.setItem('selectedSpeechId', id);
    navigate(`/playground/${id}`);
  };

  const formatHeadings = (content) => {
  
    const lines = content.split('\n');
    let firstHeadingFound = false;

    const formattedLines = lines.map(line => {
      let modifiedLine = line.replace(/\*/g, '');

    if (modifiedLine.startsWith('#')) {
        if (firstHeadingFound) {
          modifiedLine = `##${modifiedLine}`;
        } else {
          firstHeadingFound = true;
        }
    }
    return modifiedLine;
  });

    return formattedLines.join('\n');
  };
  

  const formatFeedback = (feedbackObjectString) => {
    const feedbackObject = JSON.parse(feedbackObjectString);
    let formatted = '';

    const expressions = feedbackObject.expression;
    const formattedExpressions = formatHeadings(expressions);
    const terms = feedbackObject.term;
    const formattedTerms = formatHeadings(terms);

    formatted += `${formattedExpressions}\n\n`;
    formatted += `\n\n`;
    formatted += `# 话题词汇积累\n\n`;
    formatted += `${formattedTerms}\n\n`;

    if (feedbackObject.questions) {
      const questions = feedbackObject.questions;
      formatted += `# Follow-up questions: \n\n${questions}\n\n`;
    }

    return formatted;
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto my-4 rounded-lg ">
      <div className="flex justify-end items-center p-4  rounded-lg">
        {/* <h1 className="text-lg font-semibold text-gray-100">..........</h1> */}
        <input
          type="text"
          placeholder="Search by speech title or translation..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-sm w-1/3 p-2 border border-gray-300 rounded-full focus:outline-none focus:border-gray-500 placeholder-gray-500 text-gray-800"
        />
      </div>
      <div className="w-full h-[calc(100vh-260px)] overflow-y-auto p-6 sm:p-14 text-sm  text-gray-800 rounded-lg mt-4">
        <div className="max-h-[70vh]">
          {filteredPractices.length > 0 ? (
            filteredPractices
              .slice()
              .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))
              .map((practice, index) => (
                <div key={index} className="p-6 border-b border-gray-200">
                  <h3
                    className="text-base font-semibold text-grey-600 hover:underline cursor-pointer"
                    onClick={() => handleCardClick(practice.id, practice.feedback)}
                  >
                    {practice.speech.name}
                  </h3>
  
                  <p className="text-gray-600 mt-2">
                    {expanded[index]
                      ? practice.translation
                      : truncateText(practice.translation, 200)}
                  </p>
  
                  <p className="text-gray-500 mt-2">
                    {new Date(practice.dateCreated).toLocaleDateString()}
                  </p>
  
                  <div className="flex flex-row space-x-4 mt-4">
                  <button
                    className="text-grey-500 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 shadow-md hover:shadow-lg px-3 py-1"
                    onClick={() => toggleExpand(index)}
                  >
                    {expanded[index] ? 'Show Less' : 'Read More'}
                  </button>

                  <button
                    className="text-grey-500 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 shadow-md hover:shadow-lg px-3 py-1"
                    onClick={() => handleCardClick(practice.id, practice.feedback)}
                  >
                    Feedback
                  </button>

                  <button
                    className="text-grey-500 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 shadow-md hover:shadow-lg px-3 py-1 hidden sm:block"
                    onClick={() => handlePracticeAgainClick(practice.speech.id, practice.speech.audioUrl)}
                  >
                    Practice this speech again
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center text-center">
              <p className="text-xl font-semibold text-gray-800">
                Your feedback sessions are empty.
              </p>
              <span className="ml-2 text-xl">💭</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );  
};


export default Console;
