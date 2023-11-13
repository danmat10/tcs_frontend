const isValidDate = (dateString) => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false;
  const d = new Date(dateString);
  const dNum = d.getTime();
  if (!dNum && dNum !== 0) return false;
  return d.toISOString().slice(0, 10) === dateString;
};

// const parseLocalDate = (dateString) => {
//   const [year, month, day] = dateString
//     .split("-")
//     .map((num) => parseInt(num, 10));
//   return new Date(year, month - 1, day);
// };

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

  if (values.dtPrevisaoRetirada === "") {
    errors.dtPrevisaoRetirada = "Campo obrigatório";
  } else if (!isValidDate(values.dtPrevisaoRetirada)) {
    errors.dtPrevisaoRetirada = "Data de retirada inválida";
  }
  // else {
  //   const retiradaDate = parseLocalDate(values.dtPrevisaoRetirada);
  //   if (retiradaDate < currentDate) {
  //     errors.dtPrevisaoRetirada =
  //       "A data de retirada não pode ser menor que a atual";
  //   }
  // }

  // if (values.dtDevolucao === "") {
  //   errors.dtDevolucao = "Campo obrigatório";
  // } else if (!isValidDate(values.dtDevolucao)) {
  //   errors.dtDevolucao = "Data de devolução inválida";
  // } else {
  //   const devolucaoDate = parseLocalDate(values.dtDevolucao);
  //   if (devolucaoDate < currentDate) {
  //     errors.dtDevolucao = "A data de devolução não pode ser menor que a atual";
  //   }

  //   if (isValidDate(values.dtPrevisaoRetirada)) {
  //     const retiradaDate = parseLocalDate(values.dtPrevisaoRetirada);
  //     retiradaDate.setHours(0, 0, 0, 0);
  //     if (devolucaoDate < retiradaDate) {
  //       errors.dtDevolucao =
  //         "A data de devolução não pode ser menor que a data de retirada";
  //     }
  //   }
  // }

  return errors;
};

const validateRequisitionPatrimonyQrCode = (values) => {
  let error = null;
  if (values.fixo) {
    error = "Não é possível requisitar um patrimônio fixo";
  }
  return error;
};

export { validateRequisitionCreateForm, validateRequisitionPatrimonyQrCode };
