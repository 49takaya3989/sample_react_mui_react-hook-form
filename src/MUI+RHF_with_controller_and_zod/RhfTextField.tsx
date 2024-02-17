import { TextField } from '@mui/material';
import {
  useController,
  FieldValues,
  UseControllerProps
} from 'react-hook-form';
import { BaseFormProps } from './types';
import { FormItemWrapper } from './FormItemWrapper';

type Props<T extends FieldValues> =
  UseControllerProps<T> &
  BaseFormProps &
  { type: string; }

function RhfTextField <T extends FieldValues>({
  control,
  disabled,
  label,
  name,
  type,
}: Props<T>) {
    const {
      // ref：<TextField />のrefプロパティは inputRef となっているため
      // それ以外はfieldから取り出して取得
      field: { ref, ...rest },
      fieldState: { error },
      formState: { isSubmitting }
    } = useController({name, control});

    return (
      <FormItemWrapper error={error}>
        <TextField
          type={type}
          label={label}
          inputRef={ref}
          error={!!error}
          disabled={isSubmitting || disabled}
          fullWidth
          {...rest}
          />
      </FormItemWrapper>
    )
}

export default RhfTextField;