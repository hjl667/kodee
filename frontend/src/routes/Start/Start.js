import React, { useState, useEffect, useContext } from 'react';
import TranscriptionPanel from './TranscriptionPanel';
import GlossaryPanel from './GlossaryPanel';
import UploadForm from './UploadForm';
import {UserContext} from "../../UserContext";
import './Start.css';
import axios from "axios";
import transcriptions from "../Transcriptions/Transcriptions";


//The start page has the following child components: TranscriptionPanel, GlossaryPanel, and UploadForm
//TranscriptionPanel has two child components called SpeechRecognitionComponent and SelectGlossaryComponent

const Start = () => {

    const { userId } = useContext(UserContext);

    const [glossaries, setGlossaries] = useState([]);
    const [glossaryIds, setGlossaryIds] = useState('');
    const [tableData, setTableData] = useState([]);
    const [interimTranscription, setInterimTranscription] = useState('');
    const [finalTranscription, setFinalTranscription] = useState('');
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [transcription, setTranscription] = useState('');

    useEffect(() => {
        if (!userId) return;

        fetch(`/api/glossary/${userId}/display`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(fetchedGlossaries => {
                const structuredGlossaries = fetchedGlossaries.map(glossary => ({
                    label: glossary.name,
                    value: glossary.id
                }));
                setGlossaries(structuredGlossaries);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }, [userId]);

    const handleUpload = () => {
        setShowUploadForm(true);
    };


    return (
        <div className="startContainer">
            <GlossaryPanel
                tableData={tableData}
                glossaries={glossaries}
                setGlossaryIds={setGlossaryIds}
                setInterimTranscription={setInterimTranscription}
                setFinalTranscription={setFinalTranscription}
            />
            <TranscriptionPanel
                setTranscritpion={setTranscription}
                glossaryIds={glossaryIds}
                setTableData={setTableData}
                interimTranscription={interimTranscription}
                finalTranscription={finalTranscription}
                handleUpload={handleUpload}
            />
            <UploadForm
                showUploadForm={showUploadForm}
                setShowUploadForm={setShowUploadForm}
                transcription={transcription}

            />
        </div>
    );
}

export default Start;
