import React from "react";

const Playback = ({audioUrl}) => {
    return (
        <div className="w-full flex justify-center items-center bg-white h-8 pt-3">
            {audioUrl && (
                <audio controls className="lg:w-2/3 w-4/5" id="audio-player" style={{
                    borderRadius: '0',
                    display: 'inline-block',
                    backgroundColor: 'white',
                    height: '2rem',
                }}>
                    <source src={audioUrl} type="audio/wav"/>
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    )
}

export default Playback;