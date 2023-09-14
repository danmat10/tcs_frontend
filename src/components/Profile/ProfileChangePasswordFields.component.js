import React, { useState } from "react";
import {
  FormControl,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { styles } from ".";

const ProfileChangePasswordFields = ({ formik }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <FormControl component="fieldset" margin="normal" fullWidth>
      <TextField
        className={styles.currentPasswordField}
        fullWidth
        label="Senha Atual"
        name="currentPassword"
        type={showCurrentPassword ? "text" : "password"}
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
        name="newPassword1"
        type={showNewPassword ? "text" : "password"}
        margin="dense"
        onChange={formik.handleChange}
        value={formik.values.newPassword1}
        error={
          formik.touched.newPassword1 && Boolean(formik.errors.newPassword1)
        }
        helperText={formik.touched.newPassword1 && formik.errors.newPassword1}
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
        name="newPassword2"
        type={showConfirmPassword ? "text" : "password"}
        margin="dense"
        onChange={formik.handleChange}
        value={formik.values.newPassword2}
        error={
          formik.touched.newPassword2 && Boolean(formik.errors.newPassword2)
        }
        helperText={formik.touched.newPassword2 && formik.errors.newPassword2}
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
};

export { ProfileChangePasswordFields };
