import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

import {UserContext} from "../../UserContext";
import './styles/Glossaries.css';
import './styles/GlossaryForms.css';

import SearchTools from './SearchTools';
import PublicGlossaries from './PublicGlossaries';
import UserGlossaries from './UserGlossaries';
import SelectedUserGlossary from './SelectedUserGlossary';
import SelectedPublicGlossary from './SelectedPublicGlossary';

const Glossaries = () => {

    const { userId } = useContext(UserContext);
    const { utils } = XLSX;

    // To store the fetched glossaries
    const [userGlossaries, setUserGlossaries] = useState([]);
    const [publicGlossaries, setPublicGlossaries] = useState([]);


    //To set selected public glossary or user glossary and set form open
    const [selectedPublicGlossary, setSelectedPublicGlossary] = useState(null);
    const [selectedUserGlossary, setSelectedUserGlossary] = useState(null);
    const [isGlossaryOpen, setGlossaryOpen] = useState(false);


    //To set search term value to filter public glossaries
    const [searchTerm, setSearchTerm] = useState('');

    //fetch and set user glossaries upon userId being set
    useEffect(() => {
        if(userId) {
            fetch(`/api/glossary/${userId}/display`)
                .then((response) => response.json())
                .then((data) => setUserGlossaries(data))
                .catch((error) => console.error("Error fetching glossaries:", error));
        }
    }, [userId]);

    //fetch and set public glossaries upon opening the page
    useEffect(() => {
        const fetchGlossaries = async () => {
            try {
                const response = await axios.get('/api/glossary/1/display');
                setPublicGlossaries(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchGlossaries()
    }, []);

    //set selected glossary when a glossary is clicked
    //set glossary form open when a glossary is clicked
    const handlePublicGlossaryClick = (glossaryIndex) => {
        setSelectedPublicGlossary(glossaryIndex);
        setGlossaryOpen(true);
    };

    const handleUserGlossaryClick = (glossaryIndex) => {
        setSelectedUserGlossary(glossaryIndex);
        setGlossaryOpen(true);
    };


    return (
        <div className="glossariesContainer">
            <h1>Manage Glossaries</h1>
            <SearchTools
                setSearchTerm={setSearchTerm}
            />
            <h2>Off-the-shelf</h2>
            <PublicGlossaries
                glossaries={publicGlossaries}
                searchTerm={searchTerm}
                handlePublicGlossaryClick={handlePublicGlossaryClick}
            />
            <h2>Customized</h2>
            <UserGlossaries
                glossaries={userGlossaries}
                handleUserGlossaryClick={handleUserGlossaryClick}
            />
            <SelectedUserGlossary
                setSelectedUserGlossary={setSelectedUserGlossary}
                glossaries={userGlossaries}
                selectedUserGlossary={selectedUserGlossary}
            />
            <SelectedPublicGlossary
                userGlossaries={userGlossaries}
                setUserGlossaries={setUserGlossaries}
                setSelectedPublicGlossary={setSelectedPublicGlossary}
                glossaries={publicGlossaries}
                selectedPublicGlossary={selectedPublicGlossary}
            />
        </div>

    );
};

export default Glossaries;






