import { useNavigate } from 'react-router-dom';
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export default function LoginForm() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('', { replace: true });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Codigo de usuario" />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Iniciar
      </LoadingButton>
    </>
  );
}