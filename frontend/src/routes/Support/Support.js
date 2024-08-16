import React, { useContext } from 'react';
import './support.css';
import audio_setup from './audio_setup.png';

import Resources from './Resources';

function Support() {

    return (
        <div className="Instructions">
            <h1>How-To</h1>
            <div className="blank">.........</div>
            <h3>What to Prepare:</h3>
            <div className="blank4">.........</div>
            <ul>
                <li>Chrome browser (recommended)</li>
                <li>Audio router (for Mac users): Either Loopback or Cymo</li>
            </ul>
            <div className="blank2">.........</div>

            <h3>What to Expect:</h3>
            <div className="blank4">.........</div>

            <p>Sign Up and Login:</p>
            <div className="blank4">.........</div>
            <p>Note: Chrome might prompt that the page is unsafe. Simply click on 'Advanced Settings' and proceed to the page. The initial view is a straightforward homepage.</p>

            <div className="blank4">.........</div>
            <p>Booth Mode:</p>
            <div className="blank4">.........</div>
            <p>This is the cornerstone of the KODEE application.
                Our terminology prompt feature aims to be an interpreter's best ally, providing the exact information needed at the right moment without overwhelming the user.</p>

            <div className="blank5">.........</div>
            <p>For those with glossaries prepared: </p>
            <div className="blank5">.........</div>

            <ul>
                <li>Select the source language.</li>
                <li>Choose glossaries to look up terms from (multiple selections allowed).</li>
                <li>Configure your audio input and click 'start'.</li>
                <li>To save the transcription, click on the quote icon at the bottom.</li>
            </ul>
            <div className="blank4">.........</div>

            <p>Glossaries:</p>
            <div className="blank4">.........</div>
            <p>Glossaries are integral to KODEE's performance. This is where cutting-edge AI collaborates with human expertise to deliver unparalleled interpretation.</p>
            <div className="blank5">.........</div>
            <p>"Off-the-shelf glossaries" are public ones that KODEE provides, and which users can upload for communal access. With a simple click on the 'save' button, these transform into customized glossaries.</p>
            <div className="blank5">.........</div>
            <p>"Customized glossaries" are exclusively yours to modify. To add one, click the 'add' button and upload an Excel file. Ensure Chinese terms are in the first column and English ones in the second. Feel free to contribute to the community by sharing your glossary for everyone's benefit.</p>
            <div className="blank4">.........</div>

            <p>Transcriptions:</p>
            <div className="blank4">.........</div>
            <p>The interface resembles the glossaries page. Review your past interpretations and browse for practice speeches.</p>
            <div className="blank4">.........</div>

            <p>Learning:</p>
            <div className="blank4">.........</div>
            <p>Use this page to review transcriptions and generate machine-translated examples for creating glossaries.</p>

            <div className="blank2">.........</div>
            <h3>How to Test:</h3>
            <div className="blank4">.........</div>
            <p>Before testing:</p>
            <div className="blank5">.........</div>
            <ul>
                <li>Download the sample glossary and audio file (Resources at the bottom).</li>
                <li>Upload the Excel file to add a glossary to your personal space.</li>
                <li>In Booth Mode, select the glossary you added.</li>
                <li>Play the audio file and set up the audio router.</li>
            </ul>
            <div className="blank2">.........</div>
            <h3>How to Route Audio:</h3>
            <img className="audioImg" src={audio_setup} alt="Audio" />
            <div className="blank4">.........</div>
            <p>Audio Input Setup: This configuration allows one to set the output of a device as its input during transcription, simulating an online meeting scenario. For this, you'd need an audio configuration software. Let's take Cymo as an example: Cymo Virtual Cable. Download the Cymo Virtual Cable for audio bridging.</p>
            <div className="blank5">.........</div>
            <p>After downloading the package, follow the installation steps. There's a tutorial available on the website. Then, search for "audio MIDI setup" on Mac. As shown in the illustration, click on the '+' icon at the bottom left, add 'Multi-Output Device', select both the default system output and 'cymovirtualcable 2ch'. Then, select the newly added 'Multi-Output Device' and click on the settings icon at the bottom left, choosing 'Use this device for sound output'.</p>
            <div className="blank2">.........</div>
            <h3>Feedback:</h3>
            <p>Reach out on Red (小红书) by searching for 'KODEE'. I'd greatly appreciate any feedback you might have!</p>
            <div className="blank2">.........</div>
            <h3>Resources: </h3>
            <Resources/>
            <div className="blank3">.........</div>
        </div>
    );
}

export default Support;

