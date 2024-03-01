'use client'
import { useState } from 'react'
import AutocompleteTextField from './AutocompleteTextField'
import { Autocomplete, Button, TextField } from '@mui/material'
import { autocompleteText, fetchCat } from '@/utils'
import { CustomFilterProps } from '@/types'
import { MediaCard } from './MediaCard'

const SearchBarMediaCard = ({tagsArrayResponse}: CustomFilterProps) => {
  
    const [tagValue, setTagValue] = useState('');

    const [loading, setLoading] = useState(false);
 
    const [textField, setTextField] = useState('');
    const [sugexTextField, setSugexTextField] = useState([]);

    const [imgSrc, setImgSrc] = useState('');

    const [imgTextField, setImgTextField] = useState('');

    const handleSelectChange = (value: string) => {
        setTagValue(value);       
    };
   
    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const filterObject = {
            tag: tagValue,
            text: textField,
        };
        
        const value = await fetchCat(filterObject);
       
        if(value){
            setImgSrc(value);
            setImgTextField(textField)
            setTextField('');
            setTagValue('');
            setLoading(false);
        }
      };
      const handeAutoComplete = async(event: React.SyntheticEvent, newInputValue: string) => {  
        setTextField(newInputValue);
        const result = await autocompleteText(newInputValue);
        setSugexTextField(result);
      }

  return (
    <div className=' h-full'>
    <form onSubmit={handleSearch}>
       <div className='flex gap-4 flex-center flex-wrap'>
          <AutocompleteTextField
                onInputChange={handleSelectChange}
                options={tagsArrayResponse}
                loading={false}
                textFieldProps={{ fullWidth: true }}
                />

          <Autocomplete
            sx={{ width: 300 }}
            size='small'
            id="free-solo-demo"
            freeSolo
            disableClearable
            inputValue={textField}
            onInputChange={handeAutoComplete}
            options={sugexTextField?.map((option) => option)}
            renderInput={(params) => <TextField {...params} label="Type..." />}
            />
          <Button style={{backgroundColor: '#4c1d95', color: 'white'}} type='submit' variant="outlined">Search</Button>
        </div>
    </form>
    <div className=' flex-center mt-10'>
    <MediaCard catImage={imgSrc} text={imgTextField} loading={loading} />
    </div>
    </div>
  )
}

export default SearchBarMediaCard

