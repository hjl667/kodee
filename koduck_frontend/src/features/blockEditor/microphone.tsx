import Recording from "../recording/recording";
import React, { Dispatch, SetStateAction } from "react";

interface MicrophoneProps {
  setAudioBlob: Dispatch<SetStateAction<Blob | undefined>>;
  setRecordingLength?: () => void;
  isListening: boolean;
  setIsListening: Dispatch<SetStateAction<boolean>>;
}

const Microphone: React.FC<MicrophoneProps> = ({
  setAudioBlob,
  isListening,
  setIsListening,
}) => {
  return (
    <div>
      <Recording
        setAudioBlob={setAudioBlob}
        setRecordingLength={() => {}}
        isListening={isListening}
        setIsListening={setIsListening}
      />
    </div>
  );
};

export default Microphone;
