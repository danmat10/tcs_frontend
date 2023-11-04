const isValidDate = (dateString) => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false;
  const d = new Date(dateString);
  const dNum = d.getTime();
  if (!dNum && dNum !== 0) return false;
  return d.toISOString().slice(0, 10) === dateString;
};

const parseLocalDate = (dateString) => {
  const [year, month, day] = dateString
    .split("-")
    .map((num) => parseInt(num, 10));
  return new Date(year, month - 1, day);
};

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
  } else if (!isValidDate(values.dtRetirada)) {
    errors.dtRetirada = "Data de retirada inválida";
  } else {
    const retiradaDate = parseLocalDate(values.dtRetirada);
    if (retiradaDate < currentDate) {
      errors.dtRetirada = "A data de retirada não pode ser menor que a atual";
    }
  }

  if (values.dtDevolucao === "") {
    errors.dtDevolucao = "Campo obrigatório";
  } else if (!isValidDate(values.dtDevolucao)) {
    errors.dtDevolucao = "Data de devolução inválida";
  } else {
    const devolucaoDate = parseLocalDate(values.dtDevolucao);
    if (devolucaoDate < currentDate) {
      errors.dtDevolucao = "A data de devolução não pode ser menor que a atual";
    }

    if (isValidDate(values.dtRetirada)) {
      const retiradaDate = parseLocalDate(values.dtRetirada);
      retiradaDate.setHours(0, 0, 0, 0);
      if (devolucaoDate < retiradaDate) {
        errors.dtDevolucao =
          "A data de devolução não pode ser menor que a data de retirada";
      }
    }
  }

  return errors;
};

export { validateRequisitionCreateForm };
