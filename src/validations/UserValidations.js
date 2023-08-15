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
  if (!values.name) {
    errors.name = "Obrigatório";
  }
  if (!values.email) {
    errors.email = "Obrigatório";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Endereço de e-mail inválido";
  }

  if (!values.registration) {
    errors.registration = "Obrigatório";
  }

  if (!values.permissions) {
    errors.permissions = "Obrigatório";
  }

  const cpfError = validateCPF(values.cpf);
  if (cpfError) {
    errors.cpf = cpfError;
  }

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

  return errors;
};

const validateUserEditForm = (values, user) => {
  const errors = validateUserCreateForm(values);
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

  if (
    values.name === user.name &&
    values.email === user.email &&
    values.cpf === user.cpf &&
    values.registration === user.registration &&
    values.permissions === user.permissions &&
    values.active === user.active &&
    JSON.stringify(values.contatos) === JSON.stringify(user.contatos)
  ) {
    errors.name = "Nenhuma alteração foi feita";
    errors.email = "Nenhuma alteração foi feita";
    errors.cpf = "Nenhuma alteração foi feita";
    errors.registration = "Nenhuma alteração foi feita";
    errors.permissions = "Nenhuma alteração foi feita";
    errors.active = "Nenhuma alteração foi feita";
  }

  return errors;
};

export { validateUserCreateForm, validateUserEditForm };
