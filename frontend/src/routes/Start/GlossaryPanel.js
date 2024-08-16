import React, {useState} from 'react';
import SpeechRecognitionComponent from './SpeechRecognitionComponent';
import SelectGlossaryComponent from './SelectGlossaryComponent';

const GlossaryPanel = ({setGlossaryIds, glossaries, setInterimTranscription, setFinalTranscription, tableData}) => {
    const [selectedGlossaries, setSelectedGlossaries] = useState([]);

    const handleGlossaryChange = (selected) => {
        console.log('Selected glossaries:', selected);
        setSelectedGlossaries(selected || []);
        const selectedGlossaryIds = selected ? selected.map(option => option.value) : [];
        console.log('Selected glossary IDs:', selectedGlossaryIds);
        setGlossaryIds(selectedGlossaryIds);
    };

    return (
        <div className="glossaryPanel">
            <div className="prompts-header">INTELLIGENT PROMPTS</div>
            <div className="subtitle">you only look once</div>
            <div className="styled-table">
                <table>
                    <tbody>
                    {tableData.slice(-4).map((term, index) => (
                        <tr key={index}>
                            <td>{term.chineseTerm || ''}</td>
                            <td>{term.englishTerm || ''}</td>
                        </tr>
                    ))}
                    {Array.from({ length: 4 - Math.min(4, tableData.length) }).map((_, index) => (
                        <tr key={index + tableData.length}>
                            <td>{''}</td>
                            <td>{''}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <SpeechRecognitionComponent
                setInterimTranscription={setInterimTranscription}
                setFinalTranscription={setFinalTranscription}
            />
            <SelectGlossaryComponent
                glossaries={glossaries}
                selectedGlossaries={selectedGlossaries}
                handleGlossaryChange={handleGlossaryChange}
            />
        </div>
    );

};

export default GlossaryPanel;

