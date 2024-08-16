import React, {useState, useEffect, useContext} from 'react';


function SelectedPublicTranscription({ setSelectedPublicTranscription, transcriptions, selectedPublicTranscription}) {

    if (selectedPublicTranscription === null) return null;

    return (
        <div className="backdrop">
            <div className="glossaryForm">
                <div className="formContainer">
                    <button
                        className="closeButton"
                        onClick={() => setSelectedPublicTranscription(null)}
                    >
                        X
                    </button>
                    <h3>{transcriptions[selectedPublicTranscription]?.name}</h3>
                    <div className="formHeader">
                        <div className="headerText">
                            <p>Date created: {transcriptions[selectedPublicTranscription]?.dateCreated}</p>
                        </div>
                    </div>
                    <textarea
                        readOnly
                        className="glossaryFormTextarea"
                        value={transcriptions[selectedPublicTranscription]?.content}
                    />
                </div>

            </div>
        </div>
    );
}

export default SelectedPublicTranscription;
