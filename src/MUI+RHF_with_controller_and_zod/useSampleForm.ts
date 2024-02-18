import { zodResolver } from '@hookform/resolvers/zod';
import { MultiCheckboxOptions } from './RhfMultiCheckbox';
import { RadioOptions } from './RhfRadio';
import { SelectOptions } from './RhfSelect';
import { initFormVal } from './utils';
import { Schema, schema } from './schema';
import { SubmitHandler, useForm } from 'react-hook-form';

const selectOptions: SelectOptions[] = [
  { label: "0", value: "0" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
] as const;

const checkboxesOptions: MultiCheckboxOptions[] = [
  { label: "選択肢1", value: "sentakushi1" },
  { label: "選択肢2", value: "sentakushi2" },
  { label: "選択肢3", value: "sentakushi3" },
] as const;

const radioOptions: RadioOptions[] = [
  { label: "ラジオ1", value: "radio1" },
  { label: "ラジオ2", value: "radio2" },
  { label: "ラジオ3", value: "radio3" },
] as const;

export const useSampleForm = () => {
  const {
    handleSubmit,
    control,
  } = useForm<Schema>({
    mode: 'onSubmit', // 初回validation時を検索ボタンが押されたタイミングに設定
    reValidateMode: 'onBlur', // 送信ボタンが押され、バリデーションに引っかかった後は、常に入力値のフォーカスが外れた際にバリデーションが走る
    resolver: zodResolver(schema), // 外部のバリデーションスキーマを適用する
    defaultValues: initFormVal(schema)
  })

  const onSubmit: SubmitHandler<Schema> =
    (data) => console.log('data', data)

  return {
    form: {
      handleSubmit,
      control,
      onSubmit,
    },
    options: {
      selectOptions,
      checkboxesOptions,
      radioOptions,
    }
  }
}