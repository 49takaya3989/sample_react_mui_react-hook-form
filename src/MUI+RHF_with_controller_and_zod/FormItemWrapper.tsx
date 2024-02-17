import { Box, FormHelperText, FormLabel, useTheme } from '@mui/material';
import { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { BaseFormProps } from './types';

type Props = BaseFormProps & {
  children: ReactNode;
  error: FieldError | undefined
}
export const FormItemWrapper = ({
  children,
  error,
  label
}: Props) => {
  const theme = useTheme();

  return (
    <Box>
      <FormLabel component="legend">{label}</FormLabel>
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