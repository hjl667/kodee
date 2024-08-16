import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from "../../UserContext";
import axios from "axios";
import * as XLSX from "xlsx";

//this component defined the search bar and add/delete buttons
//it takes setSearchTerm as input from its parent component
function SearchTools({setSearchTerm}) {

    //To set forms open, to be refactored
    const [isAddFormOpen, setAddFormOpen] = useState(false);
    const [isDeleteFormOpen, setIsDeleteFormOpen] = useState(false);

    //store properties of the new glossary
    const [glossaryName, setGlossaryName] = useState("");
    const [glossaryLanguage, setGlossaryLanguage] = useState("");
    const [glossaryTerms, setGlossaryTerms] = useState([
        { chineseTerm: "", englishTerm: "" },
    ]);
    const [selectedFile, setSelectedFile] = useState(null);

    const [deleteGlossaryName, setDeleteGlossaryName] = useState("");

    const { userId } = useContext(UserContext);

    //To close/open add form
    const handleAddButtonClick = () => {
        setAddFormOpen(true);
    };

    const handleCloseAddForm = () => {
        setAddFormOpen(false); // Close the form when needed
    };

    //To set properties
    const handleGlossaryNameChange = (event) => {
        setGlossaryName(event.target.value);
    };

    const handleGlossaryLanguageChange = (event) => {
        setGlossaryLanguage(event.target.value);
    };

    function handleTermChange(index, field, value) {
        const updatedGlossaryTerms = [...glossaryTerms];
        updatedGlossaryTerms[index][field] = value;
        setGlossaryTerms(updatedGlossaryTerms);
    }

    const handleAddNewTerm = () => {
        setGlossaryTerms([...glossaryTerms, { chineseTerm: "", englishTerm: "" }]);
    };

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const handleFileUpload = async () => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, {type: 'array'});

                // Get the first worksheet
                const worksheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[worksheetName];

                // Convert the worksheet to JSON
                const json = XLSX.utils.sheet_to_json(worksheet, {header: 1});
                console.log(json);

                // Exclude header row and map JSON to terms
                const newTerms = json.slice(1).filter(row => row[0] && row[1]).map(row => ({
                    chineseTerm: row[0],
                    englishTerm: row[1]
                }));

                // Update the state
                setGlossaryTerms(newTerms);
            };

            reader.readAsArrayBuffer(selectedFile);

        } else {
            alert("No file selected!");
        }
    }

    //to upload a glossary
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            // Create the data object to be sent in the request body
            const data = {
                name: glossaryName,
                language: glossaryLanguage,
                terms: glossaryTerms,
                dateCreated: new Date().toLocaleDateString("en-CA"),
                // Add any other properties required by your backend API for creating a glossary
            };

            if(userId != null) {
                // Make the POST request to the backend API
                const response = await axios.post(`/api/glossary/${userId}`, data);

                // Handle the response (optional)
                console.log(response.data); // You can handle the response data as needed

                // Reset the form fields and close the form after successful submission
                setGlossaryName("");
                setGlossaryLanguage("");
                setGlossaryTerms([{ chineseTerm: "", englishTerm: "" }]);
                setAddFormOpen(false);

            } else {
                console.log("User ID is not set. Can't make a POST request.")
            }
        } catch (error) {
            // Handle errors (if any)
            console.error("Error uploading the glossary:", error);
        }
    };


    //handle delete form
    const handleDeleteSubmit = async (event) => {
        event.preventDefault();

        // Make a DELETE request to the server
        const response = await fetch(`/api/glossary/${deleteGlossaryName}/delete`, {
            method: 'DELETE'
        });

        const data = await response.text();
        console.log(data);

        // Reset the form and close it
        setDeleteGlossaryName("");
        setIsDeleteFormOpen(false);
    };

    const handleCloseDeleteForm = () => {
        setDeleteGlossaryName("");
        setIsDeleteFormOpen(false);
    };


    return (
        <div className="inputSelectContainer">
            <input type="text" placeholder="Search..." onChange={event => setSearchTerm(event.target.value)} />
            <select>
                <option>Chinese</option>
                <option>English</option>
                <option>All</option>
            </select>
            <button className="deleteButton" onClick={() => setIsDeleteFormOpen(true)}>DEL</button>
            <button className="Button" onClick={handleAddButtonClick}>ADD</button>
            {/* Render the form when isAddFormOpen is true */}
            {isAddFormOpen && (
                <div className="backdrop">
                    <div className="glossaryForm">
                        <div className="formContainer">
                            <button className="closeButton" onClick={handleCloseAddForm}>
                                X
                            </button>
                            {/* Form for adding glossaries */}
                            <h3>Add Glossary</h3>
                            <form onSubmit={handleFormSubmit}>
                                <div>
                                    <label>Glossary Name:</label>
                                    <input
                                        className="glossaryInput"
                                        type="text"
                                        value={glossaryName}
                                        onChange={handleGlossaryNameChange}
                                    />
                                </div>
                                <div>
                                    <label>Glossary Language:</label>
                                    <input
                                        className="glossaryInput"
                                        type="text"
                                        value={glossaryLanguage}
                                        onChange={handleGlossaryLanguageChange}
                                    />
                                </div>
                                <table className="termTable">
                                    <thead>
                                    <tr>
                                        <th>Chinese Term</th>
                                        <th>English Term</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {glossaryTerms.map((term, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={term.chineseTerm}
                                                    onChange={(e) =>
                                                        handleTermChange(index, "chineseTerm", e.target.value)
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={term.englishTerm}
                                                    onChange={(e) =>
                                                        handleTermChange(index, "englishTerm", e.target.value)
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                <button type="button" onClick={handleAddNewTerm} className="addNewTermButton">
                                    Add New Term
                                </button>
                                <div className="fileUploadContainer">
                                    <input type="file" id="excelFile" accept=".xlsx" style={{display: 'none'}} onChange={handleFileSelect} />
                                    <button type="button" onClick={() => document.getElementById('excelFile').click()} className="browseButton">
                                        Browse
                                    </button>
                                </div>

                                <button type="button" onClick={handleFileUpload} className="fileUploadButton">
                                    Upload
                                </button>
                                <button type="submit" className="glossaryFormSubmitButton">Submit</button>

                            </form>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteFormOpen && (
                <div className="backdrop">
                    <div className="deleteForm">
                        <button className="closeButton" onClick={handleCloseDeleteForm}>X</button>
                        <form onSubmit={handleDeleteSubmit}>
                            <label>
                                Glossary Name:
                                <input
                                    className="deleteFormInput"
                                    type="text"
                                    value={deleteGlossaryName}
                                    onChange={(e) => setDeleteGlossaryName(e.target.value)}
                                />
                            </label>
                            <button type="submit" className="glossaryFormSubmitButton">Submit</button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}

export default SearchTools;
