const validateCPF = (cpf) => {
  if (cpf.length !== 11 && cpf.length !== 14) {
    return "CPF inválido";
  }
  if (cpf.length === 14 && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
    return "Formato de CPF inválido";
  }
  if (/\D/.test(cpf) && cpf.length !== 14) {
    return "CPF inválido";
  }
  return "";
};

const validateUserCreateForm = (values) => {
  const errors = {};
  if (!values.nmUsuario) {
    errors.nmUsuario = "Obrigatório";
  }
  if (!values.nrMatricula) {
    errors.nrMatricula = "Obrigatório";
  }
  if (!values.typeUser) {
    errors.typeUser = "Obrigatório";
  }

  const cpfError = validateCPF(values.nrCpf);
  if (cpfError) {
    errors.nrCpf = cpfError;
  }

  if (values.contacts && values.contacts.length > 0) {
    errors.contacts = values.contacts.map((contact) => {
      const contactErrors = {};

      if (!contact.typeContacts) {
        contactErrors.typeContacts = "Obrigatório";
      }

      if (!contact.dsContato) {
        contactErrors.dsContato = "Obrigatório";
      }

      return contactErrors;
    });

    if (errors.contacts.every((contact) => !contact.typeContacts && !contact.dsContato)) {
      delete errors.contacts;
    }
  }

  return errors;
};

const validateUserEditForm = (values, user) => {
  const errors = validateUserCreateForm(values);
  if (values.contacts) {
    values.contacts.forEach((contact, index) => {
      if (contact.typeContacts === "" && contact.dsContato !== "") {
        errors.contacts = errors.contacts || [];
        errors.contacts[index] = {
          ...errors.contacts[index],
          typeContacts: "Obrigatório",
        };
      }
      if (contact.dsContato === "" && contact.typeContacts !== "") {
        errors.contacts = errors.contacts || [];
        errors.contacts[index] = {
          ...errors.contacts[index],
          dsContato: "Obrigatório",
        };
      }
    });
  }

  if (
    values.nmUsuario === user.nmUsuario &&
    values.nrCpf === user.nrCpf &&
    values.nrMatricula === user.nrMatricula &&
    values.typeUser === user.typeUser &&
    values.active === user.active &&
    JSON.stringify(values.contacts) === JSON.stringify(user.contacts)
  ) {
    errors.nmUsuario = "Nenhuma alteração foi feita";
    errors.nrCpf = "Nenhuma alteração foi feita";
    errors.nrMatricula = "Nenhuma alteração foi feita";
    errors.typeUser = "Nenhuma alteração foi feita";
    errors.active = "Nenhuma alteração foi feita";
  }

  return errors;
};

export { validateUserCreateForm, validateUserEditForm };
