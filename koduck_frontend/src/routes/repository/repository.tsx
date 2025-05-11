import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Directory from "../../features/directory/directory";
import useTreeView from "../../features/directory/useTreeView";
import { useBreakpoint, isMobile } from "../../hooks/breakpoint";
import { Modal } from "@arco-design/web-react";
import DirectoryButton from "../../features/directory/directoryButton";
import { Topic } from "@/types/tree";
import useTopics from "@/hooks/useTopics";
import MansoryCards from "@/features/cards/mansoryCards";

const Repository: React.FC = () => {
  const [filteredArticles, setFilteredArticles] = useState<Topic[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const breakpoint = useBreakpoint();
  const isMobileView = isMobile(breakpoint);
  const [visible, setVisible] = React.useState(false);
  const { topics, isLoading } = useTopics();

  const navigate = useNavigate();
  const { convertToTreeData, updateTreeView } = useTreeView();

  useEffect(() => {
    if (!topics) return;
    const filtered = topics.filter((article) =>
      article.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredArticles(filtered);
  }, [searchQuery, topics]);

  const handleCardClick = (id: string) => {
    navigate(`/editor/${id}`);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto my-4 rounded-lg px-4">
      <div className="flex justify-between items-center rounded-lg">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-sm w-2/5 p-2 border border-gray-300 rounded-full focus:outline-none focus:border-gray-500 placeholder-gray-500 text-gray-800"
        />
      </div>
      <div className="flex flex-col sm:flex-row w-full p-2 sm:p-14 text-sm text-gray-800 rounded-lg mt-4">
        {isMobileView ? (
          <div>
            <DirectoryButton setVisible={setVisible} />
            <Modal
              title="Directory"
              visible={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              autoFocus={false}
              footer={null}
              focusLock={true}
              style={{ width: "400px", maxWidth: "90%" }}
            >
              {topics && (
                <Directory
                  defaultData={convertToTreeData(topics)}
                  updateTreeView={updateTreeView}
                  articles={topics}
                  setFilteredArticles={setFilteredArticles}
                  isModal={true}
                />
              )}
            </Modal>
          </div>
        ) : (
          <div className="w-1/3 pr-6">
            {topics && (
              <Directory
                defaultData={convertToTreeData(topics)}
                updateTreeView={updateTreeView}
                articles={topics}
                setFilteredArticles={setFilteredArticles}
                isModal={false}
              />
            )}
          </div>
        )}
        {isLoading ? (
          <></>
        ) : (
          <MansoryCards
            isMobileView={isMobileView}
            filteredArticles={filteredArticles}
            handleCardClick={handleCardClick}
          />
        )}
      </div>
    </div>
  );
};

export default Repository;
