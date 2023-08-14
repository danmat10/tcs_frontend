const validateLoginForm = (values) => {
  const errors = {};
  if (!values.login) {
    errors.login = "Obrigatório";
  }
  if (!values.password) {
    errors.password = "Obrigatório";
  }
  return errors;
};

export default validateLoginForm;
