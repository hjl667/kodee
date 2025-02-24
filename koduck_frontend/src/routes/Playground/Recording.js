import React, { useEffect, useRef, useState } from "react";
import { enqueueSnackbar } from "notistack";

import { Button } from "@arco-design/web-react";
import { useBreakpoint, isMobile } from "../../hooks/breakpoint";
import { IconCustomerService, IconRecordStop } from "@arco-design/web-react/icon";
import MicNoneIcon from '@mui/icons-material/MicNone';
import StopIcon from '@mui/icons-material/Stop';

const Recording = ({setAudioBlob, audioBlob, setRecordingLength, recordingLength}) => {
  const [isListening, setIsListening] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [startTime, setStartTime] = useState(null); // Store the start time
  const [mediaRecorder, setMediaRecorder] = useState(null);  // MediaRecorder instance

  const intervalRef = useRef(null); // Reference for the interval
  const startTimeRef = useRef(null);

  const breakpoint = useBreakpoint();
  const timeoutRef = useRef(null);

  // Check if the user is logged in (i.e., if the token exists in localStorage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists, false otherwise
  }, []);

  const startRecordingLengthTimer = () => {
    startTimeRef.current = Date.now(); // Record start time
    intervalRef.current = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setRecordingLength(elapsedSeconds); // Update recording length every second
    }, 1000); // Update every second
  };

  const stopRecordingLengthTimer = () => {
    clearInterval(intervalRef.current); // Stop the timer
    const finalLength = Math.floor((Date.now() - startTimeRef.current) / 1000);
    setRecordingLength(finalLength); // Set final recording length
  };

  const handleListen = () => {
    if (!isLoggedIn) {
      enqueueSnackbar('Please log in to start recording', { variant: 'info' });
      return;
    }

    if (!isListening) {
      setIsListening(true);
      setAudioBlob(null);
      setStartTime(Date.now());  // Record start time

      // Request user microphone access
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const newMediaRecorder = new MediaRecorder(stream);
          setMediaRecorder(newMediaRecorder);

          let chunks = [];
          newMediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data);
          };

          newMediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'audio/wav' });
            setAudioBlob(blob);  // Save the audio blob to state
            chunks = [];
            enqueueSnackbar('Recording stopped, audio saved', { variant: 'success' });
          };

          newMediaRecorder.start();
          enqueueSnackbar('Recording started', { variant: 'info' });
          startRecordingLengthTimer();

          // Automatically stop recording after 4 minutes
          timeoutRef.current = setTimeout(() => {
            newMediaRecorder.stop();  // Stop the media recorder
            setIsListening(false);
          }, 240000);
        })
        .catch(err => {
          enqueueSnackbar('Microphone access denied', { variant: 'error' });
        });
    } else {
      // Stop the recorder manually
      if (mediaRecorder && mediaRecorder.state === 'recording') {
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
        // shape={isMobile(breakpoint) ? "circle" : "default"}
        shape={"circle"}
        size={isMobile(breakpoint) ? "small" : "default"}
        onClick={handleListen}
        className="sm:text-sm"
        style={{
          // backgroundColor: isListening ? "black" : "white",
          // color: isListening ? "white" : "black",
          backgroundColor  : "white",
          color : "black",
          border: "1px solid black",
          transition: "background-color 0.3s, color 0.3s",
          marginLeft: "0px",
          marginRight: "0px",
          marginTop: "0px",
          padding: "0.2rem",
          overflow: "hidden"
        }}
      >
        {
          // isMobile(breakpoint)
            // ?
              isListening
              ? <StopIcon sx={{width:"100%", height:"100%", color:"red", backgroundColor:"white"}}/>
              : <MicNoneIcon sx={{width:"100%", height:"100%"}} />
            // : isListening
            //   ? 'stop'
            //   : 'record'
        }
      </Button>
     {/*audioBlob && (
        <audio controls>
          <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      )}
      {audioBlob && (
        <div>
          <p>{recordingLength}s</p>
        </div>
      )*/}
    </div>
  );
};

export default Recording;
