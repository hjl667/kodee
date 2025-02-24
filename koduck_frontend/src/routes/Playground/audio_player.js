import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, IconButton, Slider, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const AudioPlayer = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);

      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);

      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
        audio.pause(); // Stop audio when component unmounts or URL changes
      };
    }
  }, [audioUrl]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return; // If no audio is loaded, do nothing

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (e, newValue) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = newValue;
      setCurrentTime(audio.currentTime);
    }
  };

  const handlePlaybackRateChange = (event) => {
    const newRate = event.target.value;
    setPlaybackRate(newRate);

    const audio = audioRef.current;
    if (audio) {
      audio.playbackRate = newRate;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <Card className="w-full h-full rounded-lg ">
      {/*in order to control the width of player, cover the .max-w-3xl (max-width : 48rem ), remove w-4/5 */}
      <CardContent className="flex items-center h-full bg-gray-100">
        <IconButton onClick={togglePlayPause} className="focus:outline-none">
          {isPlaying ? <PauseIcon className="text-2xl"/> : <PlayArrowIcon className="text-2xl"/>}
        </IconButton>
        <div className="flex-1 mx-4">
          <Slider
            value={currentTime}
            min={0}
            max={duration}
            onChange={handleSliderChange}
            className="text-gray-400"
            sx={{
              color: 'gray', // Change the color of the slider to grey
              '& .MuiSlider-thumb': {
                  backgroundColor: 'gray', // Thumb (circle) color
              },
              '& .MuiSlider-track': {
                  backgroundColor: 'gray', // Track (filled part) color
              },
              '& .MuiSlider-rail': {
                  backgroundColor: 'lightgray', // Rail (unfilled part) color
              },
            }}
          />
        </div>
        <FormControl sx={{ ml: 2, minWidth: 60 }}> {/* Reduced the min-width for a smaller width */}
          <InputLabel id="playback-rate-label" sx={{ fontSize: '0.75rem' }}></InputLabel>
          <Select
            labelId="playback-rate-label"
            value={playbackRate}
            onChange={handlePlaybackRateChange}
            sx={{
              fontSize: '0.75rem', // Smaller font size
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none', // Remove the border
              },
              '& .MuiSelect-select': {
                padding: '4px', // Adjust padding if needed
              },
              minWidth: '60px', // Narrow the select box
            }}
          >
            <MenuItem value={0.85} sx={{ fontSize: '0.75rem' }}>0.85x</MenuItem>
            <MenuItem value={0.9} sx={{ fontSize: '0.75rem' }}>0.9x</MenuItem>
            <MenuItem value={0.95} sx={{ fontSize: '0.75rem' }}>0.95x</MenuItem>
            <MenuItem value={1.0} sx={{ fontSize: '0.75rem' }}>1x</MenuItem>
          </Select>
        </FormControl>
        <div className="text-sm text-gray-600 whitespace-nowrap flex-shrink-0">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

      </CardContent>
    </Card>
  );
};

export default AudioPlayer;
