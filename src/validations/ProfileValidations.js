const validateProfileContactsForm = (values, user) => {
  const errors = {};

  if (values.contatos && values.contatos.length > 0) {
    errors.contatos = values.contatos.map((contato, index) => {
      const contatoErrors = {};
      if (!contato.tipo) {
        contatoErrors.tipo = "Obrigatório";
      }
      if (!contato.contato) {
        contatoErrors.contato = "Obrigatório";
      }
      return contatoErrors;
    });

    if (errors.contatos.every((contato) => !contato.tipo && !contato.contato)) {
      delete errors.contatos;
    }
  }

  if (values.contatos) {
    values.contatos.forEach((contato, index) => {
      if (contato.tipo === "" && contato.contato !== "") {
        errors.contatos = errors.contatos || [];
        errors.contatos[index] = {
          ...errors.contatos[index],
          tipo: "Obrigatório",
        };
      }
      if (contato.contato === "" && contato.tipo !== "") {
        errors.contatos = errors.contatos || [];
        errors.contatos[index] = {
          ...errors.contatos[index],
          contato: "Obrigatório",
        };
      }
    });
  }

  if (JSON.stringify(values.contatos) === JSON.stringify(user.contatos)) {
    errors._errors = "Nenhuma alteração foi feita";
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

export { validateProfileContactsForm, passwordValidation };
