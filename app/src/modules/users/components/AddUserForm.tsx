import {Button, TextField} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { InferType } from "yup";
import {styled} from "@mui/material/styles";

const validationSchema = yup.object({
  name: yup.string().required("El nombre es requerido"),
  code: yup.string().required("El código es requerido"),
});

interface AddUserFormProps {
  onSubmit: (values: InferType<typeof validationSchema>) => Promise<void>;
  initialValues?: Partial<InferType<typeof validationSchema>>;
}

const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  minWidth: '450px'
}));

export const AddUserForm = (props: AddUserFormProps) => {
  const formik = useFormik({
    initialValues: Object.assign(
      {
        name: "",
        code: "",
      },
      props.initialValues
    ),
    validationSchema: validationSchema,
    onSubmit: props.onSubmit,
  });
  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="name"
        name="name"
        label="Nombre"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
        fullWidth
        id="code"
        name="code"
        label="Código"
        value={formik.values.code}
        onChange={formik.handleChange}
        error={formik.touched.code && Boolean(formik.errors.code)}
        helperText={formik.touched.code && formik.errors.code}
      />
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
        <Button type='submit' variant="contained" color="primary" disabled={formik.isSubmitting}>
          Guardar
        </Button>
      </div>
    </StyledForm>
  );
};
