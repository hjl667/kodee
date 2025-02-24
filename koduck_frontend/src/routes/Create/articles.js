import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Card, CardContent, Typography, Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { graphqlPost } from '../../service/api';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  const isLargeScreen = useMediaQuery('(min-width:1060px)');
  const isMediumScreen = useMediaQuery('(min-width:1060px)');
  const isSmallScreen = useMediaQuery('(min-width:900px)');

  // Determine the number of articles to display based on screen size
  let maxDisplayArticles = 6;
  if (isLargeScreen) {
    maxDisplayArticles = 5; // Display more articles on large screens
  } else if (isMediumScreen) {
    maxDisplayArticles = 4; // Display fewer articles on medium screens
  } else if (isSmallScreen) {
    maxDisplayArticles = 2; // Display fewer articles on small screens
  } else {
    maxDisplayArticles = 6; // Display the fewest articles on very small screens
  }

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpeeches = async () => {
      const query = `
        {
          speeches {
            id
            name
            text
            audioUrl
            public
          }
        }
      `;
  
      try {
        const response = await graphqlPost(query);
        const { data: result } = response;
  
        if (result.data && result.data.speeches) {
          // Now all speeches are in a single array from the same resolver
          const speeches = result.data.speeches;
  
          // Optionally filter or process speeches if needed
          setArticles(speeches);
          setFilteredArticles(speeches);
        } else {
          console.error('Failed to fetch speeches:', result.errors);
        }
      } catch (error) {
        console.error('Error fetching speeches:', error);
      }
    };
  
    fetchSpeeches();
  }, []);

  const handleCardClick = (id, url) => {
    localStorage.setItem('selectedSpeechUrl', url);
    localStorage.setItem('selectedSpeechId', id);

    setSelectedArticleId(id);
    console.log(`Saved speech ID: ${id} to local storage`);
    navigate(`/playground/${id}`);
  };

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  const selectedArticles = useMemo(() => {
    // Shuffle the filtered articles and select the first four
    return shuffleArray(filteredArticles).slice(0, 4);
  }, [filteredArticles]);

  return (
    <div className="w-full lg:max-w-4xl">
      <div className="flex lg:flex-none flex-col space-y-2 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-2">
        {selectedArticles.slice(0, maxDisplayArticles).map((article, index) => (
          <div
            key={article.id}
            className={"border-[1px] border-gray-200 rounded-lg py-2 px-4 lg:w-full lg:h-full cursor-pointer"}
            onClick={() => handleCardClick(article.id, article.audioUrl)}
          >
            <div>
              {article.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;