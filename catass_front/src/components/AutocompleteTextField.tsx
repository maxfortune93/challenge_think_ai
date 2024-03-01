'use client'
import React, { useState } from 'react';
import { TextField, Autocomplete, CircularProgress, TextFieldProps, IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { color } from 'html2canvas/dist/types/css/types/color';

interface AutocompleteTextFieldProps {
    onInputChange: (value: string) => void;
    onLoadMore?: () => void;
    options: string[];
    loading?: boolean;
    hasMore?: boolean;
    textFieldProps?: TextFieldProps;
}

const AutocompleteTextField = ({
    onInputChange,
    options,
    loading,
    textFieldProps,
}: AutocompleteTextFieldProps) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (value: string) => {
        setInputValue(value);
        onInputChange(value);
    };

    return (
        <Autocomplete
            sx={{ width: 300 }}
            size="small"
            options={options}
            loading={false}
            inputValue={inputValue}
            onInputChange={(_, value) => handleInputChange(value)}
            renderInput={(params) => (
                <TextField
                    
                    {...params}
                    {...textFieldProps}
                    label="Search and Select"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    );
};

export default AutocompleteTextField;
