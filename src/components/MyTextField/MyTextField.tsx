import { TextField, TextFieldProps } from '@mui/material';
import { useState } from 'react';

interface IMyTextField {
  props: TextFieldProps;
  value?: string;
  center?: boolean;
}

export default function MyTextField({ props, value, center }: IMyTextField) {
  const { sx: originalSx, ...otherProps } = props;
  const [valueInput, setValueInput] = useState(value || '');

  return (
    <TextField
      sx={{
        legend: center ? { textAlign: 'center' } : {},
        '.MuiFormLabel-root.Mui-focused': {
          '&.MuiInputLabel-root': center
            ? {
                left: '50%',
                transform: 'translate(-35%,-9px) scale(0.7)',
              }
            : {},
        },
        '.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderWidth: '1px',
        },
        '.MuiInputLabel-root': center
          ? {
              left: '50%',
              transform: valueInput ? 'translate(-35%, -9px) scale(0.7)' : 'translate(-50%, 9px) scale(1)',
            }
          : {},

        marginTop: '15px',
        ...originalSx, // Adding original sx if present
      }}
      autoComplete={'off'}
      required
      fullWidth
      inputProps={{
        style: center ? { textAlign: 'center' } : {},
      }}
      onChange={(e) => setValueInput(e.target.value)}
      {...otherProps} // Using destructured props without sx
    />
  );
}
