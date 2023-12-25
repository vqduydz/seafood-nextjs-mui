import { TextField, TextFieldProps } from '@mui/material';
import { useState } from 'react';

interface IMyTextField {
  props: TextFieldProps;
}

export default function MyTextField({ props }: IMyTextField) {
  const { sx: originalSx, ...otherProps } = props;
  const [value, setValue] = useState('');
  return (
    <TextField
      sx={{
        '.MuiFormLabel-root.Mui-focused': {
          '&.MuiInputLabel-root': {
            left: '50%',
            transform: 'translate(-35%,-9px) scale(0.7)',
          },
        },
        '.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderWidth: '1px',
        },
        '.MuiInputLabel-root': {
          left: '50%',
          transform: value ? 'translate(-35%, -9px) scale(0.7)' : 'translate(-50%, 9px) scale(1)',
        },

        marginTop: '15px',
        ...originalSx, // Adding original sx if present
      }}
      autoComplete="false"
      required
      fullWidth
      inputProps={{
        style: { textAlign: 'center' },
      }}
      onChange={(e) => setValue(e.target.value)}
      {...otherProps} // Using destructured props without sx
    />
  );
}
