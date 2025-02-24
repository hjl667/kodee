import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

import { getToken } from '../../utils';
import { speechCreationPost } from '../../service/api';
import { IconArrowRight, IconLoading, IconPlusCircle } from '@arco-design/web-react/icon';
import { Button, Input, Select } from "@arco-design/web-react";

const TextArea = Input.TextArea;
const Option = Select.Option;

const CreateArticle = () => {
  const [prompt, setPrompt] = useState("");
  const [extraPrompt, setExtraPrompt] = useState("");
  const [difficulty, setDifficulty] = useState("easy"); // Default to 'easy'
  const [loading, setLoading] = useState(false);
  const [showExtraPrompt, setShowExtraPrompt] = useState(false)

  const navigate = useNavigate();

  const handleInputChange = (value) => {
    setPrompt(value);
  };

  const handleExtraInputChange = (value) => {
    setExtraPrompt(value);
  };

  const handleDifficultyChange = (value) => {
    setDifficulty(value);
  };

  const handleSubmit = async () => {
    if (!prompt) {
      enqueueSnackbar('Please enter a prompt!', { variant: 'warning' });
      return;
    }

    const token = getToken();
    if (!token) {
      console.error("No token found. User might not be authenticated.");
      enqueueSnackbar('Please log in to create a new speech.', { variant: 'error' });
      return;
    }

    enqueueSnackbar('🤖 : Your speech is being created.', { variant: 'success' });
    setLoading(true);

    try {
      const response = await speechCreationPost({ extraPrompt, prompt, difficulty });

      if (response.status === 200) {
        const { data } = response;
        console.log("Response:", response);
        console.log("Speech creation initiated:", data);
        enqueueSnackbar('🤖 : Click to navigage to the Repository page to find your speech.', { variant: 'info' });
        navigate('/repository');
        setPrompt("");
      } else {
        enqueueSnackbar('Failed to initiate speech creation.', { variant: 'error' });
      }
    } catch (error) {
      console.error("Error initiating speech creation:", error);
      enqueueSnackbar('An error occurred. Please try again.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };


  const extraPromptPlaceholder = () => {
    switch (difficulty) {
      case 'easy':
        return 'Enter English terms you want to practise or any other information.';
      case 'medium':
        return 'Enter additional context for an interview preparation.';
      case 'hard':
        return 'Enter key information from your slides.';
      default:
        return 'Enter any additional information.';
    }
  };

  
  const mainPromptPlaceholder = () => {
    switch (difficulty) {
      case 'easy':
        return 'Enter any general topic.';
      case 'medium':
        return 'Enter your interview question.';
      case 'hard':
        return 'Enter a topic or theme for a presentation.';
      default:
        return 'Enter a topic or select one below';
    }
  };

  return (
    <div className="w-full lg:max-w-4xl box-border flex flex-col space-y-2">
      <div className="box-border py-2 border-2 rounded-lg">
        <TextArea
          style={{
            backgroundColor: "transparent",
            borderWidth: "0px",
          }}
          placeholder={mainPromptPlaceholder()} 
          value={prompt}
          onChange={handleInputChange}
          onKeyDown={(e)=>{
            if (e.key === 'Enter'){
              handleSubmit();
            }
          }}
          disabled={loading}
        />

        <div className="flex flex-row items-center justify-between px-2">
          <div className="flex flex-row items-center justify-start">
            <Select
              bordered={false}
              value={difficulty}
              onChange={handleDifficultyChange}
              className=""
              style={{
                border: "none",
                padding: "0px",
                width: "7rem",
                color: "rgb(var(--primary-6))",
              }}
            >
              <Option value="easy">general</Option>
              <Option value="medium">interview</Option>
              <Option value="hard">presentation</Option>
            </Select>

            <Button
              type="text"
              style={{
                border: "none",
                padding: "0px",
              }}
              onClick={() => setShowExtraPrompt(!showExtraPrompt)}
            >
              <IconPlusCircle />
              <span className="ml-0">
                Extra
              </span>
            </Button>
          </div>

          <Button
            shape="circle"
            type="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {
              loading ? (
                <IconLoading className="w-full h-full p-4"/>
              ) : (
                <IconArrowRight className="w-full h-full p-1"/>
              )
            }
          </Button>
        </div>
      </div>

      {showExtraPrompt && (
        <TextArea
          placeholder={extraPromptPlaceholder()} // Dynamic placeholder based on difficulty
          value={extraPrompt}
          onChange={handleExtraInputChange}
          rows="6"
        />
      )}
    </div>
  );
}

export default CreateArticle;
