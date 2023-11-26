const validateReportForm = (state, setState) => {
  const isValid = validateReportTypeAndFileType(state, setState);

  switch (state.reportType) {
    case "general":
      return isValid;
    case "losses":
      return validateLosses(state, setState) && isValid;
    case "inventory":
      return isValid;
    case "onLoan":
      return isValid;
    case "overdue":
      return isValid;
    case "traceability":
      return isValid;
    case "maintenceExpenses":
      return validateMaintenceExpenses(state, setState) && isValid;
    default:
      return isValid;
  }
};

const validateMaintenceExpenses = (state, setState) => {
  let isInvalid = false;
  const maintenceExpensesErrors = {
    dtStart: false,
    dtStartErrorText: "",
    dtEnd: false,
    dtEndErrorText: "",
    vlMinError: false,
    vlMinErrorText: "",
    vlMaxError: false,
    vlMaxErrorText: "",
  };

  const setMaintenceExpensesError = (key, message) => {
    maintenceExpensesErrors[key] = true;
    maintenceExpensesErrors[key + "ErrorText"] = message;
    isInvalid = true;
  };

  if (!state.reportsConfig.maintenceExpenses.dtStart) {
    setMaintenceExpensesError("dtStart", "Campo obrigatório");
  }
  if (!state.reportsConfig.maintenceExpenses.dtEnd) {
    setMaintenceExpensesError("dtEnd", "Campo obrigatório");
  }

  if (!isInvalid) {
    try {
      const start = parseLocalDate(
        state.reportsConfig.maintenceExpenses.dtStart
      );
      const end = parseLocalDate(state.reportsConfig.maintenceExpenses.dtEnd);
      if (start > end) {
        setMaintenceExpensesError(
          "dtEnd",
          "A data final não pode ser menor que a data inicial"
        );
      }
    } catch (e) {
      setMaintenceExpensesError("dtStart", "Data inválida");
      setMaintenceExpensesError("dtEnd", "Data inválida");
    }
  }

  if (
    state.reportsConfig.maintenceExpenses.vlMin >
    state.reportsConfig.maintenceExpenses.vlMax
  ) {
    setMaintenceExpensesError(
      "vlMax",
      "O valor máximo não pode ser menor que o valor mínimo"
    );
  }

  setState((prev) => ({
    ...prev,
    errors: { ...prev.errors, maintenceExpenses: maintenceExpensesErrors },
  }));
  return !isInvalid;
};

const validateReportTypeAndFileType = (state, setState) => {
  const reportTypeError = !state.reportType;
  const fileTypeError = !state.fileType;
  setState((prev) => ({
    ...prev,
    errors: {
      ...prev.errors,
      reportTypeError,
      fileTypeError,
    },
  }));
  return !reportTypeError && !fileTypeError;
};

const validateLosses = (state, setState) => {
  let isInvalid = false;
  const lossesErrors = {
    dtStart: false,
    dtStartErrorText: "",
    dtEnd: false,
    dtEndErrorText: "",
  };

  const setLossError = (key, message) => {
    lossesErrors[key] = true;
    lossesErrors[key + "ErrorText"] = message;
    isInvalid = true;
  };

  if (!state.reportsConfig.losses.dtStart) {
    setLossError("dtStart", "Campo obrigatório");
  }
  if (!state.reportsConfig.losses.dtEnd) {
    setLossError("dtEnd", "Campo obrigatório");
  }

  if (!isInvalid) {
    try {
      const start = parseLocalDate(state.reportsConfig.losses.dtStart);
      const end = parseLocalDate(state.reportsConfig.losses.dtEnd);
      if (start > end) {
        setLossError(
          "dtEnd",
          "A data final não pode ser menor que a data inicial"
        );
      }
    } catch (e) {
      setLossError("dtStart", "Data inválida");
      setLossError("dtEnd", "Data inválida");
    }
  }
  setState((prev) => ({
    ...prev,
    errors: { ...prev.errors, losses: lossesErrors },
  }));
  return !isInvalid;
};

const parseLocalDate = (dateString) => {
  const [day, month, year] = dateString
    .split("/")
    .map((num) => parseInt(num, 10));
  return new Date(year, month - 1, day);
};

export { validateReportForm };
