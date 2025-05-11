import WriteAnimation from "@/features/createBar/WriteAnimation";
import React, { lazy } from "react";
const CreateArticle = lazy(
  () => import("../../features/createBar/create_article")
);
const ArticleList = lazy(() => import("../../features/createBar/articles"));

const Create: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-start sm:items-center sm:justify-center space-y-4 px-4">
      <div className="h-4"></div>
      <div className="flex flex-row justify-center items-center gap-4">
        <WriteAnimation />
        <div className="text-2xl sm:text-4xl text-center">
          Write a Mini Essay
        </div>
      </div>

      <CreateArticle />
      <ArticleList />
    </div>
  );
};

export default Create;
