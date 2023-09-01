import { TextField } from "@mui/material";
import React from "react";

const CpfCnpjMask = ({ formik, fieldName }) => {
  const maskCpfOrCnpj = (value) => {
    if (value && /\D$/.test(value)) {
      value = value.slice(0, -1);
    }

    value = value.replace(/\D/g, "");

    if (value.length <= 3) {
      return value;
    } else if (value.length <= 6) {
      return value.replace(/^(\d{3})(\d{0,3})/, "$1.$2");
    } else if (value.length <= 9) {
      return value.replace(/^(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
    } else if (value.length <= 12) {
      return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
    } else if (value.length <= 13) {
      return value.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,1})/,
        "$1.$2.$3/$4-$5"
      );
    } else {
      return value.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        "$1.$2.$3/$4-$5"
      );
    }
  };

  return (
    <TextField
      fullWidth
      label="Digite o CPF/CNPJ"
      name={fieldName}
      type="text"
      onChange={(e) => {
        const rawValue = e.target.value.replace(/\D/g, "");
        const maxLength = rawValue.length > 11 ? 18 : 14;
        if (e.target.value.length > maxLength) {
          return;
        }
        const maskedValue = maskCpfOrCnpj(e.target.value);
        formik.setFieldValue(fieldName, maskedValue);
      }}
      value={formik.values[fieldName]}
      error={formik.touched[fieldName] && Boolean(formik.errors[fieldName])}
      helperText={formik.touched[fieldName] && formik.errors[fieldName]}
      inputProps={{ maxLength: 18 }}
    />
  );
};

export { CpfCnpjMask };
