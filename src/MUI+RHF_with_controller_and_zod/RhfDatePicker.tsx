import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';
import { BaseFormProps } from './types';
import { FormItemWrapper } from './FormItemWrapper';

const FORMAT = "YYYY/MM/DD";

type Props<T extends FieldValues> =
  UseControllerProps<T> & BaseFormProps

function RhfDatePicker <T extends FieldValues>({
  control,
  disabled,
  label,
  name,
}: Props<T>) {
  const {
    field: { onChange, ...rest},
    fieldState: { error },
    formState: { isSubmitting }
  } = useController({name, control});

  return (
    <FormItemWrapper
      label={label}
      error={error}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          format={FORMAT}
          onChange={(newValue) => onChange(newValue ? new Date(newValue).toISOString() : "")}
          disabled={isSubmitting || disabled}
          slotProps={{
            textField: { error: !!error }
          }}
          {...rest}
          />
      </LocalizationProvider>
    </FormItemWrapper>
  )
}

export default RhfDatePicker;