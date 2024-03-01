'use client'
import { TextField, Button, Autocomplete } from '@mui/material'
import React, { useState } from 'react'
import { LazyLoadSelect } from './LazyLoadSelect';
import { CustomFilterProps } from '@/types';
import { autocompleteText, fetchCat } from '@/utils';
import { MediaCard } from './MediaCard';
import AutocompleteTextField from './AutocompleteTextField';


const CustomFilter = ({tagsArrayResponse}: CustomFilterProps) => {
    const [tagValue, setTagValue] = useState('');

    const [textField, setTextField] = useState('');
    const [sugexTextField, setSugexTextField] = useState([]);

    const [imgSrc, setImgSrc] = useState('');

    const [imgTextField, setImgTextField] = useState('');

    const handleSelectChange = (value: string) => {
        setTagValue(value);       
    };
    

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const filterObject = {
            tag: tagValue,
            text: textField,
        };
        console.log(filterObject);
        
        const value = await fetchCat(filterObject);
        
        if(value){
            setImgSrc(value);
            setImgTextField(textField)
            setTextField('');
            setTagValue('');
        }
      };
      const handeAutoComplete = async(event: React.SyntheticEvent, newInputValue: string) => {  
        let results;
        setTextField(newInputValue);
        results = await autocompleteText(newInputValue);
        setSugexTextField(results);
      }

    //   const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    //     const target = event.target as HTMLDivElement;
    //     if (!loading && hasMoreOptions) {
    //       const isAtBottom = target.scrollHeight - target.scrollTop === target.clientHeight;
    //       if (isAtBottom) {
    //         setLoading(true);
    //         const nextSliceStart = displayedOptions.length;
    //         const nextSlice = tagsArrayResponse.slice(nextSliceStart, nextSliceStart + 15);
    
    //         setDisplayedOptions((prevOptions) => [...prevOptions, ...nextSlice]);
    //         setHasMoreOptions(tagsArrayResponse.length > displayedOptions.length + 15);
    //         setLoading(false);
    //       }
    //     }
    //   };

  return (
    <div className='flex items-center flex-col gap-2'>     
    <form onSubmit={handleSearch}>
    <div className='max-w-[1440px] mx-auto mt-12 sm:px-16 px-6 py-4 flex items-center justify-center'>     
      <div className="flex gap-2 items-center" >
      
       {/* <SelectButton tagsArray={allCars}/> */}

        {/* <LazyLoadSelect tagsArray={tagsArrayResponse} onSelectChange={handleSelectChange}/> */}
        {/* <TextField value={textField} onChange={(event) => setTextField(event.target.value)} id="outlined-basic" label="Outlined" variant="outlined" size="small" /> */}
        <Autocomplete
        sx={{ width: 300 }}
        size='small'
        id="free-solo-demo"
        freeSolo
        disableClearable
        inputValue={textField}
        onInputChange={handeAutoComplete}
        options={sugexTextField?.map((option) => option)}
        renderInput={(params) => <TextField {...params} label="freeSolo" />}
      />
      </div>
      <div className="ml-5">
        {/* <Button className="mr-5" variant="outlined" onClick={handleInputChange}>Search</Button> */}
        <Button type='submit' variant="outlined">Search</Button>
        
      </div>

    </div> 
    <AutocompleteTextField
                onInputChange={handleSelectChange}
                options={tagsArrayResponse}
                loading={false}
                textFieldProps={{ fullWidth: true }}
            />
    </form>
    <MediaCard loading={false} catImage={imgSrc} text={imgTextField}/>
    </div>

  )
}

export default CustomFilter