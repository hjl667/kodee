import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from "../../UserContext";
import axios from "axios";
import * as XLSX from "xlsx";

//this component defined the search bar and add/delete buttons

function SearchTool({setTranscriptionSearchTerm}) {

    //to store transcription properties
    const [deleteTranscriptName, setDeleteTranscriptName] = useState("");
    const [dateCreated, setDateCreated] = useState('');
    const [transcriptionText, setTranscriptionText] = useState('');
    const [transcriptionName, setTranscriptionName] = useState('');

    //to set forms open/closed
    const [isAddTranscriptFormOpen, setAddTranscriptFormOpen] = useState(false);
    const [isDeleteTranscriptFormOpen, setDeleteTranscriptFormOpen] = useState(false);

    const { userId } = useContext(UserContext);

    async function handleAddTranscriptFormSubmit(e) {
        e.preventDefault();

        //const serverURL = 'http://localhost:8080';

        const response = await fetch(`/api/transcription/${userId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                dateCreated,
                name: transcriptionName,
                transcription: transcriptionText,
            }),
        });

        // Reset the form
        setDateCreated('');
        setTranscriptionName('');
        setTranscriptionText('');

        setAddTranscriptFormOpen(false);
    }

    const handleDeleteTranscriptFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`/api/transcription/${deleteTranscriptName}/delete`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.text();
                console.log(data);
                setDeleteTranscriptName(""); // Reset the input
                setDeleteTranscriptFormOpen(false); // Close the form
            }
        } catch (error) {
            console.error("An error occurred while deleting the transcript:", error);
        }
    };

    return (
        <div className="inputSelectContainer">
            <input type="text" placeholder="Search..." onChange={event => setTranscriptionSearchTerm(event.target.value)} />
            <select>
                <option>Chinese</option>
                <option>English</option>
                <option>All</option>
            </select>
            <button className="Button" onClick={() => setAddTranscriptFormOpen(true)}>
                ADD
            </button>
            <button className="deleteButton" onClick={() => setDeleteTranscriptFormOpen(true)}>
                DEL
            </button>
            {/* Render the form when isAddFormOpen is true */}
            {isAddTranscriptFormOpen && (
                <div className="backdrop">
                    <div className="glossaryForm">
                        <div className="formContainer">
                            <button className="closeButton" onClick={() => setAddTranscriptFormOpen(false)}>X</button>
                            {/* Form for adding transcriptions */}
                            <h3>Transcription</h3>
                            <form onSubmit={handleAddTranscriptFormSubmit}>
                                <div>
                                    <label>Transcription Name:</label>
                                    <input
                                        className="transcriptionInput"
                                        type="text"
                                        value={transcriptionName}
                                        onChange={(e) => setTranscriptionName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label>Date Created:</label>
                                    <input
                                        className="transcriptionInput"
                                        type="date"
                                        value={dateCreated}
                                        onChange={(e) => setDateCreated(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label>Transcription:</label>
                                    <textarea
                                        className="transcriptionInput"
                                        value={transcriptionText}
                                        onChange={(e) => setTranscriptionText(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="transcriptionFormSubmitButton">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteTranscriptFormOpen && (
                <div className="backdrop">
                    <div className="deleteForm">
                        <button className="closeButton" onClick={() => setDeleteTranscriptFormOpen(false)}>X</button>
                        <form onSubmit={handleDeleteTranscriptFormSubmit}>
                            <label>
                                Transcription Name:
                                <input
                                    className="deleteFormInput"
                                    type="text"
                                    value={deleteTranscriptName}
                                    onChange={(e) => setDeleteTranscriptName(e.target.value)}
                                    required
                                />
                            </label>
                            <button type="submit" className="transcriptionFormSubmitButton">Delete</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchTool;
