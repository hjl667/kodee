import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

import { getToken } from "@/utils/utils";
import useData from "../../hooks/useTopics";
import { FormControlLabel, Switch } from "@mui/material";
import {
  IconArrowRight,
  IconLoading,
  IconPlusCircle,
} from "@arco-design/web-react/icon";
import { Button, Input, Select } from "@arco-design/web-react";

const TextArea = Input.TextArea;

const CreateArticle = () => {
  const [prompt, setPrompt] = useState("");
  const [extraPrompt, setExtraPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [showExtraPrompt, setShowExtraPrompt] = useState(false);
  const [enableAI, setEnableAI] = useState(false);
  const { handleTopicCreation } = useData();

  const navigate = useNavigate();

  const handleInputChange = (value: string) => {
    setPrompt(value);
  };

  const handleExtraInputChange = (value: string) => {
    setExtraPrompt(value);
  };

  const handleSubmit = async () => {
    if (!prompt) {
      enqueueSnackbar("Please enter a prompt!", { variant: "warning" });
      return;
    }

    const token = getToken();
    if (!token) {
      console.error("No token found. User might not be authenticated.");
      enqueueSnackbar("Please log in to create a new speech.", {
        variant: "error",
      });
      return;
    }

    enqueueSnackbar("🤖 : Your speech is being created.", {
      variant: "success",
    });
    setLoading(true);

    handleTopicCreation(prompt, extraPrompt, enableAI);
  };

  return (
    <div className="w-full lg:max-w-4xl box-border flex flex-col space-y-2">
      <div className="box-border py-2 border-2 rounded-lg">
        <TextArea
          style={{
            backgroundColor: "transparent",
            borderWidth: "0px",
            resize: "vertical",
            minHeight: "80px",
            height: "auto",
          }}
          placeholder={"Enter a topic here..."}
          value={prompt}
          onChange={handleInputChange}
          disabled={loading}
        />

        <div className="flex flex-row items-center justify-between px-2">
          <div className="flex flex-row items-center justify-start">
            <div className="flex items-center space-x-4">
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked
                    onChange={() => setEnableAI((prev) => !prev)}
                    color={"primary"}
                    sx={{
                      "& .MuiSwitch-thumb": {
                        backgroundColor: "white",
                      },
                      "& .MuiSwitch-track": {
                        backgroundColor: "black",
                      },
                    }}
                  />
                }
                label={enableAI ? "optimize with AI" : "no edit"}
              />
            </div>

            <Button
              type="text"
              style={{
                border: "none",
                padding: "0px",
              }}
              onClick={() => setShowExtraPrompt(!showExtraPrompt)}
            >
              <IconPlusCircle />
              <span className="ml-0">title</span>
            </Button>
          </div>

          <Button
            shape="circle"
            type="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <IconLoading className="w-full h-full p-4" />
            ) : (
              <IconArrowRight className="w-full h-full p-1" />
            )}
          </Button>
        </div>
      </div>

      {showExtraPrompt && (
        <TextArea
          placeholder={"enter a title"}
          value={extraPrompt}
          onChange={handleExtraInputChange}
        />
      )}
    </div>
  );
};

export default CreateArticle;
