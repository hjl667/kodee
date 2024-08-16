import React, {useState, useEffect, useContext} from 'react';
import axios from "axios";
import {UserContext} from "../../UserContext";


function SelectedPublicGlossary({userGlossaries, setUserGlossaries, setSelectedPublicGlossary, glossaries, selectedPublicGlossary}) {

    const { userId } = useContext(UserContext);
    //To save a public glossary as private glossary when save button is clicked

    if (selectedPublicGlossary === null) return null;

    const handleSaveGlossary = async () => {
        // Get the selected glossary
        const selectedGlossary = glossaries[selectedPublicGlossary];
        // Log the selected glossary to check its structure
        console.log(selectedGlossary);

        // Prepare the list of terms to be sent
        const terms = selectedGlossary.terms
            .filter(term => term.chineseTerm && term.englishTerm)
            .map(term => ({
                chineseTerm: term.chineseTerm,
                englishTerm: term.englishTerm,
            }));

        // Create a new glossary object with only the fields you want
        const savedGlossary = {
            name: `${selectedGlossary.name} - ${userId}`,
            language: selectedGlossary.language,
            dateCreated: selectedGlossary.dateCreated,
            terms: terms
        };

        console.log("Selected Glossary: ", selectedGlossary);
        console.log("First term: ", selectedGlossary.terms[0]);

        // Make the request to the server
        const response = await axios.post(`/api/glossary/${userId}`, savedGlossary, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Log the response for debugging
        console.log(response);

        // If the request was successful, add the saved glossary to the user's glossaries
        if (response.status === 200) {
            setUserGlossaries([...userGlossaries, response.data]);
        }
    };

    return (
        <div className="backdrop">
            <div className="glossaryForm">
                <div className="formContainer">
                    <button className="closeButton" onClick={() => setSelectedPublicGlossary(null)}>
                        X
                    </button>
                    <h3>{glossaries[selectedPublicGlossary].name}</h3> {/* Display the glossary name */}
                    <div className="formHeader">
                        <div className="headerText">
                            <p>Language: {glossaries[selectedPublicGlossary].language}</p> {/* Display language */}
                        </div>
                        <div className="headerButtons">
                            <button onClick={handleSaveGlossary}>Save</button>
                        </div>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th></th>
                            <th>Chinese Term</th>
                            <th>English Term</th>
                        </tr>
                        </thead>
                        {/* Here you would map over the terms of the selected glossary */}
                        {glossaries[selectedPublicGlossary].terms.map((term, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="checkbox"
                                    />
                                </td>
                                <td>{term.chineseTerm}</td> {/* Display Chinese Term */}
                                <td>{term.englishTerm}</td> {/* Display English Term */}
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SelectedPublicGlossary;
