
import { Box, Checkbox, FormControlLabel, FormGroup, FormHelperText, FormLabel, useTheme } from '@mui/material';
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';
import { BaseFormProps } from './types';

export type MultiCheckboxOptions = { label: string; value: string; }

type Props<T extends FieldValues> =
  UseControllerProps<T> &
  BaseFormProps &
  { options: MultiCheckboxOptions[] }

function RhfMultiCheckbox <T extends FieldValues>({
  control,
  disabled,
  label,
  name,
  options,
}: Props<T>) {
    const {
      field: { value, onChange, onBlur },
      fieldState: { error },
      formState: { isSubmitting }
    } = useController({name, control});
    const theme = useTheme();

    const handler = (optionVal: string) => {
      const newVal = value.includes(optionVal)
        ? value.filter((val: string) => val !== optionVal)
        : [...value, optionVal]

      onChange(newVal)
    }

    return (
      <Box>
        {label ? <FormLabel component="legend">{label}</FormLabel> : ''}
        {error ? <FormHelperText error>{error.message}</FormHelperText> : ''}
        <FormGroup row>
          {options.map(option => (
            <FormControlLabel
              key={option.value}
              label={option.label}
              control={
                <Checkbox
                  onChange={() => handler(option.value)}
                  onBlur={onBlur}
                  disabled={isSubmitting || disabled}
                  style={{
                    color: error ? theme.palette.error.main : undefined,
                  }}
                />
              }
              />
              ))}
        </FormGroup>
      </Box>
    )
}

export default RhfMultiCheckbox;