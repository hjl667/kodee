import React, { useState, useEffect } from 'react';
import CollapsibleSection from '../../routes/Playground/section'
import { useParams } from 'react-router-dom';
import Playback from './playback';
import { graphqlPost } from '../../service/api';

const MarkdownDisplay = () => {
  const [sections, setSections] = useState([]);
  const { practiceId } = useParams();
  const [audio, setAudio] = useState();

  const fetchAudio = async (id) => {
    const num = parseInt(practiceId, 10);
    const query = `
      query {
        practice(id: ${num}) {
          terms
        }
      }
    `;
  
  
    try {
      const response = await graphqlPost(query);
      const { data: result } = response;
  
      if (result.errors) {
        console.error("Error fetching audio: ", result.errors);
        return;
      }
  
      const audioUrl = result.data.practice.terms;
      setAudio(audioUrl);
      
    } catch (error) {
      console.error("Error fetching audio:", error);
    }
  };

  useEffect(() => {
    const storedFeedback = localStorage.getItem('formattedFeedback');
    let markdownContent = "# Feedback:\n\nThis is where feedback will appear.";

    try {
      const parsedFeedback = storedFeedback ? JSON.parse(storedFeedback) : null;
      markdownContent = parsedFeedback || markdownContent;
      markdownContent = markdownContent.replace(/\\n/g, '\n');

      // Split content into sections based on h1 headings
      const sectionRegex = /^# .+$/gm;
      const sectionTitles = markdownContent.match(sectionRegex) || [];
      const sectionContents = markdownContent.split(sectionRegex).slice(1);

      const newSections = [];

      sectionTitles.forEach((title, index) => {
        const cleanTitle = title.replace('# ', '');
        let content = sectionContents[index].trim();
        newSections.push({ title: cleanTitle, content });
      });

      setSections(newSections);
    } catch (error) {
      console.error("Failed to parse stored feedback:", error);
    }

    fetchAudio(practiceId)
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto my-4 rounded-lg ">
      <div >
        <Playback
          audioUrl={audio}
        />
      </div>
      <div className="flex">
        <div className="w-full sm:w-full h-[680px] overflow-y-auto text-base  text-gray-800 rounded-lg">
          {sections.map((section, index) => (
            <CollapsibleSection key={index} title={section.title} content={section.content} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarkdownDisplay;
