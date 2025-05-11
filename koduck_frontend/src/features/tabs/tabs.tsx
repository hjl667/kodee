import { Tabs } from "@arco-design/web-react";
import Directory from "@/features/directory/directory";
import useTreeView from "../directory/useTreeView";
import { useState } from "react";
import TextBox from "@/components/textBox";
import EmptyContentAnimation from "./EmptyContentAnimation";
import useTopics from "@/hooks/useTopics";
import useFeedback from "@/hooks/useFeedback";
import { useParams } from "react-router";

const FeedbackTab = ({ feedbacks }) => {
  const { topicId } = useParams();
  const records = feedbacks.filter(
    (feedback) => feedback.speech.id === topicId
  );
  const [feedback, setFeedback] = useState(
    records?.find((feedback) => topicId === feedback.speech.id)?.feedback
  );

  return (
    <>
      <div
        className="w-full"
        style={{
          height: "calc(100% - 80px)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {feedback ? <TextBox text={feedback} /> : <EmptyContentAnimation />}
      </div>
      <select
        onChange={(e) =>
          setFeedback(
            records?.find((record) => record.id == e.target.value)?.feedback
          )
        }
        className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-300 
                                rounded appearance-none focus:outline-none focus:ring-1 
                                focus:ring-gray-500 focus:border-gray-500 cursor-pointer"
      >
        {records && records.length > 0 ? (
          records.map((record) => (
            <option key={record.id} value={record.id} className="py-1">
              {record.dateCreated}
            </option>
          ))
        ) : (
          <option disabled>No feedback available</option>
        )}
      </select>
    </>
  );
};

const TabPane = Tabs.TabPane;
const textareaClasses = `
        w-full
        h-full
        flex
        p-2
        justify-center
        overflow-auto
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
    `.trim();

const BlockTabs = () => {
  const { convertToTreeData, updateTreeView } = useTreeView();
  const { topics, isLoading } = useTopics();
  const { feedbacks, isLoadingFeedback } = useFeedback();

  return (
    <div className={textareaClasses}>
      <Tabs defaultActiveTab="1" style={{ width: "100%", height: "100%" }}>
        <TabPane
          key="1"
          title="Directory"
          style={{ width: "100%", height: "100%" }}
        >
          <div
            className="h-full w-full"
            style={{ width: "100%", height: "100%" }}
          >
            {isLoading ? (
              <></>
            ) : (
              <Directory
                defaultData={convertToTreeData(topics)}
                updateTreeView={updateTreeView}
                articles={topics}
                isModal={false}
              />
            )}
          </div>
        </TabPane>
        <TabPane
          key="2"
          title="Feedbacks"
          style={{ width: "100%", height: "100%" }}
        >
          {isLoadingFeedback ? (
            <>Loading</>
          ) : (
            <FeedbackTab feedbacks={feedbacks} />
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default BlockTabs;
