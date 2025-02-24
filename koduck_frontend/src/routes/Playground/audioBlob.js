import React from "react";

const AudioBlob = ({audioBlob, recordingLength}) => {
    return (
        <div className="w-full bg-white h-8 pt-3">
            {audioBlob && (
                <audio controls className="lg:w-2/3 w-4/5" id={'audio-player'}  style={{
                    // width: '70%',
                    borderRadius: '0',
                    // backgroundColor: 'white',
                    display: 'inline-block',
                    backgroundColor : 'white',
                    height: '2rem',
                    // color: 'black',
                }}>
                    <source src={URL.createObjectURL(audioBlob)} type="audio/wav"/>
                    Your browser does not support the audio element.
                </audio>
            )}
            {audioBlob && (
                <div className="w-full inline-block" style={{width: '10%'}}>
                    <p className="pl-3">{recordingLength}s</p>
                </div>
            )}
        </div>
    )
}

export default AudioBlob;
