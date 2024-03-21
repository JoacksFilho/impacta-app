"use client";

import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';



interface ButtonConfig{

    onClick: React.MouseEventHandler<HTMLButtonElement>;
  }

const FormButton: React.FC<ButtonConfig> = ({onClick }) => {
  return (
    <Stack spacing={2} direction="row">
     <Button
     onClick={onClick}
     />
      
    </Stack>
  );
}