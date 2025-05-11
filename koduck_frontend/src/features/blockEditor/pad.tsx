import { useEffect } from "react";
import AudioBlob from "../recording/audioBlob";
import ListenAnimation from "../recording/listenAnimation";
import Block from "./block";
import SimpleEditor from "./markdown";
import Microphone from "./microphone";
import useTopics from "@/hooks/useTopics";
import { formatJsonData } from "@/utils/utils";
import { Topic } from "@/types/tree";
import { useParams } from "react-router";

const Pad = ({ setAudioBlob, isListening, setIsListening, audioBlob }) => {
  const { topics, isLoading, handleUpdate } = useTopics();
  const { topicId } = useParams();

  return (
    <>
      <Block>
        {isLoading ? (
          <></>
        ) : (
          <SimpleEditor
            initialData={formatJsonData(topics, topicId)}
            handleUpdate={handleUpdate}
            topicId={topicId}
            parent={topics.find((topic) => topic.id === topicId.parent)}
          />
        )}
        {isLoading ? (
          <></>
        ) : (
          <input
            value={topics.find((topic) => topic.id === topicId).name}
            onChange={() => {}}
            className="w-full flex justify-between items-center px-2 py-1 bg-white-100 border border-t-0 border-gray-300 rounded-b"
          ></input>
        )}
        <div className="flex justify-between justify-center items-center px-2 py-1 bg-white-100 border border-t-0 border-gray-300 rounded-b">
          <Microphone
            setAudioBlob={setAudioBlob}
            isListening={isListening}
            setIsListening={setIsListening}
          />
          {isListening ? (
            <ListenAnimation />
          ) : (
            <AudioBlob audioBlob={audioBlob} />
          )}
          <button
            onClick={() => handleUpdate(topicId, JSON.stringify(text), parent)}
            className="mr-7 px-6 py-2 bg-white text-gray-900 font-medium tracking-wider rounded-none 
                            hover:bg-gray-100 hover:text-gray-900 hover:shadow-md
                            active:bg-gray-200 transition-all duration-300 
                            focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm"
          >
            save
          </button>
        </div>
      </Block>
    </>
  );
};

export default Pad;
