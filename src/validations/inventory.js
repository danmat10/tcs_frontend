const validateInventoryCreateForm = (values) => {
  const errors = {};

  if (!values.dtAgendada) {
    errors.dtAgendada = "Obrigatório";
  }

  return errors;
};

const validateInventoryEndForm = (values) => {
  const errors = {};

  if (!values.dtAgendada) {
    errors.dtAgendada = "Obrigatório";
  }

  if (!values.dtRealizada) {
    errors.dtRealizada = "Obrigatório";
  }

  return errors;
};

export { validateInventoryCreateForm, validateInventoryEndForm };
