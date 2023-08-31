const validateCPForCNPJ = (value) => {
  const cleanValue = value.replace(/\D/g, "");

  if (cleanValue.length === 11) {
    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value)) {
      return "Formato de CPF inválido";
    }
    return "";
  }

  if (cleanValue.length === 14) {
    if (!/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(value)) {
      return "Formato de CNPJ inválido";
    }
    return "";
  }

  return "CPF/CNPJ inválido";
};

function validateContacts(contacts, user = {}) {
  const errors = {};

  if (contacts && contacts.length > 0) {
    errors.contacts = contacts.map((contato) => {
      const contatoErrors = {};
      if (!contato.typeContacts) {
        contatoErrors.typeContacts = "Obrigatório";
      }
      if (!contato.dsContato) {
        contatoErrors.dsContato = "Obrigatório";
      }

      if (
        contato.typeContacts === "E-mail" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contato.dsContato)
      ) {
        contatoErrors.dsContato = "E-mail inválido";
      }

      if (contato.typeContacts === "Telefone" && contato.dsContato.length < 8) {
        contatoErrors.dsContato = "Telefone inválido. Digite um número válido";
      }

      if (contato.typeContacts === "Celular" && contato.dsContato.length < 9) {
        contatoErrors.dsContato = "Celular inválido. Digite um número válido";
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

    let hasEmail = false;
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].typeContacts === "E-mail") {
        hasEmail = true;
        break;
      }
    }

    if (!hasEmail) {
      errors._errors = "Pelo menos um contato do tipo 'E-mail' é obrigatório";
    }
  } else {
    errors._errors = "Pelo menos um contato do tipo 'E-mail' é obrigatório";
  }

  if (user && JSON.stringify(contacts) === JSON.stringify(user.contacts)) {
    errors._errors = "Nenhuma alteração foi feita";
  }

  return errors;
}

const validateUserCreateForm = (values) => {
  const errors = validateContacts(values.contacts);

  const trimmedName = values.nmUsuario?.trim();
  if (!trimmedName) {
    errors.nmUsuario = "Obrigatório";
  } else if (trimmedName.length < 3) {
    errors.nmUsuario = "O nome do usuário deve ter pelo menos 3 caracteres";
  }

  const trimmedMatricula = values.nrMatricula?.trim();
  if (!trimmedMatricula) {
    errors.nrMatricula = "Obrigatório";
  } else if (trimmedMatricula.length < 3) {
    errors.nrMatricula = "A matrícula deve ter pelo menos 3 caracteres";
  } else if (!/^\d+$/.test(trimmedMatricula)) {
    errors.nrMatricula = "A matrícula deve conter apenas números";
  }

  if (!values.typeUser) {
    errors.typeUser = "Obrigatório";
  }

  const cpfError = validateCPForCNPJ(values.nrCpf);
  if (cpfError) {
    errors.nrCpf = cpfError;
  }

  return errors;
};

const validateUserEditForm = (values, user) => {
  const errors = validateUserCreateForm(values);

  const contactsErrors = validateContacts(values.contacts);
  if (contactsErrors.contacts) {
    errors.contacts = contactsErrors.contacts;
  }
  if (contactsErrors._errors) {
    errors._errors = contactsErrors._errors;
  }

  if (
    values.nmUsuario === user.nmUsuario &&
    values.nrCpf === user.nrCpf &&
    values.nrMatricula === user.nrMatricula &&
    values.typeUser === user.typeUser &&
    values.flStatus === user.flStatus &&
    JSON.stringify(values.contacts) === JSON.stringify(user.contacts)
  ) {
    errors._errors = "Nenhuma alteração foi feita";
  }

  return errors;
};

export { validateUserCreateForm, validateUserEditForm, validateContacts, validateCPForCNPJ};
