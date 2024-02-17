import { FormControlLabel, Radio, RadioGroup, useTheme } from '@mui/material';
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';
import { BaseFormProps } from './types';
import { FormItemWrapper } from './FormItemWrapper';

export type RadioOptions = { label: string; value: string; }

type Props<T extends FieldValues> =
  UseControllerProps<T> &
  BaseFormProps &
  { options: RadioOptions[] }

function RhfRadio <T extends FieldValues>({
  control,
  disabled,
  label,
  name,
  options,
}: Props<T>) {
  const {
    field,
    fieldState: { error },
    formState: { isSubmitting }
  } = useController({name, control});
  const theme = useTheme();

  return (
    <FormItemWrapper
      label={label}
      error={error}
    >
      <RadioGroup row {...field}>
        {options.map(option =>
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={
              <Radio
                style={{
                  color: error ? theme.palette.error.main : undefined,
                }}
                disabled={isSubmitting || disabled}
                />
            }
            label={option.label}
            />
        )}
      </RadioGroup>
    </FormItemWrapper>
  )
}

export default RhfRadio;