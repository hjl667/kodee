import React, {useEffect, useRef, useState} from "react";
import axios from "axios";

const SpeechRecognitionComponent = ({setInterimTranscription, setFinalTranscription}) => {

    const [selectedLang, setSelectedLang] = useState('en-US');
    const [isListening, setIsListening] = useState(false);
    const isListeningRef = useRef(isListening);

    const handleLanguageChange = (event) => {
        setSelectedLang(event.target.value);
    };

    //To create a new speech recognition object 'recognition'
    const recognition = new (
        window.SpeechRecognition ||
        window.webkitSpeechRecognition ||
        window.mozSpeechRecognition ||
        window.msSpeechRecognition)();

    //To configure recognition whenever recognition or selected language changes
    useEffect(() => {
        recognition.lang = selectedLang;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;
        //recognition.continuous = true;
    }, [recognition, selectedLang]);


    useEffect(() => {
        recognition.onresult = async (event) => {
            let interim_transcript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    setFinalTranscription((prevTranscription) => prevTranscription + event.results[i][0].transcript + ' ');
                } else {
                    interim_transcript += event.results[i][0].transcript;
                }
            }
            setInterimTranscription(interim_transcript);
        };

        recognition.onerror = (event) => {
            console.log('Error occurred in recognition: ' + event.error);
        };

        recognition.onend = () => {

            console.log(isListeningRef.current);
            if (isListeningRef.current) {
                recognition.start();
            }else{
                console.log("Speech recognition ended.");
            }
        };

    }, [recognition]);

    const handleListen = () => {
        setIsListening(!isListening);
    };

    useEffect(() => {
        isListeningRef.current = isListening;
        if (isListening) {
            recognition.start();
        } else {
            console.log(isListening);
            //recognition.abort();
            recognition.stop();
        }
    }, [isListening]);

    // const handleListen = () => {
    //     if (isListening) {
    //         console.log(isListening);
    //         recognition.abort();
    //         setIsListening(false);
    //     } else {
    //         setIsListening(true);
    //         console.log(isListening);
    //         recognition.start();
    //     }
    // };

    return (
        <div className="select-button-container">
            <label htmlFor="language"></label>
            <select id="language" value={selectedLang} onChange={handleLanguageChange}>
                <option value="en-US">English</option>
                <option value="zh-CN">Chinese</option>
            </select>
            <button onClick={handleListen}>
                {isListening ? 'Stop' : 'Start'}
            </button>
        </div>
    );
};

export default SpeechRecognitionComponent;
