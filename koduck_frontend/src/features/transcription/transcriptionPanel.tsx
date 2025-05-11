import TranscriptionPanel from "./transcriptionIcon";
import Submit from "./submit";
import TextBox from "../../components/textBox";

const Transcription = ({
  transcribedText,
  setTranscribedText,
  topicId,
  audioBlob,
}) => {
  return (
    <>
      <div
        className="
            w-full
            h-full
            p-4
            relative
            text-base
            font-sans
            border
            border-gray-300
            border-d-0
            rounded-t
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-transparent
            overflow-hidden
            "
      >
        <div className="p-4 pb-14">
          <TextBox text={transcribedText} setText={setTranscribedText} />
        </div>
        <div className="absolute bottom-0 z-100 flex justify-between items-center px-2 py-1 bg-white-100 ">
          <div className="flex flex-row gap-3">
            <TranscriptionPanel
              speech={topicId}
              audioBlob={audioBlob}
              setText={setTranscribedText}
            />
            <Submit speechId={topicId} text={transcribedText} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Transcription;
