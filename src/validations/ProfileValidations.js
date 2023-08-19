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

export { validateProfileContactsForm };
