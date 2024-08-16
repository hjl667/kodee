import React from 'react';
import * as BiIcons from 'react-icons/bi';

function UserGlossaries({ glossaries, handleUserGlossaryClick }) {
    return (
        <div className="gridContainer" id="secondGrid">
            {glossaries.map((glossary, index) => (
                <div
                    className="glossary"
                    key={index}
                    onClick={() => handleUserGlossaryClick(index)}
                >
                    <BiIcons.BiBook size={40} />
                    <p id="glossaryText">{glossary.name}</p> {/* Display glossary name */}
                </div>
            ))}
        </div>
    );
}

export default UserGlossaries;
