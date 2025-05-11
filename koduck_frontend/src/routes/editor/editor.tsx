import React, { useState } from "react";
import ResizableGridLayout from "./resizableGridLayout";
import { useNavigate, useParams } from "react-router";
import BlockTabs from "@/features/tabs/tabs";
import Transcription from "../../features/transcription/transcriptionPanel";
import Pad from "../../features/blockEditor/pad";
import useTopics from "@/hooks/useTopics";

const Editor: React.FC = () => {
  const [audioBlob, setAudioBlob] = useState<Blob>();
  const [transcribedText, setTranscribedText] = useState("");
  const { topicId } = useParams();
  const [isListening, setIsListening] = useState(false);
  const { topics } = useTopics();
  const navigate = useNavigate();

  const handleSwipeDown = () => {
    if (!topics) return;
    const currIndex = topics.findIndex((topic) => topic.id === topicId);
    const nextIndex = (currIndex + 1) % topics.length;
    navigate(`/editor/${topics[nextIndex].id}`);
  };

  return (
    <>
      <ResizableGridLayout handleSwipeDown={handleSwipeDown}>
        <Pad
          setAudioBlob={setAudioBlob}
          isListening={isListening}
          setIsListening={setIsListening}
          audioBlob={audioBlob}
        />
        <BlockTabs />
        <Transcription
          transcribedText={transcribedText}
          setTranscribedText={setTranscribedText}
          topicId={topicId}
          audioBlob={audioBlob}
        />
      </ResizableGridLayout>
    </>
  );
};

function EditorWrapper() {
  const { topicId } = useParams();
  return <Editor key={topicId} />;
}

export default EditorWrapper;
