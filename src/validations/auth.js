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

  if (!values.newPassword1) {
    errors.newPassword1 = "Nova senha é obrigatória";
  }

  if (!values.newPassword2) {
    errors.confirmNewPassword = "Confirmação de senha é obrigatória";
  }

  if (values.newPassword1 !== values.newPassword2) {
    errors.newPassword2 = "As senhas não são iguais";
  }

  if (values.newPassword1 && values.newPassword1.length < 8) {
    errors.newPassword1 = "A senha deve ter pelo menos 8 caracteres";
  }

  const hasLetter = /[a-zA-Z]/.test(values.newPassword1);
  const hasNumber = /[0-9]/.test(values.newPassword1);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(values.newPassword1);

  if (!(hasLetter && hasNumber && hasSpecialChar)) {
    errors.newPassword1 =
      "A senha deve conter letras, números e caracteres especiais";
  }

  return errors;
};

export { validateLoginForm, passwordValidation };
