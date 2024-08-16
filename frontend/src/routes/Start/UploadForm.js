import React, {useContext, useState} from 'react';
import axios from "axios";
import {UserContext} from "../../UserContext";

const UploadForm = ({transcription, showUploadForm, setShowUploadForm}) => {
    const { userId } = useContext(UserContext);
    const [transcriptionName, setTranscriptionName] = useState('');

    if (!showUploadForm) return null;

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`/api/transcription/${userId}`, {
                name: transcriptionName,
                content: transcription,
                dateCreated: new Date().toISOString().slice(0, 10),
            });

            const uploadedTranscription = response.data;
            console.log('Uploaded Transcription:', uploadedTranscription);

            setShowUploadForm(false);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="backdrop">
            <div className="uploadForm">
                <div className="formContainer">
                    <button
                        className="closeButton"
                        onClick={() => setShowUploadForm(false)}
                    >
                        X
                    </button>
                    <h3>Upload a new transcription</h3>
                    <form onSubmit={handleFormSubmit}>
                        <div className="formHeader">
                            <div className="headerText">
                                <input
                                    type="text"
                                    className="transcriptionNameInput"
                                    placeholder="Transcription Name"
                                    value={transcriptionName}
                                    onChange={(e) => setTranscriptionName(e.target.value)}
                                />
                            </div>
                        </div>
                        <button type="submit" className="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UploadForm;

