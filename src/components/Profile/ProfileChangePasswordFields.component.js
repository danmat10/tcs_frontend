import { FormControl, TextField } from "@mui/material";

const PasswordUpdateForm = ({ formik }) => (
  <FormControl component="fieldset" margin="normal" fullWidth>
    <TextField
      fullWidth
      label="Senha Atual"
      name="currentPassword"
      type="password"
      margin="normal"
      onChange={formik.handleChange}
      value={formik.values.currentPassword}
      error={
        formik.touched.currentPassword && Boolean(formik.errors.currentPassword)
      }
      helperText={
        formik.touched.currentPassword && formik.errors.currentPassword
      }
    />
    <TextField
      fullWidth
      label="Nova Senha"
      name="newPassword"
      type="password"
      margin="normal"
      onChange={formik.handleChange}
      value={formik.values.newPassword}
      error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
      helperText={formik.touched.newPassword && formik.errors.newPassword}
    />
    <TextField
      fullWidth
      label="Confirme a Nova Senha"
      name="confirmNewPassword"
      type="password"
      margin="normal"
      onChange={formik.handleChange}
      value={formik.values.confirmNewPassword}
      error={
        formik.touched.confirmNewPassword &&
        Boolean(formik.errors.confirmNewPassword)
      }
      helperText={
        formik.touched.confirmNewPassword && formik.errors.confirmNewPassword
      }
    />
  </FormControl>
);

export default PasswordUpdateForm;
