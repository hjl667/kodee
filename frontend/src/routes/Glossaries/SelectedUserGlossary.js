import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from "../../UserContext";
import axios from "axios";

function SelectedUserGlossary({ setSelectedUserGlossary, glossaries, selectedUserGlossary}) {

    const [selectedTerms, setSelectedTerms] = useState([]);
    const [newTerms, setNewTerms] = useState([]);
    const [refreshGlossaries, setRefreshGlossaries] = useState(false);
    const { userId } = useContext(UserContext);

    //to add new terms
    function handleAddRows() {
        setNewTerms([...newTerms, {}]);
    }

    function handleNewTermChange(index, field, value) {
        const updatedNewTerms = [...newTerms];
        updatedNewTerms[index][field] = value;
        setNewTerms(updatedNewTerms);
    }

    function handleAddTerms() {
        const glossaryName = glossaries[selectedUserGlossary].name;

        // Send a POST request to the server to add the new terms
        axios.post(`/api/term/${glossaryName}/addterms`, newTerms)
            .then(response => {
                if(response.status === 200){  // Or another appropriate success condition
                    setRefreshGlossaries(prevState => !prevState);
                    setNewTerms([]);
                } else {
                    // Handle error
                }
            })
            .catch(error => {
                // Handle error
            });
    }

    //to delete terms
    function handleTermSelect(term) {
        if (selectedTerms.some(selectedTerm => selectedTerm.id === term.id)) {
            setSelectedTerms(selectedTerms
                .filter(selectedTerm => selectedTerm.id !== term.id)
                .map(term => ({
                    chineseTerm: term.chineseTerm,
                    englishTerm: term.englishTerm
                }))
            );
        } else {
            setSelectedTerms([...selectedTerms, term].map(term => ({
                chineseTerm: term.chineseTerm,
                englishTerm: term.englishTerm
            })));
        }
    }

    function handleDeleteTerm() {
        const glossaryName = glossaries[selectedUserGlossary].name;

        // Send a DELETE request to the server to delete the selected terms
        axios.delete(`/api/term/${glossaryName}/deleteterms`, { data: selectedTerms })
            .then(response => {
                if(response.status === 200){  // Or another appropriate success condition

                    // If the request was successful, update the state
                    setRefreshGlossaries(prevState => !prevState);
                    console.log('Terms deleted successfully');
                } else {
                    // Handle error
                }
            })
            .catch(error => {
                // Handle error
            });
    }


    if (selectedUserGlossary === null) return null;

    function handleUploadPrivate() {
        try {
            if (!selectedUserGlossary) {
                console.error("Selected user glossary is not set.");
                return;
            }

            if (!userId) {
                console.error("Current user ID is not set. Can't make a POST request.");
                return;
            }

            // Create the data object to be sent in the request body
            const data = {
                name: `${selectedUserGlossary.name}_${userId}`,  // appending user ID to glossary name
                language: selectedUserGlossary.language,
                terms: selectedUserGlossary.terms,
                dateCreated: new Date().toLocaleDateString("en-CA"),
                // Add any other properties required by your backend API for creating a glossary
            };

            // Make the POST request to the backend API under user ID 1
            const response = axios.post(`/api/glossary/1`, data);

        } catch (error) {
            // Handle errors (if any)
            console.error("Error uploading the glossary:", error);
        }
    }

    return (
        <div className="backdrop">
            <div className="glossaryForm">
                <div className="formContainer">
                    <button className="closeButton" onClick={() => setSelectedUserGlossary(null)}>
                        X</button>
                    <h3>{glossaries[selectedUserGlossary].name}</h3> {/* Display the glossary name */}
                    <div className="formHeader">
                        <div className="headerText">
                            <p>Language: {glossaries[selectedUserGlossary].language}</p> {/* Display language */}
                            <p>Date created: {glossaries[selectedUserGlossary].dateCreated}</p> {/* Display date_created */}
                        </div>
                        <div className="headerButtons">
                            <button onClick={handleAddRows}>Add Rows</button>
                            <button onClick={handleDeleteTerm}>Delete Terms</button>
                            <button onClick={handleAddTerms}>Add Terms</button>
                            <button onClick={handleUploadPrivate}>Upload</button>

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
                        {glossaries[selectedUserGlossary].terms.map((term, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleTermSelect(term)}
                                    />
                                </td>
                                <td>{term.chineseTerm}</td> {/* Display Chinese Term */}
                                <td>{term.englishTerm}</td> {/* Display English Term */}
                            </tr>
                        ))}

                        {/* Inputs for the new terms */}
                        {newTerms.map((term, index) => (
                            <tr key={index}>
                                <td></td> {/* Empty cell for the checkbox */}
                                <td>
                                    <input
                                        type="text"
                                        value={term.chineseTerm || ''}
                                        onChange={(e) => handleNewTermChange(index, "chineseTerm", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={term.englishTerm || ''}
                                        onChange={(e) => handleNewTermChange(index, "englishTerm", e.target.value)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SelectedUserGlossary;
