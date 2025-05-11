import React, { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import TranscribeIcon from "@mui/icons-material/Transcribe";
import Tooltip from "@mui/material/Tooltip";
import { enqueueSnackbar } from "notistack";
import { getUrlGet, transcribe } from "../../service/api";
import { IconLoading } from "@arco-design/web-react/icon";

interface TranscriptionPanelProps {
  audioBlob: Blob | undefined;
  speech: string | undefined;
  setText?: Dispatch<SetStateAction<string>>;
}

const TranscriptionPanel: React.FC<TranscriptionPanelProps> = ({
  audioBlob,
  speech,
  setText = () => {},
}) => {
  const [loading, setLoading] = useState(false);

  const handleFeedbackClick = async () => {
    setLoading(true);

    let speechId = speech && parseInt(speech, 10);

    if (!speechId || isNaN(speechId)) {
      enqueueSnackbar(
        "Please select a speech before submitting for feedback  ",
        { variant: "info" }
      );

      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      enqueueSnackbar("You must be logged in to receive feedback.", {
        variant: "warning",
      });

      setLoading(false);
      return;
    }

    if (!audioBlob) {
      enqueueSnackbar("No audio to upload. Please record your speech first.", {
        variant: "warning",
      });
      setLoading(false);
      return;
    }

    if (audioBlob.size === 0) {
      enqueueSnackbar(
        "The recorded audio file is empty. Please try recording again.",
        { variant: "warning" }
      );
      setLoading(false);
      return;
    }

    if (audioBlob.type !== "audio/wav") {
      enqueueSnackbar("The audio format must be WAV.", { variant: "warning" });
      setLoading(false);
      return;
    }

    let uploadUrl = "";
    let publicUrl = "";

    try {
      const response = await getUrlGet();

      if (response.status === 200) {
        uploadUrl = response.data.url;
        publicUrl = response.data.public;
      } else {
        enqueueSnackbar("Failed to receive upload url", { variant: "error" });
        return;
      }

      const uploadResponse = await axios.put(uploadUrl, audioBlob, {
        headers: {
          "Content-Type": "audio/wav",
        },
      });
      if (uploadResponse.status === 200) {
        console.log("Access the audio at: ", publicUrl);

        try {
          const audioCheckResponse = await axios.get(publicUrl, {
            headers: { "Content-Type": "audio/wav" },
          });

          const contentLength = audioCheckResponse.headers["content-length"];
          if (audioCheckResponse.status === 200 && contentLength > 0) {
            console.log(
              "Audio is accessible and valid with size:",
              contentLength,
              "bytes"
            );
            enqueueSnackbar("Audio successfully uploaded and is accessible!", {
              variant: "success",
            });
          } else {
            console.error(
              "Uploaded audio is either not accessible or the file is empty (0KB)."
            );
            enqueueSnackbar(
              "Uploaded audio is either not accessible or the file is empty.",
              { variant: "error" }
            );
            return;
          }
        } catch (error) {
          console.error(
            "An error occurred while accessing the uploaded audio:",
            error
          );
          enqueueSnackbar("Error accessing uploaded audio.", {
            variant: "error",
          });
          return;
        }
      } else {
        console.error("Failed to upload the audio");
        enqueueSnackbar("Failed to upload audio", { variant: "error" });
        return;
      }
    } catch (error) {
      console.error("An error occurred while fetching url:", error);
    }

    try {
      const transcription = await transcribe({ url: publicUrl });
      setText((prev) => prev + " " + transcription.data.text);
    } catch (error) {
      console.error("An error occurred while processing feedback:", error);
      enqueueSnackbar("An error occurred while processing feedback", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tooltip title="Click to transcribe" placement="right">
      {loading ? (
        <IconLoading style={{ fontSize: 30 }} />
      ) : (
        <TranscribeIcon
          onClick={handleFeedbackClick}
          sx={{
            bottom: "0px",
            right: "0px",
            width: "50px",
            height: "30px",
            padding: "0.4rem",
            backgroundColor: "#ffffff" /* Changed from #000000 to white */,
            color:
              "#000" /* Changed text color to black for better visibility */,
            borderRadius: "0" /* Changed from 50% (circle) to 0 (square) */,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background-color 0.3s ease, transform 0.3s ease",
          }}
        >
          {/* {loading ? <CircularProgress style={{ color: '#fff',width:"100%", height:"100%"}} /> : <SendIcon sx={{width:"100%", height:"100%"}} />} */}
        </TranscribeIcon>
      )}
    </Tooltip>
  );
};

export default TranscriptionPanel;
