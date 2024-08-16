import React, {useState} from 'react';

const TranscriptionPanel = ({setTranscritpion, handleUpload, finalTranscription, interimTranscription, glossaryIds, setTableData}) => {
    const [userInput, setUserInput] = useState('');

    const handleTextChange = async (event) => {
        const textValue = event.target.value;
        setUserInput(textValue.replace(finalTranscription + interimTranscription, ''));
        setTranscritpion(userInput)
        console.log('Glossary Ids:', glossaryIds);

        const url = new URL('/api/term/get');
        url.searchParams.append('text', textValue);
        url.searchParams.append('glossaryIds', glossaryIds.join(','));

        try {
            const response = await fetch(url.href);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            setTableData(data); // Store the received data in the state
        } catch (error) {
            console.error('Fetch error: ', error);
        }
    };

    return (
        <div className="transcriptionPanel">
            <div className="TopquoteIcon">"</div>
            <textarea
                value={finalTranscription + interimTranscription + userInput}
                placeholder="Transcription will appear here..."
                onChange={handleTextChange}
            />
            <div className="quoteIcon" onClick={handleUpload}>"</div>
        </div>
    );
}

export default TranscriptionPanel;
