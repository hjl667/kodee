import React from 'react';
import * as BiIcons from 'react-icons/bi';

function UserTranscriptions({ transcriptions, handleUserTranscriptionClick }) {
    return (
        <div className="gridContainer" id="secondGrid">
            {/* Placeholder for all transcriptions */}
            {transcriptions.map((transcription, index) => (
                <div
                    className="glossary"
                    key={index}
                    onClick={() => handleUserTranscriptionClick(index)}
                >
                    <BiIcons.BiArchive size={40} />
                    <p id="glossaryText">{transcription.name}</p> {/* Display transcription name */}
                </div>
            ))}

        </div>
    );
}

export default UserTranscriptions;