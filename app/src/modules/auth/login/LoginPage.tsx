import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
import LoginForm from './components/LoginForm';
import { Helmet } from "react-helmet-async";

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function LoginPage() {
  return (
    <>
    <Helmet>
        <title> 404 Pagina no encontrada </title>
      </Helmet>
      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Typography sx={{ textAlign: 'center' }} variant="h4" gutterBottom>
              Bienvenido de nuevo
            </Typography>
            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}