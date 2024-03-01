// components/LazyLoadSelect.tsx
'use client'
import { SelectValueProps } from "@/types";
import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, TextField } from "@mui/material";
import { useState } from "react";

export function LazyLoadSelect({ tagsArray, onSelectChange }: Readonly<SelectValueProps>) {
    
    const [displayedOptions, setDisplayedOptions] = useState<string[]>(tagsArray.slice(0, 15)); // Initial 15 options
    const [hasMoreOptions, setHasMoreOptions] = useState(tagsArray.length > 15);
    const [loading, setLoading] = useState(false);

    // tagsArray.sort((a, b) => a.localeCompare(b));
  
    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
      const target = event.target as HTMLDivElement;
      if (!loading && hasMoreOptions) {
        const isAtBottom = target.scrollHeight - target.scrollTop === target.clientHeight;
        if (isAtBottom) {
          setLoading(true);
          const nextSliceStart = displayedOptions.length;
          const nextSlice = tagsArray.slice(nextSliceStart, nextSliceStart + 15);
  
          setDisplayedOptions((prevOptions) => [...prevOptions, ...nextSlice]);
          setHasMoreOptions(tagsArray.length > displayedOptions.length + 15);
          setLoading(false);
        }
      }
    };

    const handleSelect = (
        event: React.SyntheticEvent<Element, Event>,
        value: string | null,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<string>
    ) => {
        
        onSelectChange(value as string); // Retorna o valor selecionado para o componente pai
    };

    // const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const { value } = event.target;
    //     onSelectChange(value); // Atualiza o texto de filtro ao digitar
    //   };
  
    return (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={tagsArray}
        loading={loading}
        sx={{ width: 300 }}
        size="small"
        renderInput={(params) => <TextField {...params} label="Movie" />}
        onChange={handleSelect}
        //onScroll={handleScroll} // Attach the handleScroll function
      />
    );

  
  }

export default LazyLoadSelect;