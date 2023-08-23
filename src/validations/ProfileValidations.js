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

export { passwordValidation };
