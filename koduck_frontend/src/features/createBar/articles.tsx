import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useData from "@/hooks/useTopics";
import { Skeleton } from "@mui/material";
import { isMobile, useBreakpoint } from "@/hooks/breakpoint";

const ArticleList: React.FC = () => {
  const { topics, isLoading, error } = useData();
  const breakpoint = useBreakpoint();
  const isMobileView = isMobile(breakpoint);

  let maxDisplayArticles = 6;
  if (!isMobileView) {
    maxDisplayArticles = 4;
  } else {
    maxDisplayArticles = 6;
  }

  const navigate = useNavigate();

  const handleCardClick = (id: any, url: any) => {
    navigate(`/editor/${id}`);
  };

  function shuffleArray(array: any) {
    return array.sort(() => Math.random() - 0.5);
  }

  const selectedArticles = useMemo(() => {
    if (!topics) return [];
    return shuffleArray(topics).slice(0, 10);
  }, [topics]);

  if (isLoading) {
    return (
      <div className="w-full lg:max-w-4xl">
        <div className="flex lg:flex-none flex-col space-y-2 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-2">
          {Array(maxDisplayArticles)
            .fill(0)
            .map((_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                height={40}
                className="lg:w-full"
                animation="wave"
              />
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:max-w-4xl">
      <div className="flex lg:flex-none flex-col space-y-2 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-2">
        {selectedArticles.slice(0, maxDisplayArticles).map((article: any) => (
          <div
            key={article.id}
            className={
              "border-[1px] border-gray-200 rounded-lg py-2 px-4 lg:w-full lg:h-full cursor-pointer"
            }
            onClick={() => handleCardClick(article.id, article.audioUrl)}
          >
            <div>{article.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
