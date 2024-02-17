import {
  Box,
  Button,
  Container,
  Stack,
} from "@mui/material"
import {
  SubmitHandler,
  useForm,
} from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { schema, type Schema } from './schema';
import RhfTextarea from './RhfTextarea';
import RhfSelect, { SelectOptions } from './RhfSelect';
import { initFormVal } from './utils';
import RhfMultiCheckbox, { MultiCheckboxOptions } from './RhfMultiCheckbox';
import RhfOneCheckbox from './RhfOneCheckbox';
import RhfTextField from './RhfTextField';
import RhfRadio, { RadioOptions } from './RhfRadio';
import RhfDatePicker from './RhfDatePicker';

const selectOptions: SelectOptions[] = [
  { label: "0", value: "0" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
]

const checkboxesOptions: MultiCheckboxOptions[] = [
  { label: "選択肢1", value: "sentakushi1" },
  { label: "選択肢2", value: "sentakushi2" },
  { label: "選択肢3", value: "sentakushi3" },
]

const radioOptions: RadioOptions[] = [
  { label: "ラジオ1", value: "radio1" },
  { label: "ラジオ2", value: "radio2" },
  { label: "ラジオ3", value: "radio3" },
]

function MuiRhfWithControllerAndZod() {
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

  return (
    <Container maxWidth="sm" sx={{ pt: 5 }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
        <Stack spacing={3}>
          {/* テキスト */}
          <RhfTextField
            type='text'
            name="nullAbleText"
            label='テキスト'
            control={control}
            />
          <RhfTextField
            type='text'
            name="text"
            label='テキスト（必須）'
            control={control}
            />

          {/* 数値 */}
          <RhfTextField
            name="nullAbleNumber"
            type='number'
            label='数値'
            control={control}
            />
          <RhfTextField
            name="number"
            type='number'
            label='数値（必須）'
            control={control}
            />

          {/* セレクトボックス */}
          <RhfSelect
            name="nullAbleSelect"
            control={control}
            label="セレクトボックス"
            options={selectOptions}
            />
          <RhfSelect
            name="select"
            control={control}
            label="セレクトボックス（必須）"
            options={selectOptions}
            />

          {/* 単体チェックボックス */}
          <RhfOneCheckbox
            label="チェックボックス"
            name="nullAbleCheckbox"
            control={control}
            />
          <RhfOneCheckbox
            label="チェックボックス（必須）"
            name="checkbox"
            control={control}
            />

          {/* 複数チェックボックス */}
          <RhfMultiCheckbox
            label="複数チェックボックス"
            name="nullAbleCheckboxes"
            control={control}
            options={checkboxesOptions}
            />
          <RhfMultiCheckbox
            label="複数チェックボックス（必須）"
            name="checkboxes"
            control={control}
            options={checkboxesOptions}
            />

          {/* ラジオボタン */}
          <RhfRadio
            label="ラジオボタン"
            name="nullAbleRadio"
            control={control}
            options={radioOptions}
            />
          <RhfRadio
            label="ラジオボタン（必須）"
            name="radio"
            control={control}
            options={radioOptions}
            />

          {/* 日程 */}
          <RhfDatePicker
            name="nullAbleDate"
            label='日程'
            control={control}
            />
          <RhfDatePicker
            name="date"
            label='日程（必須）'
            control={control}
            />

          {/* テキストエリア */}
          <RhfTextarea
            name="nullAbleTextarea"
            label='テキストエリア'
            control={control}
            rows={5}
            />
          <RhfTextarea
            name="textarea"
            label='テキストエリア（必須）'
            control={control}
            rows={5}
            />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            size="large"
            >
            ボタン
          </Button>
        </Stack>
      </Box>
    </Container>
  )
}

export default MuiRhfWithControllerAndZod
