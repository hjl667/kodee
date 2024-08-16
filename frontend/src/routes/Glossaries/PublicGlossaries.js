import React from 'react';
import * as BiIcons from 'react-icons/bi';

//the PublicGlossaries component display public glossaries in a four column row wth a scroll bar
//the displayed glossaries change based on the value in the search bar
function PublicGlossaries({glossaries, searchTerm, handlePublicGlossaryClick }) {

    return (
        <div className="scrollContainer">
            {glossaries.filter((glossary) => {
                // If the search term is empty, return all glossaries
                if (searchTerm === '') {
                    return glossary;
                }
                // Else, return only glossaries that include the search term (case-insensitive)
                if (glossary.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return glossary;
                }
            }).map((glossary, index) => (
                <div
                    className="glossary"
                    key={index}
                    onClick={() => handlePublicGlossaryClick(index)}
                >
                    <BiIcons.BiBook size={40} />
                    <p id="glossaryText">{glossary.name}</p>
                </div>
            ))}
        </div>

    );
}

export default PublicGlossaries;
