import React from 'react';
import TranscriptionToLearn from './TranscriptionToLearn'

function LearningSpace() {
    return (
        <div className="ImproveHere">
            <div className="prompts-header">Start Improving Here</div>
            <div className="subtitle">Smart learning beats grinding</div>
            <TranscriptionToLearn/>
        </div>
    );
}

export default LearningSpace;
