import { useNavigate } from "react-router-dom";
import { Stack, TextField, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { BarcodeReader } from "../../../../shared/components/barcode";

export default function LoginForm() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/", { replace: true });
  };

  return (
    <Stack spacing={3}>
      <TextField name="email" label="Codigo de usuario" />
      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
      >
        Iniciar
      </Button>
      <BarcodeReader onScan={(text) => alert(text)}>
        {(_status, toggle) => (
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="success"
            onClick={toggle}
          >
            Iniciar usando QR
          </LoadingButton>
        )}
      </BarcodeReader>
    </Stack>
  );
}
