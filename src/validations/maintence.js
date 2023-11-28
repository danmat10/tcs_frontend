const validateMaintenceCreateForm = (values) => {
  const errors = {};
  if (!values.patrimony) {
    errors.patrimony = "Obrigatório";
  }
  if (!values.nmTypeMaintence) {
    errors.nmTypeMaintence = "nmTypeMaintence";
  }
  if (!values.dtPrevisionMaintence) {
    errors.dtPrevisionMaintence = "Obrigatório";
  }
  if (!values.dsMaintence) {
    errors.dsMaintence = "Obrigatório";
  }
  if (!values.nmFornecedor) {
    errors.nmFornecedor = "Obrigatório";
  }
  if (!values.nrCnpj) {
    errors.nrCnpj = "Obrigatório";
  }
  return errors;
};

const validateMaintenceEditForm = (values, maintence) => {
  const errors = validateMaintenceCreateForm(values);
  if (
    values.patrimony?.id === maintence.patrimony?.id &&
    values.nmTypeMaintence === maintence.nmTypeMaintence &&
    values.dsMaintence === maintence.dsMaintence &&
    values.dtPrevisionMaintence === maintence.dtPrevisionMaintence &&
    values.nmFornecedor === maintence.nmFornecedor &&
    values.nrCnpj === maintence.nrCnpj
  ) {
    errors._errors = "Não houve alterações";
  }
  return errors;
};

const validateMaintenceStartForm = (values) => {
  const errors = {};
  if (!values.dtStartMaintence) {
    errors.dtStartMaintence = "Obrigatório";
  }
  if (!values.nmFornecedor) {
    errors.nmFornecedor = "Obrigatório";
  }
  if (!values.nrCnpj) {
    errors.nrCnpj = "Obrigatório";
  }

  return errors;
};

const validateMaintenceEndForm = (values) => {
  const errors = {};
  if (!values.dtEndMaintence) {
    errors.dtEndMaintence = "Obrigatório";
  }
  if (!values.vlMaintence || values.vlMaintence <= 0) {
    errors.vlMaintence = "Obrigatório";
  }

  return errors;
};

export {
  validateMaintenceCreateForm,
  validateMaintenceEditForm,
  validateMaintenceStartForm,
  validateMaintenceEndForm,
};
