import React, { useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const FirstAccessFormFields = ({ formik }) => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <TextField
        fullWidth
        label="Senha"
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
        label="Confirmar Senha"
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
    </>
  );
};

export { FirstAccessFormFields };
