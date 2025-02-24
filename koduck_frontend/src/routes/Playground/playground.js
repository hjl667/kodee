import React, { useState, useEffect, useRef } from 'react';

import './playground.css';

import { Tabs } from "@arco-design/web-react";

import Recording from './Recording'
import Transcription from './Feedback';
import SpeechSelect from './search_speech';
import TopicDetail from "./TopicDetail";
import MarkdownContent from '../../components/markdown-content';
import TextViewerContainer from '../../components/text-viewer-container';

import { useBreakpoint, isMobile } from '../../hooks/breakpoint';
import AudioBlob from "./audioBlob";

const TabPane = Tabs.TabPane;

export default function SpeechManagement () {
  const [audioUrl, setAudioUrl] = useState(null);
  const [interimTranscription, setInterimTranscription] = useState('');
  const [finalTranscription, setFinalTranscription] = useState('');
  const [speech, setSpeech] = useState('');
  const [terms, setTerms] = useState('');
  const [text, setText] = useState('');
  const [structure, setStructure] = useState('');
  const [sample, setSample] = useState('');
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingLength, setRecordingLength] = useState();
  const [creating, setCreating] = useState(false);

  const breakpoint = useBreakpoint();

  const [transcription, setTranscription] = useState('');


  return (
<div className="h-full w-full flex flex-col">
  {/* Container for SpeechSelect and Recording + Transcription */}
  <div className="absolute top-16 sm:top-0 left-0 right-0 h-12 sm:h-20 p-4">
    {/* Vertically flex container */}
    <div className="flex h-full space-y-4" style={{justifyContent: "flex-start"}}>
      {/* SpeechSelect should be above Recording and Transcription */}
      <SpeechSelect
        setAudioUrl={setAudioUrl}
        setSpeech={setSpeech}
        setTerms={setTerms}
        setStructure={setStructure}
        setText={setText}
        setSample={setSample}
        setCreating={setCreating}
      />

      {/* Horizontally flexed container for Recording and Transcription */}
      <div className="flex flex-row  items-center justify-start space-x-4" style={{width:'28%',paddingLeft:"5%",paddingBottom:"1%"}}>
        <Recording
          setAudioBlob={setAudioBlob}
          audioBlob={audioBlob}
          setRecordingLength={setRecordingLength}
          recordingLength={recordingLength}
          setInterimTranscription={setInterimTranscription}
          setFinalTranscription={setFinalTranscription}
        />
        <Transcription
          recordingLength={recordingLength}
          audioBlob={audioBlob}
          setTranscription={setTranscription}
          interimTranscription={interimTranscription}
          finalTranscription={finalTranscription}
          speech={speech}
        />
      </div>
    </div>
    <AudioBlob
        audioBlob={audioBlob}
        recordingLength={recordingLength}
    />
  </div>


      <div className='absolute top-28 sm:top-20 left-0 right-0 bottom-20 sm:bottom-24 px-2 mt-7'>
        {
            <Tabs className="h-full" defaultActiveTab="structure" size={isMobile(breakpoint) ? 'default' : 'large'}>
            <TabPane key="structure" title="Outline" className="h-full">
              <TextViewerContainer>
                <MarkdownContent text={structure} />
              </TextViewerContainer>
            </TabPane>
            <TabPane key="text" title="Full Text" className="h-full">
              <TextViewerContainer>
                <MarkdownContent text={text} />
              </TextViewerContainer>
            </TabPane>
            <TabPane key="terms" title="Terms" className="h-full">
              <TextViewerContainer>
                <MarkdownContent text={terms} />
              </TextViewerContainer>
            </TabPane>
            <TabPane key="sample" title="English Sample" className="h-full">
              <TextViewerContainer>
                <MarkdownContent text={sample} />
              </TextViewerContainer>
            </TabPane>
          </Tabs>
        }
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24">
        <TopicDetail
          setAudioUrl={setAudioUrl}
          audioUrl={audioUrl}
          creating={creating}
          setCreating={setCreating}
        />
      </div>
    </div>
  );
};
