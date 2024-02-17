import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from "@mui/material"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Controller, SubmitHandler, useForm } from "react-hook-form"

type FormInputType = {
  text: string,
  select: string,
  rank1: boolean,
  rank2: boolean,
  rank3: boolean,
  radio: boolean,
  date: Date | null,
};

function MuiRhfWithController() {
  const { handleSubmit, control } = useForm<FormInputType>()

  const onSubmit: SubmitHandler<FormInputType> = (data) => {
    console.log(data)
  }

  return (
    <Container maxWidth="sm" sx={{ pt: 5 }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
        <Stack spacing={3}>
          <Controller
            name="text"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                id="text"
                label="テキスト"
                {...field}
                />
            )}
            />
          <Controller
            name="select"
            control={control}
            defaultValue="0"
            render={({ field }) => (
              <FormControl>
                <InputLabel id="select">セレクトボックス</InputLabel>
                <Select
                  labelId="select"
                  id="select"
                  label="セレクトボックス"
                  {...field}
                  >
                  <MenuItem value={"0"}>0</MenuItem>
                  <MenuItem value={"1"}>1</MenuItem>
                  <MenuItem value={"2"}>2</MenuItem>
                  <MenuItem value={"3"}>3</MenuItem>
                </Select>
              </FormControl>
            )}
            />
          <FormGroup>
            <Controller
              name="rank1"
              control={control}
              render={({ field }) => (
                <FormControlLabel control={<Checkbox {...field} />} label="松" />
              )}
              />
            <Controller
              name="rank2"
              control={control}
              render={({ field }) => (
                <FormControlLabel control={<Checkbox {...field} />} label="竹" />
              )}
              />
            <Controller
              name="rank3"
              control={control}
              render={({ field }) => (
                <FormControlLabel control={<Checkbox {...field} />} label="梅" />
              )}
              />
          </FormGroup>
          <Controller
            name="radio"
            control={control}
            render={({ field }) => (
              <FormControl {...field}>
                <FormLabel id="radio">ラジオ</FormLabel>
                <RadioGroup
                  aria-labelledby="radio"
                  name="radio"
                >
                  <FormControlLabel value="radio1" control={<Radio />} label="radio1" />
                  <FormControlLabel value="radio2" control={<Radio />} label="radio2" />
                  <FormControlLabel value="radio3" control={<Radio />} label="radio3" />
                </RadioGroup>
              </FormControl>
            )}
            />
          <Controller
            name="date"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="date"
                  format="YYYY/MM/DD"
                  {...field}
                  />
              </LocalizationProvider>
            )}
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

export default MuiRhfWithController
