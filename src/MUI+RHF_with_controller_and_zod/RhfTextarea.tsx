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
  { rows: number; }

function RhfTextarea <T extends FieldValues>({
  control,
  disabled,
  label,
  name,
  rows,
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
          label={label ?? ''}
          inputRef={ref}
          rows={rows}
          disabled={isSubmitting || disabled}
          error={!!error}
          multiline
          fullWidth
          {...rest}
          />
      </FormItemWrapper>
    )
}

export default RhfTextarea;