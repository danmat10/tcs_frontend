const validateAllocationCreateForm = (values) => {
  const errors = {};

  if (!values.actualDepartment) {
    errors.actualDepartment = "Campo obrigatório";
  }

  if (!values.newDepartment) {
    errors.newDepartment = "Campo obrigatório";
  } else if (values.actualDepartment.id === values.newDepartment.id) {
    errors.newDepartment = "Os departamentos devem ser diferentes";
  }

  if (values.patrimonies.length === 0) {
    errors.patrimonies =
      "Por favor, selecione os patrimônios que deseja alocar";
  }

  values.patrimonies.forEach((patrimony, index) => {
    if (patrimony.actualDepartment?.id === values.newDepartment?.id) {
      errors.patrimonies =
        "Não é possivel transferir um patrimônio para o mesmo departamento";
    }
  });

  return errors;
};

export { validateAllocationCreateForm };
