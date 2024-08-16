import React, {useState, useEffect, useContext} from 'react';

import '../Transcriptions/transcriptions.css';
import {UserContext} from "../../UserContext";
import SearchTool from "./SearchTool"
import PublicTranscriptions from "./PublicTranscriptions";
import UserTranscriptions from "./UserTranscriptions";
import SelectedUserTranscription from "./SelectedUserTranscription";
import SelectedPublicTranscription from "./SelectedPublicTranscription";

const Transcription = () => {
    const { userId } = useContext(UserContext);

    //store fetched transcriptions
    const [userTranscriptions, setUserTranscriptions] = useState([]);
    const [publicTranscriptions, setPublicTranscriptions] = useState([]);

    //set selected transcription and form open
    const [transcriptionOpen, setTranscriptionOpen] = useState(false);
    const [selectedUserTranscription, setSelectedUserTranscription] = useState(null);
    const [selectedPublicTranscription, setSelectedPublicTranscription] = useState(null);


    const [transcriptionSearchTerm, setTranscriptionSearchTerm] = useState('');

    //To get user transcriptions upon userId being set
    useEffect(() => {
        // Check if userId is set
        if(userId != null) {
            // Fetch transcriptions from the API
            fetch(`/api/transcription/${userId}/display`)
                .then((response) => response.json())
                .then((data) => setUserTranscriptions(data))
                .catch((error) => console.error("Error fetching transcriptions:", error));
        } else {
            console.log("User ID is not set. Can't fetch transcriptions.");
        }
    }, [userId]);

    //To get public transcriptions upon opening the page
    useEffect(() => {
        // Fetch transcriptions from the API
        fetch(`/api/transcription/1/display`)
            .then((response) => response.json())
            .then((data) => setPublicTranscriptions(data))
            .catch((error) => console.error("Error fetching transcriptions:", error));
    }, []);


    //To set form open and selected transcription index when a transcription is clicked
    const handleUserTranscriptionClick = (transcriptionIndex) => {
        setSelectedUserTranscription(transcriptionIndex);
        setTranscriptionOpen(true);
    };

    const handlePublicTranscriptionClick = (transcriptionIndex) => {
        setSelectedPublicTranscription(transcriptionIndex);
        setTranscriptionOpen(true);
    };

    return (
        <div className="transcriptionsContainer">
            <h1>Manage Transcriptions</h1>
            <SearchTool
                setTranscriptionSearchTerm={setTranscriptionSearchTerm}
            />
            <h2>Off-the-shelf</h2>
            <PublicTranscriptions
                transcriptions={publicTranscriptions}
                transcriptionSearchTerm={transcriptionSearchTerm}
                handlePublicTranscriptionClick={handlePublicTranscriptionClick}
            />
            <h2>Customized</h2>
            <UserTranscriptions
                transcriptions={userTranscriptions}
                handleUserTranscriptionClick={handleUserTranscriptionClick}
            />

            <SelectedUserTranscription
                setSelectedUserTranscription={setSelectedUserTranscription}
                transcriptions = {userTranscriptions}
                selectedUserTranscription={selectedUserTranscription}
            />

            <SelectedPublicTranscription
                setSelectedPublicTranscription={setSelectedPublicTranscription}
                transcriptions = {publicTranscriptions}
                selectedPublicTranscription={selectedPublicTranscription}
            />

        </div>
    );
};

export default Transcription;
