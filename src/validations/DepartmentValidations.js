const validateDepartmenCreateForm = (values) => {
  const errors = {};
  if (!values.nmDepartamento) {
    errors.nmDepartamento = "Obrigatório";
  }
  if (!values.usuario) {
    errors.usuario = "Obrigatório";
  }

  return errors;
};

const validateDepartmenEditForm = (values, department) => {
  const errors = validateDepartmenCreateForm(values);

  if (values.usuario && values.usuario.flStatus === "Inativo") {
    errors.usuario = "O usuário selecionado está inativo";
  }

  if (
    values.nmDepartamento === department.nmDepartamento &&
    JSON.stringify(values.usuario) === JSON.stringify(department.usuario)
  ) {
    errors._errors = "Nenhuma alteração foi feita";
  }

  return errors;
};

export { validateDepartmenCreateForm, validateDepartmenEditForm };
