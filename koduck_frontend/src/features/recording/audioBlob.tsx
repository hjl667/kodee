import React from "react";

interface AudioBlobProps {
  audioBlob: Blob | undefined;
}

const AudioBlob: React.FC<AudioBlobProps> = ({ audioBlob }) => {
  return (
    <div className="w-full bg-white h-8 pt-3 mb-5">
      {audioBlob && (
        <audio
          controls
          className="lg:w-2/3 w-4/5"
          id={"audio-player"}
          style={{
            borderRadius: "0",
            display: "inline-block",
            backgroundColor: "white",
            height: "2rem",
          }}
        >
          <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default AudioBlob;
