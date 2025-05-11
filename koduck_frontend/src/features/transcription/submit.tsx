import React, { useState } from "react";
import { IconButton, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Tooltip from "@mui/material/Tooltip";
import { feedbackCreationPost } from "../../service/api";

interface SubmitProps {
  speechId: string | undefined;
  text: string;
  setFeedback?: (feeback: string) => void;
}

const Submit: React.FC<SubmitProps> = ({ speechId, text }) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    setLoading(true);
    const submit = async () => {
      const response = await feedbackCreationPost({
        speechId: speechId,
        speech: text,
      });
      // setFeedback(response.data.feedback);
      setLoading(false);
    };
    submit();
  };

  return (
    <Tooltip title="Submit to get feedback!" placement="right">
      <IconButton
        onClick={handleSubmit}
        sx={{
          bottom: "0px",
          right: "0px",
          width: "50px",
          height: "30px",
          padding: "0.4rem",
          backgroundColor: "#ffffff",
          color: "#000",
          borderRadius: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background-color 0.3s ease, transform 0.3s ease",
        }}
      >
        <>
          {loading ? (
            <CircularProgress
              style={{ color: "#fff", width: "100%", height: "100%" }}
            />
          ) : (
            <SendIcon sx={{ width: "100%", height: "100%" }} />
          )}
        </>
      </IconButton>
    </Tooltip>
  );
};

export default Submit;
