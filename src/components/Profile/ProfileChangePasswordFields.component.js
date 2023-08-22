import React, { useState } from "react";
import {
  FormControl,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function PasswordFields({ formik }) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <FormControl component="fieldset" margin="normal" fullWidth>
      <TextField
        fullWidth
        label="Senha Atual"
        name="currentPassword"
        type={showCurrentPassword ? "text" : "password"}
        margin="normal"
        onChange={formik.handleChange}
        value={formik.values.currentPassword}
        error={
          formik.touched.currentPassword &&
          Boolean(formik.errors.currentPassword)
        }
        helperText={
          formik.touched.currentPassword && formik.errors.currentPassword
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        label="Nova Senha"
        name="newPassword"
        type={showNewPassword ? "text" : "password"}
        margin="normal"
        onChange={formik.handleChange}
        value={formik.values.newPassword}
        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
        helperText={formik.touched.newPassword && formik.errors.newPassword}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        fullWidth
        label="Confirme a Nova Senha"
        name="confirmNewPassword"
        type={showConfirmPassword ? "text" : "password"}
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
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
}
