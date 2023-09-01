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
const passwordValidation = (values) => {
  const errors = {};

  if (!values.currentPassword) {
    errors.currentPassword = "Senha atual é obrigatória";
  }

  if (!values.newPassword) {
    errors.newPassword = "Nova senha é obrigatória";
  }

  if (!values.confirmNewPassword) {
    errors.confirmNewPassword = "Confirmação de senha é obrigatória";
  }

  if (values.newPassword !== values.confirmNewPassword) {
    errors.confirmNewPassword = "As senhas não são iguais";
  }

  if (values.newPassword && values.newPassword.length < 8) {
    errors.newPassword = "A senha deve ter pelo menos 8 caracteres";
  }

  const hasLetter = /[a-zA-Z]/.test(values.newPassword);
  const hasNumber = /[0-9]/.test(values.newPassword);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(values.newPassword);

  if (!(hasLetter && hasNumber && hasSpecialChar)) {
    errors.newPassword =
      "A senha deve conter letras, números e caracteres especiais";
  }

  return errors;
};

export { validateLoginForm, passwordValidation };
