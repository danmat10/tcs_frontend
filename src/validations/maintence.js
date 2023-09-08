const validateMaintenceCreateForm = (values) => {
  const errors = {};
  if (!values.patrimonio) {
    errors.patrimonio = "Obrigatório";
  }
  if (!values.nmTypeMaintence) {
    errors.nmTypeMaintence = "nmTypeMaintence";
  }
  if (!values.dtPrevisionMaintence) {
    errors.dtPrevisionMaintence = "Obrigatório";
  }
  return errors;
};

const validateMaintenceEditForm = (values, maintence) => {
  const errors = validateMaintenceCreateForm(values);
  if (
    values.patrimonio?.id === maintence.patrimonio?.id &&
    values.nmTypeMaintence === maintence.nmTypeMaintence &&
    values.dsMaintence === maintence.dsMaintence &&
    values.dtPrevisionMaintence === maintence.dtPrevisionMaintence
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
  if (!values.nmCpf) {
    errors.nmCpf = "Obrigatório";
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
