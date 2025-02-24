import React, { useState } from 'react';
import axios from 'axios';
import {IconButton, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import {enqueueSnackbar} from "notistack";
import { getUrlGet } from '../../service/api';

const TranscriptionPanel = ({ recordingLength, audioBlob, setTranscription, finalTranscription, interimTranscription, speech }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleFeedbackClick = async () => {
        setLoading(true);
        const transcription = "";

        let speechId = parseInt(speech, 10);

        if (isNaN(speechId)) {
            enqueueSnackbar('Please select a speech before submitting for feedback  ', { variant: 'info' })
            
            setLoading(false); 
            return;
        }

        const token = localStorage.getItem('token');

        if (!token) {
            enqueueSnackbar('You must be logged in to receive feedback.', { variant: 'warning' })
            
            setLoading(false); 
            return;
        }

        if (!audioBlob) {
            enqueueSnackbar('No audio to upload. Please record your speech first.', { variant: 'warning' });
            setLoading(false);
            return;
        }

        if (audioBlob.size === 0) {
            enqueueSnackbar('The recorded audio file is empty. Please try recording again.', { variant: 'warning' });
            setLoading(false);
            return;
        }

        if (audioBlob.type !== 'audio/wav') {
            enqueueSnackbar('The audio format must be WAV.', { variant: 'warning' });
            setLoading(false);
            return;
        }

        console.log(recordingLength);
        if(recordingLength && recordingLength <= 30){
            enqueueSnackbar('Please practise a full topic to receive feedback.', { variant: 'warning' })
            setLoading(false);
            return;
        }

        let uploadUrl = "";
        let publicUrl = "";

        try {
            const response = await getUrlGet();

            if (response.status === 200) {
                uploadUrl = response.data.url;
                publicUrl = response.data.public;
                console.log("Upload URL: " + uploadUrl);
                console.log("Public URL: " + publicUrl);

            } else {
                enqueueSnackbar('Failed to receive upload url', { variant: 'error' })
                return;
            }

            const uploadResponse = await axios.put(uploadUrl, audioBlob, {
                headers: {
                    "Content-Type": "audio/wav"
                }
            });
            if (uploadResponse.status === 200) {
                console.log('Audio successfully uploaded!');
                console.log('Access the audio at: ', publicUrl);

                try {
                    const audioCheckResponse = await axios.get(publicUrl, {
                        headers: { "Content-Type": "audio/wav" }
                    });
        
                    // Check the Content-Length header to ensure the file is not empty
                    const contentLength = audioCheckResponse.headers['content-length'];
                    if (audioCheckResponse.status === 200 && contentLength > 0) {
                        console.log('Audio is accessible and valid with size:', contentLength, 'bytes');
                        enqueueSnackbar('Audio successfully uploaded and is accessible!', { variant: 'success' });
                    } else {
                        console.error('Uploaded audio is either not accessible or the file is empty (0KB).');
                        enqueueSnackbar('Uploaded audio is either not accessible or the file is empty.', { variant: 'error' });
                        return
                    }
        
                } catch (error) {
                    console.error('An error occurred while accessing the uploaded audio:', error);
                    enqueueSnackbar('Error accessing uploaded audio.', { variant: 'error' });
                    return
                }

            } else {
                console.error('Failed to upload the audio');
                enqueueSnackbar('Failed to upload audio', { variant: 'error' });
                return;
            }

        } catch (error) {
            console.error('An error occurred while fetching url:', error);
        }

        try {
            const response = await axios.post('https://koducks.com/api/get_feedback_with_audio', {
                speech_id: speechId,
                translation: transcription,
                url: publicUrl,
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`, 
                    "Content-Type": "application/json",
                }
            });

            if (response.status === 200) {
                navigate('/console');
                enqueueSnackbar('When your feedback is ready. Find it on the console page.', { variant: 'success' })
                
            } else {
                enqueueSnackbar('Failed to receive feedback', { variant: 'error' })
            }
        } catch (error) {
            console.error('An error occurred while processing feedback:', error);
            enqueueSnackbar('An error occurred while processing feedback', { variant: 'error' })
            
        } finally {
            setLoading(false); 
        }
    };


    return (
        <Tooltip title="Submit to get feedback!" placement="right"> {/* Tooltip with hover text */}
                <IconButton
                    onClick={handleFeedbackClick}
                    sx={{
                        bottom: '0px',
                        right: '0px',
                        width: '30px',
                        height: '30px',
                        padding: '0.4rem',
                        backgroundColor: '#000000',
                        color: '#fff',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        transition: 'background-color 0.3s ease, transform 0.3s ease',
                    }}
                >
                    {loading ? <CircularProgress style={{ color: '#fff',width:"100%", height:"100%"}} /> : <SendIcon sx={{width:"100%", height:"100%"}} />}
                </IconButton>
            </Tooltip>
    );
};

export default TranscriptionPanel;
