import {
  Box,
  Button,
  Container,
  Stack,
} from "@mui/material"
import RhfTextarea from './RhfTextarea';
import RhfSelect from './RhfSelect';
import RhfMultiCheckbox from './RhfMultiCheckbox';
import RhfOneCheckbox from './RhfOneCheckbox';
import RhfTextField from './RhfTextField';
import RhfRadio from './RhfRadio';
import RhfDatePicker from './RhfDatePicker';
import { useSampleForm } from './useSampleForm';

function MuiRhfWithControllerAndZod() {
  const {
    form: { handleSubmit, control, onSubmit },
    options: { selectOptions, checkboxesOptions, radioOptions }
  } = useSampleForm()

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
