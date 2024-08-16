import React, {useState, useEffect, useContext} from 'react';
import './learningSpace.css'
import {UserContext} from "../../UserContext";

function TranscriptionToLearn() {
    // States
    const [transcriptions, setTranscriptions] = useState([]);
    const [selectedTranscription, setSelectedTranscription] = useState('');

    const [language, setLanguage] = useState('English'); // Default language
    const [translation, setTranslation] = useState('');
    const { userId } = useContext(UserContext);

    //To get user transcriptions upon userId being set
    useEffect(() => {
        // Check if userId is set
        if(userId != null) {
            // Fetch transcriptions from the API
            fetch(`/api/transcription/${userId}/display`)
                .then((response) => response.json())
                .then((data) => setTranscriptions(data))
                .catch((error) => console.error("Error fetching transcriptions:", error));
        } else {
            console.log("User ID is not set. Can't fetch transcriptions.");
        }
    }, [userId]);

    // Fetch Translation when transcription or language changes

    useEffect(() => {
        if (selectedTranscription && language) {

            // Assuming your Spring Boot API is running on localhost:8080, adjust if different
            const apiUrl = `/api/translate?selectedTranscription=${selectedTranscription}&language=${language}`;

            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.text();
                })
                .then(data => setTranslation(data))
                .catch(error => console.error('Error fetching translation:', error));

        }
    }, [selectedTranscription, language]);



    return (
        <div>
            <div className="selectContainer">
                <select className="transcriptionsSelect" onChange={(e) => setSelectedTranscription(e.target.value)}>
                    <option value="" disabled selected>Select...</option>
                    {transcriptions.map(t => <option key={t.id} value={t.content}>{t.name}</option>)}
                </select>

                <select className="LanguageSelect" value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="English">English</option>
                    <option value="Chinese">Chinese</option>
                </select>
            </div>

            <textarea className="transcriptionBox" value={selectedTranscription} readOnly />
            <textarea className="translation" value={translation} readOnly />
        </div>
    );
}

export default TranscriptionToLearn;
