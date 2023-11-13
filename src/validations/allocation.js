const validateAllocationCreateForm = (values) => {
  const errors = {};
  console.log(values);

  if (!values.departament) {
    errors.departament = "Campo obrigatório";
  }

  if (values.patrimonies.length === 0) {
    errors.patrimonies =
      "Por favor, selecione os patrimônios que deseja alocar";
  }

  if (values.dtAlocacao === "") {
    errors.dtAlocacao = "Campo obrigatório";
  } else if (new Date(values.dtAlocacao) > new Date()) {
    errors.dtAlocacao = "A data de alocação não pode ser maior que a atual";
  }

  values.patrimonies.forEach((patrimony, index) => {
    if (patrimony.actualDepartment?.id === values.departament?.id) {
      errors.patrimonies =
        "Não é possivel transferir um patrimônio para o mesmo departamento";
    }
  });

  return errors;
};

const validateAllocationPatrimonyQrCode = (values) => {
  const error = null;
  return error;
};

export { validateAllocationCreateForm, validateAllocationPatrimonyQrCode };
