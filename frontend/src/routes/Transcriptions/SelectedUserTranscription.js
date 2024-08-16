import React, {useState, useEffect, useContext} from 'react';
import axios from "axios";

function SelectedUserTranscription({ transcriptions, setSelectedUserTranscription,  selectedUserTranscription }) {


    if (selectedUserTranscription === null) return null;
    return(
            <div className="backdrop">
                <div className="glossaryForm">
                    <div className="formContainer">
                        <button
                            className="closeButton"
                            onClick={() => setSelectedUserTranscription(null)}
                        >
                            X
                        </button>
                        <h3>{transcriptions[selectedUserTranscription]?.name}</h3>
                        <div className="formHeader">
                            <div className="headerText">
                                <p>Date created: {transcriptions[selectedUserTranscription]?.dateCreated}</p>
                            </div>
                        </div>
                        <textarea
                            readOnly
                            className="glossaryFormTextarea"
                            value={transcriptions[selectedUserTranscription]?.content}
                        />
                    </div>
                </div>
            </div>
        );
}

export default SelectedUserTranscription;