import { Checkbox, FormControlLabel, FormGroup, useTheme } from '@mui/material'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'
import { BaseFormProps } from './types'
import { FormItemWrapper } from './FormItemWrapper'

export type MultiCheckboxOptions = { label: string; value: string }

type Props<T extends FieldValues> = UseControllerProps<T> &
  BaseFormProps & { options: MultiCheckboxOptions[] }

function RhfMultiCheckbox<T extends FieldValues>({
  control,
  disabled,
  label,
  name,
  options,
}: Props<T>) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({ name, control })
  const theme = useTheme()

  const handler = (optionVal: string) => {
    const newVal = value.includes(optionVal)
      ? value.filter((val: string) => val !== optionVal)
      : [...value, optionVal]

    onChange(newVal)
  }

  return (
    <FormItemWrapper label={label} error={error}>
      <FormGroup row>
        {options.map((option, index) => (
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
                data-testid={name + index}
              />
            }
          />
        ))}
      </FormGroup>
    </FormItemWrapper>
  )
}

export default RhfMultiCheckbox
