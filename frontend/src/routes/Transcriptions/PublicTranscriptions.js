import React from 'react';
import * as BiIcons from 'react-icons/bi';

//the PublicGlossaries component display public glossaries in a four column row wth a scroll bar
//the displayed glossaries change based on the value in the search bar
function PublicTranscriptions({transcriptions, transcriptionSearchTerm, handlePublicTranscriptionClick}) {

    return (
        <div className="scrollContainer">
            {transcriptions.filter((transcription) => {
                // If the search term is empty, return all transcriptions
                if (transcriptionSearchTerm === '') {
                    return transcription;
                }

                // Else, return only transcriptions that include the search term
                // Note: This is case-insensitive
                if (transcription.name.toLowerCase().includes(transcriptionSearchTerm.toLowerCase())) {
                    return transcription;
                }
            }).map((transcription, index) => (
                <div
                    className="glossary"
                    key={index}
                    onClick={() => handlePublicTranscriptionClick(index)}
                >
                    <BiIcons.BiArchive size={40} />
                    <p id="glossaryText">{transcription.name}</p>
                </div>
            ))}

        </div>
    );
}



export default PublicTranscriptions;