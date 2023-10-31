import {useNavigate} from "react-router-dom";
import {Stack, TextField, Button} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {QRReader} from "../../../../shared/components/qr";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {loginApi} from "../api.ts";
import {useAuth} from "../../../../hooks/useAuth.ts";
import toast from "react-hot-toast";

export default function LoginForm() {
  const navigate = useNavigate();
  const {login} = useAuth();
  const [code, setCode] = useState<string>();
  const createStoreRequest = useMutation({
    mutationFn: (value: string) => loginApi(value),
    onSuccess: (data) => {
      login(data.login);
      navigate("/", {replace: true});
    },
    onError: (error) => {
      toast(error.message, {icon: '🚨'});
    }
  })
  const onSubmitForm = async (code: string) => {
    createStoreRequest.mutate(code)
  };

  return (
    <Stack spacing={3}>
      <TextField name="email" value={code} onChange={(e) => setCode(e.target.value)} label="Codigo de usuario"/>
      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={() => onSubmitForm(code || '')}
        disabled={!code?.length}
      >
        Iniciar
      </Button>
      <QRReader onScan={(text) => onSubmitForm(text)}>
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
      </QRReader>
    </Stack>
  );
}
