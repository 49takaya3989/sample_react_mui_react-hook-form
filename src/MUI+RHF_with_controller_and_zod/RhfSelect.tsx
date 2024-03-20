import { FormControl, MenuItem, Select } from '@mui/material'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'
import { BaseFormProps } from './types'
import { FormItemWrapper } from './FormItemWrapper'

export type SelectOptions = { label: string; value: string }

type Props<T extends FieldValues> = UseControllerProps<T> &
  BaseFormProps & { options: SelectOptions[] }

function RhfSelect<T extends FieldValues>({
  control,
  disabled,
  label,
  name,
  options,
}: Props<T>) {
  const {
    field,
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({ name, control })

  return (
    <FormItemWrapper label={label} error={error}>
      <FormControl
        error={!!error}
        disabled={isSubmitting || disabled}
        fullWidth
      >
        <Select {...field} label={name} data-testid={name}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </FormItemWrapper>
  )
}

export default RhfSelect
