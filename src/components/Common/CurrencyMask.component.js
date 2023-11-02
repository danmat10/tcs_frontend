import { TextField } from "@mui/material";

const maskCurrencyFunction = (value) => {
  value = String(value);

  let cleanValue = value.replace(/[^\d.]/g, "");
  let parts = cleanValue.split(".");
  let integerPart = parts[0];
  let decimalPart = parts[1] || "00";

  if (decimalPart.length === 1) {
    decimalPart = `${decimalPart}0`;
  } else if (decimalPart.length > 2) {
    decimalPart = decimalPart.slice(0, 2);
  }

  integerPart = parseInt(integerPart).toLocaleString();
  return `R$ ${integerPart},${decimalPart}`;
};

const unmaskCurrencyFunction = (value) => {
  value = String(value);

  let cleanValue = value.replace(/\D/g, "");
  let len = cleanValue.length;

  if (cleanValue === "0" || len === 0) {
    return 0;
  }

  if (len === 1) {
    return `0.0${cleanValue}`;
  } else if (len === 2) {
    return `0.${cleanValue}`;
  } else {
    return `${cleanValue.slice(0, -2)}.${cleanValue.slice(-2, len)}`;
  }
};

const CurrencyMask = ({ formik, fieldName, label }) => {
  return (
    <TextField
      fullWidth
      label={label}
      name={fieldName}
      type="text"
      onChange={(e) => {
        const value = unmaskCurrencyFunction(e.target.value);
        formik.setFieldValue(fieldName, value);
      }}
      value={maskCurrencyFunction(formik.values[fieldName])}
      error={formik.touched[fieldName] && Boolean(formik.errors[fieldName])}
      helperText={formik.touched[fieldName] && formik.errors[fieldName]}
    />
  );
};

export { CurrencyMask, maskCurrencyFunction };
