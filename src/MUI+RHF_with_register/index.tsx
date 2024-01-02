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
  TextField
} from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form"

type FormInputType = {
  text: string,
  select: string,
  rank1: boolean,
  rank2: boolean,
  rank3: boolean,
  radio: boolean,
  date: Date,
};

function MuiRhfWithRegister() {
  const { register, handleSubmit } = useForm<FormInputType>()

  const onSubmit: SubmitHandler<FormInputType> = (data) => {
    console.log(data)
  }

  return (
    <Container maxWidth="sm" sx={{ pt: 5 }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
        <Stack spacing={3}>
          <TextField
            id="text"
            label="テキスト"
            {...register("text")}
            />
          <FormControl>
            <InputLabel id="select">セレクトボックス</InputLabel>
            <Select
              labelId="select"
              id="select"
              label="セレクトボックス"
              defaultValue="0"
              {...register("select")}
              >
              <MenuItem value={"0"}>0</MenuItem>
              <MenuItem value={"1"}>1</MenuItem>
              <MenuItem value={"2"}>2</MenuItem>
              <MenuItem value={"3"}>3</MenuItem>
            </Select>
          </FormControl>
          <FormGroup>
            <FormControlLabel control={<Checkbox {...register("rank1")} />} label="松" />
            <FormControlLabel control={<Checkbox {...register("rank2")} />} label="竹" />
            <FormControlLabel control={<Checkbox {...register("rank3")} />} label="梅" />
          </FormGroup>
          <FormControl>
            <FormLabel id="radio">ラジオ</FormLabel>
            <RadioGroup
              aria-labelledby="radio"
              name="radio"
            >
              <FormControlLabel value="radio1" control={<Radio {...register("radio")} />} label="radio1" />
              <FormControlLabel value="radio2" control={<Radio {...register("radio")} />} label="radio2" />
              <FormControlLabel value="radio3" control={<Radio {...register("radio")} />} label="radio3" />
            </RadioGroup>
          </FormControl>
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

export default MuiRhfWithRegister
