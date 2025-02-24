import {enqueueSnackbar} from "notistack";
import React, { useState } from "react";
import AudioPlayer from "./audio_player";
import { useParams } from 'react-router-dom';
import { getToken } from "../../utils";
import { graphqlPost, createAudioPost } from '../../service/api';

const TopicDetail = ({setAudioUrl, audioUrl, creating, setCreating}) => {
    const [generatingAudio, setGeneratingAudio] = useState();
    const { speechId } = useParams();

    // setState function is asynchronous, so we need to use a local variable
    let Creating = true;
    let AudioUrl = '';

    // try to get the status of creating audio, try 10 times in 80 seconds
    const checkAudioCreatingTimer = (id) => {
        console.log(id);
        const timer = setInterval(async () => {
            await checkAudioId(id).then(() => {
                if (Creating === false) {
                    setAudioUrl(AudioUrl)

                    setCreating(false)
                    clearInterval(timer)
                }
            })
        }, 8000);
        setTimeout(() => clearInterval(timer), 80000)
    }

    const checkAudioId = async (id) => {
        const query = `
        query {
          speech(id: ${id}) {
            id
            name
            audioUrl
            creating
          }
        }
      `;

        try {
            const response = await graphqlPost(query);
            const { data: result } = response;
            if (result.errors) {
                console.error("Error fetching speech: ", result.errors);
                return;
              }
            if (result.data) {
                const speech = result.data.speech;
                setAudioUrl(speech.audioUrl)
                AudioUrl = speech.audioUrl
                setCreating(speech.creating)
                Creating = speech.creating
                console.log(speech)
            } else {
                return null
            }
        } catch (error) {
            enqueueSnackbar('Error fetching speeches.', {variant: "error"})
            return null
        }
    }

    const handleClickForAudio = async (speech) => {
        const token = getToken();
        const language = "en";
        speech = speechId;

        if (!token) {
            console.error("No token found. User might not be authenticated.");
            enqueueSnackbar("You must log in to generate an audio.", {variant: "warning"});    
            return;
        }

        setCreating(true);
        setGeneratingAudio(true);

        try {
            const response = await createAudioPost(speech, language);

            if (response.status === 200) {
                const { data } = response;
                console.log("Response:", data);
                checkAudioCreatingTimer(speech)
            } else {
                enqueueSnackbar("Failed to generate audio.", {variant: "error"})
            }
        } catch (error) {
            console.error("Error generating audio:", error);
            enqueueSnackbar("An error occurred. Please try again.", {variant: "error"})

        } finally {
            setGeneratingAudio(false);
        }
    };

    return (
        <>
          {audioUrl !== "null" && audioUrl !== null && audioUrl !== ''
            ? <AudioPlayer audioUrl={audioUrl}/>
            : <div className="flex items-center h-full">
                <div className="relative w-full h-full mx-auto my-4 rounded-lg bg-gray-100">
                  {/* Conditional rendering for audio */}
                  <div className="flex items-center lg:mt-4">
                      {
                          creating || generatingAudio ? ( // Check if audio is being generated
                              <p className="text-gray-600 italic mt-4 mb-6">Audio is being created...</p>) : (
                              <>
                                  <button
                                      className="px-2 py-1 rounded-lg ml-4 bg-black text-white hover:bg-white hover:text-black border border-black focus:outline-none focus:ring-2 focus:ring-black transition transform hover:scale-105 shadow-md hover:shadow-lg px-2 py-1 rounded-lg"
                                      onClick={() => handleClickForAudio()}
                                  >
                                      Generate
                                  </button>
                              </>
                          )}
                      {creating  || generatingAudio ? '' : <span className="text-gray-600 italic lg:mt-5 sm:mt-2 mb-6 inline px-2">Click to generate English audio</span>}
                  </div>
                </div>
              </div>
          }
        </>
      )
}

export default TopicDetail;
