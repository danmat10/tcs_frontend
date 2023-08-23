const validateProfileContactsForm = (values, user) => {
  const errors = {};

  if (values.contacts && values.contacts.length > 0) {
    errors.contacts = values.contacts.map((contato, index) => {
      const contatoErrors = {};
      if (!contato.typeContacts) {
        contatoErrors.typeContacts = "Obrigatório";
      }
      if (!contato.dsContato) {
        contatoErrors.dsContato = "Obrigatório";
      }
      return contatoErrors;
    });

    if (
      errors.contacts.every(
        (contato) => !contato.typeContacts && !contato.dsContato
      )
    ) {
      delete errors.contacts;
    }
  }

  if (values.contacts) {
    values.contacts.forEach((contato, index) => {
      if (contato.typeContacts === "" && contato.dsContato !== "") {
        errors.contacts = errors.contacts || [];
        errors.contacts[index] = {
          ...errors.contacts[index],
          typeContacts: "Obrigatório",
        };
      }
      if (contato.dsContato === "" && contato.typeContacts !== "") {
        errors.contacts = errors.contacts || [];
        errors.contacts[index] = {
          ...errors.contacts[index],
          dsContato: "Obrigatório",
        };
      }
    });
  }

  if (JSON.stringify(values.contacts) === JSON.stringify(user.contacts)) {
    errors._errors = "Nenhuma alteração foi feita";
  }
  let hasEmail = false;

  if (values.contacts) {
    for (let i = 0; i < values.contacts.length; i++) {
      if (values.contacts[i].typeContacts === "E-mail") {
        hasEmail = true;
        break;
      }
    }

    if (!hasEmail) {
      errors._errors = "Pelo menos um contato do tipo 'E-mail' é obrigatório";
    }
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
