import React from "react";
import { TextField } from "@mui/material";

const LoginFormFields = ({ formik }) => (
  <>
    <TextField
      fullWidth
      label="CPF/Matrícula"
      name="login"
      type="text"
      margin="dense"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.login}
      error={formik.touched.login && Boolean(formik.errors.login)}
      helperText={formik.touched.login && formik.errors.login}
    />
    <TextField
      fullWidth
      label="Senha"
      name="password"
      type="password"
      margin="dense"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.password}
      error={formik.touched.password && Boolean(formik.errors.password)}
      helperText={formik.touched.password && formik.errors.password}
    />
  </>
);

export default LoginFormFields;
