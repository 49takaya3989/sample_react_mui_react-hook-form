import { Checkbox, FormControlLabel, FormGroup, useTheme } from '@mui/material';
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';
import { BaseFormProps } from './types';
import { FormItemWrapper } from './FormItemWrapper';

type Props<T extends FieldValues> =
  UseControllerProps<T> & BaseFormProps

function RhfOneCheckbox <T extends FieldValues>({
  control,
  disabled,
  label,
  name,
}: Props<T>) {
  const {
    // ref：<Checkbox />のrefプロパティは inputRef となっているため
    // それ以外はfieldから取り出して取得
    field: { ref, ...rest },
    fieldState: { error },
    formState: { isSubmitting }
  } = useController({name, control});
  const theme = useTheme();

  return (
    <FormItemWrapper error={error}>
      <FormGroup>
        <FormControlLabel
          label={label}
          control={
            <Checkbox
              inputRef={ref}
              disabled={isSubmitting || disabled}
              style={{
                color: error ? theme.palette.error.main : undefined,
              }}
              {...rest}
              />
          }
          />
      </FormGroup>
    </FormItemWrapper>
  )
}

export default RhfOneCheckbox;