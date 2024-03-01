'use client'
import { SelectValueProps } from '@/types';
import { SelectChangeEvent, FormControl, InputLabel, Select, OutlinedInput, MenuItem, Theme, useTheme } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export function SelectButton({ tagsArray }: Readonly<SelectValueProps>) {
   
    const [personName, setPersonName] = useState<string>(); // Initial value
    const [displayedOptions, setDisplayedOptions] = useState<string[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [hasMoreOptions, setHasMoreOptions] = useState(true);
    const [loading, setLoading] = useState(false);
  
    // Fetch and display initial 15 options
    useEffect(() => {
      setLoading(true);
      const loadInitialOptions = async () => {
        const initialOptions = tagsArray.slice(0, 15); // Show first 15 options
        setDisplayedOptions(initialOptions);
        setHasMoreOptions(tagsArray.length > 15); // Check if there are more
        setLoading(false);
        console.log('tags', initialOptions);
      };
      loadInitialOptions();

      const filteredOptions = tagsArray.filter(option =>
        option.toLowerCase().includes(filterText.toLowerCase())
      );
      // Atualiza as opções exibidas
      setDisplayedOptions(filteredOptions.slice(0, 15));
    }, [filterText, tagsArray]);
  
    // Handle selection change
    const handleChange = (event: SelectChangeEvent<string>) => {
      const {value} = event.target;
      console.log('handleChange', value);
      setPersonName(value);
    };
  
    // Load more options on scroll
    const handleScroll = (event: React.UIEvent) => {
      const target = event.target as HTMLElement;
      console.log('handleScroll', target)
      const { scrollHeight, scrollTop, clientHeight } = target;
  
      if (!loading && hasMoreOptions && scrollTop + clientHeight >= scrollHeight) {
        setLoading(true);
        const nextSliceStart = displayedOptions.length; // Start from previous end
        const nextSlice = tagsArray.slice(nextSliceStart, nextSliceStart + 15);
  
        setDisplayedOptions((prevOptions) => [...prevOptions, ...nextSlice]);
        setHasMoreOptions(tagsArray.length > displayedOptions.length + 15);
        setLoading(false);
      }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setFilterText(value); // Atualiza o texto de filtro ao digitar
      };
  
    return (
      <div >

        <FormControl sx={{ m: 1, width: 300 }} size="small">
          <InputLabel id="demo-multiple-name-label">Name</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="Name" />}
            disabled={loading} // Disable select while loading
            MenuProps={{
                PaperProps: {
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                      width: 250,
                    },
                    onScroll: handleScroll,
                  },
            }}
          >
            <MenuItem>
            <OutlinedInput
              value={filterText}
              onChange={handleInputChange}
              placeholder="Filter options..."
              fullWidth // Preenche a largura do MenuItem
            />
            </MenuItem>

            {displayedOptions.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
            {loading && (
              <MenuItem key="loading" disabled>
                Loading...
              </MenuItem>
            )}
            {hasMoreOptions && !loading && (
              <MenuItem key="load-more" disabled>
                Click to load more
              </MenuItem>
            )}
          </Select>
        </FormControl>
        {hasMoreOptions && !loading && (
          <p style={{ textAlign: 'center' }}>Scroll to load more</p>
        )}
      </div>
    );
  }

  export default SelectButton;