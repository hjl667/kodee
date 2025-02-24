import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/lab/Autocomplete';
import { Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const SelectGlossaryComponent = ({ glossaries, selectedGlossaries, handleGlossaryChange }) => {
    return (
        <Autocomplete
            multiple
            id="glossary-select"
            options={glossaries}
            getOptionLabel={(option) => option.label} // assuming glossaries is an array of objects with label and value properties
            value={selectedGlossaries}
            onChange={(event, newValue) => handleGlossaryChange(newValue)}
            renderInput={(params) => (
                <TextField {...params}
                           variant="outlined"
                           placeholder="Select..."
                           sx={{
                               '& .MuiOutlinedInput-root': {
                                   height: '40px', // adjust as needed
                                   fontSize: '0.7rem',
                                   '& fieldset': {
                                       top: 0,
                                   },
                               },
                               '& .MuiAutocomplete-input': {
                                   padding: '10px 14px', // adjust as needed
                               }
                           }}
                />
            )}
            style={{ width: 600}}
            renderOption={(props, option) => (
                <Box component="li" sx={{ fontSize: '0.8rem' }} {...props}>
                    {option.label}
                </Box>
            )}
            // Add this part to adjust the selected tag's font size:
            ChipProps={{
                sx: {
                    fontSize: '0.6rem',
                    height: '20px',
                    margin: '2px',
                    backgroundColor: 'white'
                },
                deleteIcon: (
                    <CloseIcon
                        style={{
                            // Style for the close icon here, e.g.:
                            color: 'black',
                            fontSize: '12px'
                        }}
                    />
                ),
            }}
        />
    );
};

export default SelectGlossaryComponent;

