import { Button, TextField } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { InferType } from "yup";
import { styled } from "@mui/material/styles";
import { useEffect, useRef } from "react";

const validationSchema = yup.object({
  name: yup.string().required("El nombre es requerido"),
});

interface AddStoreFormProps {
  onSubmit: (values: InferType<typeof validationSchema>) => void;
  initialValues?: Partial<InferType<typeof validationSchema>>;
}

const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
}));

export const AddStoreForm = (props: AddStoreFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const formik = useFormik({
    initialValues: Object.assign(
      {
        name: "",
      },
      props.initialValues
    ),
    validationSchema: validationSchema,
    onSubmit: props.onSubmit,
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="name"
        inputRef={inputRef}
        name="name"
        label="Nombre"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
        <Button type="submit" variant="contained" color="primary" disabled={formik.isSubmitting}>
          Guardar
        </Button>
      </div>
    </StyledForm>
  );
};
