import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {FormControlLabel, Switch} from "@mui/material";
import {enqueueSnackbar} from "notistack";
import { graphqlPost } from '../../service/api';

const Repository = () => {
    // class Repository extends React.PureComponent
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedArticleId, setSelectedArticleId] = useState(null);
    const [showPersonalSpeech, setShowPersonalSpeech] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
      const fetchSpeeches = async () => {
        const token = localStorage.getItem('token');

        const query = `
      {
        speeches {
          id
          name
          text
          audioUrl
          public
          dateCreated
          creating
        }
      }
    `;

        try {
          const response = await graphqlPost(query);
          const { data: result } = response;

          if (result.data && result.data.speeches) {
            const speeches = result.data.speeches;
            setArticles(speeches);
            setFilteredArticles(speeches);
          } else {
            enqueueSnackbar('Failed to fetch speeches.', { variant: "error" })
            console.error('Failed to fetch speeches:', result.errors);
          }
        } catch (error) {
          enqueueSnackbar('Error fetching speeches.', { variant: "error" })
          console.error('Error fetching speeches:', error);
        }
      };

      fetchSpeeches();
    }, []);

    useEffect(() => {
        const filtered = articles.filter(
            (article) =>
                article.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredArticles(filtered);
    }, [searchQuery, articles]);

    const handleCardClick = (id, url, creating) => {
        console.log(id,url,creating);
        setSelectedArticleId(id);
        navigate(`/playground/${id}`);
    };

    const handleIsShow = () => {
        setShowPersonalSpeech(!showPersonalSpeech);
    };

    return (
      <div className="relative w-full max-w-5xl mx-auto my-4 rounded-lg px-4">
        <div className="flex justify-between items-center rounded-lg">
          <div className="flex items-center space-x-4">
            <FormControlLabel control={<Switch defaultChecked onChange={handleIsShow} color={"#55585e"} sx={{
              '& .MuiSwitch-thumb': {
                  backgroundColor: '#374151',
              },
              '& .MuiSwitch-track': {
                  backgroundColor: '#81a69d',}

            }} />} label={showPersonalSpeech ? 'Private' : 'All Topics'} />

          </div>
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-sm w-2/5 p-2 border border-gray-300 rounded-full focus:outline-none focus:border-gray-500 placeholder-gray-500 text-gray-800"
          />
        </div>
        <div
          className="w-full overflow-y-auto p-2 sm:p-14 text-sm  text-gray-800 rounded-lg mt-4"
          // className="relative rounded-xl overflow-y-auto p-8 h-[calc(100vh-260px)]"
        >
          <div className="max-h-[70vh] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  gap-4">
            {filteredArticles.length > 0 ?
              (filteredArticles
                .filter(article => showPersonalSpeech ? !article.public : true) // Show personal speeches if toggle is on
                .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)) // Sorting by dateCreated in descending order
                .map((article, index) => (
                    <div
                        key={index}
                        className="col-span-1"
                        onClick={() => handleCardClick(article.id, article.audioUrl, article.creating)}
                        style={{backgroundColor: showPersonalSpeech?"rgb(129, 166, 157,0.4)":"rgba(134, 145, 163,0.3)", minHeight: "50px",padding: "1.5rem",height:"auto",borderRadius:"9px",maxHeight:"180px",overflowY:"scroll",scrollbarWidth:"none"}}
                    >
                        {article.name}
                    </div>
              ))
            ) : (
              <p className="text-gray-600">No articles found.</p>
            )}
          </div>
        </div>
      </div>
    );
};

export default Repository;
