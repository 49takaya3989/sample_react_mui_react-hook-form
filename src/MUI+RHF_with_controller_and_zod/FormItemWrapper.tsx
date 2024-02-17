import { Box, FormHelperText, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

type Props = {
  children: ReactNode;
  error: FieldError | undefined
}
export const FormItemWrapper = ({children, error}: Props) => {
  const theme = useTheme();
  return (
    <Box>
      {children}
      {error ?
        <FormHelperText
          style={{ color: error ? theme.palette.error.main : undefined }}
        >
          {error.message}
        </FormHelperText>
      : ''}
    </Box>
  )
}