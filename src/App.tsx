import { Box, Button, Container, Stack, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

type FormInputType = {
  email: string,
  name: string,
  password: string,
};

function App() {
  const { register, handleSubmit } = useForm<FormInputType>()

  const onSubmit: SubmitHandler<FormInputType> = (data) => {
    console.log(data)
  }


  return (
    <Container maxWidth="sm" sx={{ pt: 5 }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <Stack spacing={3}>
          <TextField
            type="email"
            id="email"
            label="メールアドレス"
            required
            {...register('email')}
            />
          <TextField
            id="name"
            label="お名前"
            required
            {...register('name')}
            />
          <TextField
            type="password"
            id="password"
            label="パスワード"
            required
            {...register('password')}
            />
          <Button
            type='submit'
            color="primary"
            variant="contained"
            size="large"
            >
            作成
          </Button>
        </Stack>
      </Box>
    </Container>
  )
}

export default App
