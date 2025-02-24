import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import CreateArticle from './create_article'
import ArticleList from './articles'


const Create = () => {
  return (
    <div className="w-full h-full flex flex-col items-start sm:items-center sm:justify-center space-y-4 px-4">
      <div className="h-4"></div>
      <div className="text-2xl sm:text-4xl text-center">
        Enter a topic to practice
      </div>
      <CreateArticle />
      <ArticleList />
    </div>
  );
};

export default Create;
