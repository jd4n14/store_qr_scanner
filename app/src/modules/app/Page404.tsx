import { Helmet } from "react-helmet-async";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Button, Typography, Container } from "@mui/material";

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

export default function Page404() {
  return (
    <>
      <Helmet>
        <title> 404 Pagina no encontrada </title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: "center", alignItems: "center" }}>
          <Typography variant="h3" paragraph>
            Pagina no encontrada!
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            Lo siento esta pagina no existe
          </Typography>

          <Button
            to="/"
            size="large"
            variant="contained"
            component={RouterLink}
            sx={{ mt: 5 }}
          >
            Go to Home
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}
