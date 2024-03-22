"use client";

import { Autocomplete } from "@mui/material";
import TextField from '@mui/material/TextField';



interface AutocompleteInputProps {
    label: string;
    options: string[];
  }

  const AutocompleteInput: React.FC<AutocompleteInputProps> = (props) => {
    return (
      <div>
        <Autocomplete
        {...props}
          disablePortal
          id="combo-box-airports"
          options={props.options}
        
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label={props.label} />}
        />
      </div>
    );
  };
  
  export default AutocompleteInput;
