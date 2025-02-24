import React, { useState, useEffect } from 'react';

import { Select } from '@arco-design/web-react';
import { useBreakpoint, isMobile } from '../../hooks/breakpoint';
import { useParams, useNavigate } from 'react-router-dom';
import { graphqlPost } from '../../service/api';

const Option = Select.Option;

const SpeechSelect = ({ setAudioUrl, setSpeech, setTerms, setStructure, setText, setSample, setCreating}) => {
  const [speeches, setSpeeches] = useState([]);
  const [selectedSpeechId, setSelectedSpeechId] = useState(null);

  const breakpoint = useBreakpoint();

  const { speechId } = useParams();
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchSpeeches = async () => {
      const token = localStorage.getItem('token');

      const query = `
        {
          speeches {
            id
            name
          }
        }
      `;

      try {
        const response = await graphqlPost(query);
        const { data: result } = response;
        const defaultSpeechId = speechId

        if (result.data && result.data.speeches) {
          const speeches = result.data.speeches;

          const deduplicatedSpeeches = Array.from(
            speeches.reduce((map, speech) => {
              map.set(speech.id, speech); 
              return map;
            }, new Map()).values()
          );

          setSpeeches(deduplicatedSpeeches);

          if (defaultSpeechId) {
            setSelectedSpeechId(defaultSpeechId);
          }
        } else {
          console.error('Failed to fetch speeches:', result.errors);
        }
      } catch (error) {
        console.error('Error fetching speeches:', error);
      }
    };

    fetchSpeeches();
  }, []);

  // useEffect to trigger speech selection after speeches state updates
  useEffect(() => {
    if (selectedSpeechId && speeches.length > 0) {
      handleSpeechSelect(selectedSpeechId);
    }
  }, [selectedSpeechId, speeches]);

  const handleSpeechSelect = async (speechId) => {
    try {
      // Step 1: Define the GraphQL query for fetching a speech by id
      const query = `
        query {
          speech(id: ${speechId}) {
            id
            name
            text
            audioUrl
            terms
            structure
            enSpeech
            creating
          }
        }
      `;
  
      // Step 2: Make the API request using fetch
      const response = await graphqlPost(query);
      const { data: result } = response;
  
      // Step 3: Check for errors in the response
      if (result.errors) {
        console.error("Error fetching speech: ", result.errors);
        return;
      }
  
      const speech = result.data.speech;
  
      if (!speech) {
        console.error("No speech found with the given ID");
        return;
      }
  
      // Step 4: Update the state with the fetched speech data
      setSelectedSpeechId(speech.id);
      setAudioUrl(speech.audioUrl);
      setSpeech(speech.id);
      setTerms(speech.terms);
      setStructure(speech.structure);
      setText(speech.text);
      setSample(speech.enSpeech);
      setCreating(speech.creating);
  
      // Step 5: Navigate to the `/playground/:id` route
      navigate(`/playground/${speech.id}`);
    } catch (error) {
      console.error("Error fetching speech: ", error);
    }
  };

  return (
    <Select
      className='bg-transparent'
      size={isMobile(breakpoint) ? 'small' : 'default'}
      bordered={false}
      placeholder='Select a Speech'
      value={selectedSpeechId}
      onChange={(e) => setSelectedSpeechId(e)}
      style={{
        height: "100%",
        width:"70%",
        border: "solid black 1px",
        minHeight: "2rem",
        borderRadius: "0.6rem",
        padding: "0.2rem 0.2rem",
      }}
    >
      {speeches.map((speech) => (
        <Option key={speech.id} value={speech.id}>
          <div className='text-base sm:text-base h-full lg:mt-2'>
            {speech.name}
          </div>
        </Option>
      ))}
    </Select>
  );
};

export default SpeechSelect;
