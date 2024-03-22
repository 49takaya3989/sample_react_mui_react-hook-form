import { zodResolver } from '@hookform/resolvers/zod'
import { MultiCheckboxOptions } from './RhfMultiCheckbox'
import { RadioOptions } from './RhfRadio'
import { SelectOptions } from './RhfSelect'
import { initFormVal } from './utils'
import { Schema, schema } from './schema'
import { SubmitHandler, useForm } from 'react-hook-form'

const selectOptions: SelectOptions[] = [
  { label: '選択してください', value: '' },
  { label: 'セレクト1', value: 'セレクト1' },
  { label: 'セレクト2', value: 'セレクト2' },
  { label: 'セレクト3', value: 'セレクト3' },
  { label: 'セレクト4', value: 'セレクト4' },
  { label: 'セレクト5', value: 'セレクト5' },
] as const

const checkboxesOptions: MultiCheckboxOptions[] = [
  { label: '選択肢1', value: 'sentakushi1' },
  { label: '選択肢2', value: 'sentakushi2' },
  { label: '選択肢3', value: 'sentakushi3' },
] as const

const radioOptions: RadioOptions[] = [
  { label: 'ラジオ1', value: 'radio1' },
  { label: 'ラジオ2', value: 'radio2' },
  { label: 'ラジオ3', value: 'radio3' },
] as const

export const useSampleForm = () => {
  const {
    control,
    formState: { isSubmitting, isValid },
    handleSubmit,
    trigger,
    reset,
    getValues,
  } = useForm<Schema>({
    mode: 'onBlur', // 初回validation時を検索ボタンが押されたタイミングに設定
    reValidateMode: 'onBlur', // 送信ボタンが押され、バリデーションに引っかかった後は、常に入力値のフォーカスが外れた際にバリデーションが走る
    resolver: zodResolver(schema), // 外部のバリデーションスキーマを適用する
    defaultValues: initFormVal(schema),
  })

  const onSubmit: SubmitHandler<Schema> = () => {
    reset()
  }

  return {
    form: {
      control,
      isSubmitting,
      isValid,
      handleSubmit,
      onSubmit,
      trigger,
      getValues,
    },
    options: {
      checkboxesOptions,
      radioOptions,
      selectOptions,
    },
  }
}
