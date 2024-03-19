"use client";

import { Autocomplete } from "@mui/material";
import TextField from '@mui/material/TextField';



interface AutocompleteInputProps {
    label: string;
    options: string[];
  }

  const AutocompleteInput: React.FC<AutocompleteInputProps> = ({ label, options }) => {
    return (
      <div>
        <Autocomplete
          disablePortal
          id="combo-box-airports"
          options={options}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label={label} />}
        />
      </div>
    );
  };
  
  export default AutocompleteInput;