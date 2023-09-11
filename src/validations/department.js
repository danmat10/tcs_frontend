const validateDepartmenCreateForm = (values) => {
  const errors = {};

  const trimmedDepartamento = values.nmDepartamento?.trim();
  if (!trimmedDepartamento) {
    errors.nmDepartamento = "Obrigatório";
  } else if (trimmedDepartamento.length < 2) {
    errors.nmDepartamento =
      "O nome do departamento deve ter pelo menos 2 caracteres";
  }

  if (!values.user) {
    errors.user = "Obrigatório";
  }

  return errors;
};

const validateDepartmenEditForm = (values, department) => {
  const errors = validateDepartmenCreateForm(values);

  if (values.user && values.user.flStatus === "Inativo") {
    errors.user = "O usuário selecionado está inativo";
  }

  if (
    values.nmDepartamento === department.nmDepartamento &&
    JSON.stringify(values.user) === JSON.stringify(department.user)
  ) {
    errors._errors = "Nenhuma alteração foi feita";
  }

  return errors;
};

export { validateDepartmenCreateForm, validateDepartmenEditForm };
