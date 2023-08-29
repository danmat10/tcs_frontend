const validateLoginForm = (values) => {
  const errors = {};

  const trimmedLogin = values.login?.trim();
  if (!trimmedLogin) {
    errors.login = "Obrigatório";
  } else if (trimmedLogin.length < 3) {
    errors.login = "O login digitado é muito curto";
  }

  if (!values.password) {
    errors.password = "Obrigatório";
  } else if (values.password.length < 4) {
    errors.password = "A senha digitada é muito curta";
  }

  return errors;
};

export default validateLoginForm;
