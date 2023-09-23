import { TextField } from "@mui/material";

const maskCurrencyFunction = (value) => {
  value = String(value);

  let cleanValue = value.replace(/\D/g, "");
  let len = cleanValue.length;

  if (cleanValue === "0" || len === 0) {
    return "R$ 0,00";
  }

  let decimalPart = "00";
  if (len === 1) {
    decimalPart = `0${cleanValue}`;
  } else if (len >= 2) {
    decimalPart = cleanValue.slice(-2);
  }

  let integerPart = "0";
  if (len > 2) {
    integerPart = cleanValue.slice(0, -2);
  }
  integerPart = parseInt(integerPart).toLocaleString();
  return `R$ ${integerPart},${decimalPart}`;
};

const CurrencyMask = ({ formik, fieldName, label }) => {
  return (
    <TextField
      fullWidth
      label={label}
      name={fieldName}
      type="text"
      onChange={(e) => {
        const rawValue = e.target.value.replace(/\D/g, "");
        formik.setFieldValue(fieldName, rawValue); // Armazenando o valor como centavos
      }}
      value={maskCurrencyFunction(formik.values[fieldName])}
      error={formik.touched[fieldName] && Boolean(formik.errors[fieldName])}
      helperText={formik.touched[fieldName] && formik.errors[fieldName]}
    />
  );
};

export { CurrencyMask, maskCurrencyFunction };
