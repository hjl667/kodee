import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { enqueueSnackbar } from "notistack";

import { Button } from "@arco-design/web-react";
import { useBreakpoint, isMobile } from "../../hooks/breakpoint";
import MicNoneIcon from "@mui/icons-material/MicNone";
import StopIcon from "@mui/icons-material/Stop";

interface RecordingProps {
  setAudioBlob: Dispatch<SetStateAction<Blob | undefined>>;
  setRecordingLength: Dispatch<SetStateAction<number | undefined>>;
  isListening: boolean;
  setIsListening: Dispatch<SetStateAction<boolean>>;
}

const Recording: React.FC<RecordingProps> = ({
  setAudioBlob,
  setRecordingLength,
  isListening,
  setIsListening,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [startTime, setStartTime] = useState<number | undefined>();
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();

  const intervalRef = useRef<NodeJS.Timeout>();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const startTimeRef = useRef<number | undefined>();

  const breakpoint = useBreakpoint();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const startRecordingLengthTimer = () => {
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsedSeconds = Math.floor(
        (Date.now() - (startTimeRef.current as number)) / 1000
      );
      setRecordingLength(elapsedSeconds);
    }, 1000);
  };

  const stopRecordingLengthTimer = () => {
    clearInterval(intervalRef.current);
    const finalLength = Math.floor(
      (Date.now() - (startTimeRef.current as number)) / 1000
    );
    setRecordingLength(finalLength);
  };

  const handleListen = () => {
    if (!isLoggedIn) {
      enqueueSnackbar("Please log in to start recording", { variant: "info" });
      return;
    }

    if (!isListening) {
      setIsListening(true);
      setAudioBlob(undefined);
      setStartTime(Date.now());

      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const newMediaRecorder: MediaRecorder = new MediaRecorder(stream);
          setMediaRecorder(newMediaRecorder);

          let chunks: Blob[] = [];
          newMediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data);
          };

          newMediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: "audio/wav" });
            setAudioBlob(blob);
            chunks = [];
            enqueueSnackbar("Recording stopped, audio saved", {
              variant: "success",
            });
          };

          newMediaRecorder.start();
          enqueueSnackbar("Recording started", { variant: "info" });
          startRecordingLengthTimer();

          timeoutRef.current = setTimeout(() => {
            newMediaRecorder.stop();
            setIsListening(false);
          }, 240000);
        })
        .catch((err) => {
          enqueueSnackbar("Microphone access denied", { variant: "error" });
        });
    } else {
      if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
      }

      clearTimeout(timeoutRef.current);
      setIsListening(false);
      stopRecordingLengthTimer();
    }
  };

  return (
    <div className="flex flex-row items-center space-x-4">
      <Button
        type="primary"
        shape={"circle"}
        size={isMobile(breakpoint) ? "small" : "default"}
        onClick={handleListen}
        className="sm:text-sm"
        style={{
          backgroundColor: "white",
          color: "black",
          border: "1px solid black",
          transition: "background-color 0.3s, color 0.3s",
          marginLeft: "0px",
          marginRight: "0px",
          marginTop: "0px",
          padding: "0.2rem",
          overflow: "hidden",
        }}
      >
        {isListening ? (
          <StopIcon
            sx={{
              width: "100%",
              height: "100%",
              color: "red",
              backgroundColor: "white",
            }}
          />
        ) : (
          <MicNoneIcon sx={{ width: "100%", height: "100%" }} />
        )}
      </Button>
    </div>
  );
};

export default Recording;
