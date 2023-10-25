const validateRequisitionCreateForm = (values) => {
  const errors = {};

  if (!values.obra) {
    errors.obra = "Campo obrigatório";
  }

  if (values.patrimonios.length === 0) {
    errors.patrimonios =
      "Por favor, selecione os patrimônios que deseja alocar";
  }
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  if (values.dtRetirada === "") {
    errors.dtRetirada = "Campo obrigatório";
  } else if (new Date(values.dtRetirada) < currentDate) {
    errors.dtRetirada = "A data de retirada não pode ser menor que a atual";
  }

  if (values.dtDevolucao === "") {
    errors.dtDevolucao = "Campo obrigatório";
  } else if (new Date(values.dtDevolucao) < currentDate) {
    errors.dtDevolucao = "A data de devolução não pode ser menor que a atual";
  }

  if (new Date(values.dtDevolucao) < new Date(values.dtRetirada)) {
    errors.dtDevolucao = "A data de devolução não pode ser menor que a data de retirada";
  }

  return errors;
};

export { validateRequisitionCreateForm };
