import { TextField } from "@mui/material";

const maskCurrencyFunction = (value) => {
  let cleanValue = value.replace(/\D/g, "");
  let len = cleanValue.length;

  if (cleanValue === "0" || len === 0) {
    return "R$ 0,00";
  }

  if (len <= 2) {
    return `R$ 0,${cleanValue}`;
  }

  cleanValue = `${cleanValue.slice(0, -2)}.${cleanValue.slice(-2)}`;
  const parts = cleanValue.split(".");
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const decimalPart = parts[1];

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
        formik.setFieldValue(fieldName, parseFloat(rawValue) / 100);
      }}
      value={maskCurrencyFunction(String(formik.values[fieldName] * 100))}
      error={formik.touched[fieldName] && Boolean(formik.errors[fieldName])}
      helperText={formik.touched[fieldName] && formik.errors[fieldName]}
    />
  );
};

export { CurrencyMask, maskCurrencyFunction };
