const validateReportForm = (state, setState) => {
  const isValid = validateReportTypeAndFileType(state, setState);

  switch (state.reportType) {
    case "losses":
      return validateLosses(state, setState) && isValid;
    case "maintenceExpenses":
      return validateMaintenceExpenses(state, setState) && isValid;
    case "maintenceSchedule":
      return validateMaintenceSchedule(state, setState) && isValid;
    case "pending":
      return validatePending(state, setState) && isValid;
    case "onLoan":
      return validateOnLoan(state, setState) && isValid;
    case "byLoan":
      return validateByLoan(state, setState) && isValid;
    case "onDepartment":
      return validateOnDepartment(state, setState) && isValid;
    default:
      return isValid;
  }
};

const validateByLoan = (state, setState) => {
  let isInvalid = false;
  const byLoanErrors = {
    dtStart: false,
    dtStartErrorText: "",
    dtEnd: false,
    dtEndErrorText: "",
  };

  const setByLoanError = (key, message) => {
    byLoanErrors[key] = true;
    byLoanErrors[key + "ErrorText"] = message;
    isInvalid = true;
  };

  if (!state.reportsConfig.byLoan.dtStart) {
    setByLoanError("dtStart", "Campo obrigatório");
  }
  if (!state.reportsConfig.byLoan.dtEnd) {
    setByLoanError("dtEnd", "Campo obrigatório");
  }

  if (!isInvalid) {
    try {
      const start = parseLocalDate(state.reportsConfig.byLoan.dtStart);
      const end = parseLocalDate(state.reportsConfig.byLoan.dtEnd);
      if (start > end) {
        setByLoanError(
          "dtEnd",
          "A data final não pode ser menor que a data inicial"
        );
      }
    } catch (e) {
      setByLoanError("dtStart", "Data inválida");
      setByLoanError("dtEnd", "Data inválida");
    }
  }

  setState((prev) => ({
    ...prev,
    errors: { ...prev.errors, byLoan: byLoanErrors },
  }));
  return !isInvalid;
};

const validateOnDepartment = (state, setState) => {
  let isInvalid = false;
  const onDepartmentErrors = {
    dtStart: false,
    dtStartErrorText: "",
    dtEnd: false,
    dtEndErrorText: "",
  };

  const setOnDepartmentError = (key, message) => {
    onDepartmentErrors[key] = true;
    onDepartmentErrors[key + "ErrorText"] = message;
    isInvalid = true;
  };

  if (!state.reportsConfig.onDepartment.dtStart) {
    setOnDepartmentError("dtStart", "Campo obrigatório");
  }
  if (!state.reportsConfig.onDepartment.dtEnd) {
    setOnDepartmentError("dtEnd", "Campo obrigatório");
  }

  if (!isInvalid) {
    try {
      const start = parseLocalDate(state.reportsConfig.onDepartment.dtStart);
      const end = parseLocalDate(state.reportsConfig.onDepartment.dtEnd);
      if (start > end) {
        setOnDepartmentError(
          "dtEnd",
          "A data final não pode ser menor que a data inicial"
        );
      }
    } catch (e) {
      setOnDepartmentError("dtStart", "Data inválida");
      setOnDepartmentError("dtEnd", "Data inválida");
    }
  }

  setState((prev) => ({
    ...prev,
    errors: { ...prev.errors, onDepartment: onDepartmentErrors },
  }));
  return !isInvalid;
};

const validateOnLoan = (state, setState) => {
  let isInvalid = false;
  const onLoanErrors = {
    dtStart: false,
    dtStartErrorText: "",
    dtEnd: false,
    dtEndErrorText: "",
  };

  const setOnLoanError = (key, message) => {
    onLoanErrors[key] = true;
    onLoanErrors[key + "ErrorText"] = message;
    isInvalid = true;
  };

  if (!state.reportsConfig.onLoan.dtStart) {
    setOnLoanError("dtStart", "Campo obrigatório");
  }
  if (!state.reportsConfig.onLoan.dtEnd) {
    setOnLoanError("dtEnd", "Campo obrigatório");
  }

  if (!isInvalid) {
    try {
      const start = parseLocalDate(state.reportsConfig.onLoan.dtStart);
      const end = parseLocalDate(state.reportsConfig.onLoan.dtEnd);
      if (start > end) {
        setOnLoanError(
          "dtEnd",
          "A data final não pode ser menor que a data inicial"
        );
      }
    } catch (e) {
      setOnLoanError("dtStart", "Data inválida");
      setOnLoanError("dtEnd", "Data inválida");
    }
  }

  setState((prev) => ({
    ...prev,
    errors: { ...prev.errors, onLoan: onLoanErrors },
  }));
  return !isInvalid;
};

const validatePending = (state, setState) => {
  let isInvalid = false;
  const pendingErrors = {
    dtStart: false,
    dtStartErrorText: "",
    dtEnd: false,
    dtEndErrorText: "",
  };

  const setPendingError = (key, message) => {
    pendingErrors[key] = true;
    pendingErrors[key + "ErrorText"] = message;
    isInvalid = true;
  };

  if (!state.reportsConfig.pending.dtStart) {
    setPendingError("dtStart", "Campo obrigatório");
  }
  if (!state.reportsConfig.pending.dtEnd) {
    setPendingError("dtEnd", "Campo obrigatório");
  }

  if (!isInvalid) {
    try {
      const start = parseLocalDate(state.reportsConfig.pending.dtStart);
      const end = parseLocalDate(state.reportsConfig.pending.dtEnd);
      if (start > end) {
        setPendingError(
          "dtEnd",
          "A data final não pode ser menor que a data inicial"
        );
      }
    } catch (e) {
      setPendingError("dtStart", "Data inválida");
      setPendingError("dtEnd", "Data inválida");
    }
  }

  setState((prev) => ({
    ...prev,
    errors: { ...prev.errors, pending: pendingErrors },
  }));
  return !isInvalid;
};

const validateMaintenceSchedule = (state, setState) => {
  let isInvalid = false;
  const maintenceScheduleErrors = {
    dtStart: false,
    dtStartErrorText: "",
    dtEnd: false,
    dtEndErrorText: "",
  };

  const setMaintenceScheduleError = (key, message) => {
    maintenceScheduleErrors[key] = true;
    maintenceScheduleErrors[key + "ErrorText"] = message;
    isInvalid = true;
  };

  if (!state.reportsConfig.maintenceSchedule.dtStart) {
    setMaintenceScheduleError("dtStart", "Campo obrigatório");
  }
  if (!state.reportsConfig.maintenceSchedule.dtEnd) {
    setMaintenceScheduleError("dtEnd", "Campo obrigatório");
  }

  if (!isInvalid) {
    try {
      const start = parseLocalDate(
        state.reportsConfig.maintenceSchedule.dtStart
      );
      const end = parseLocalDate(state.reportsConfig.maintenceSchedule.dtEnd);
      if (start > end) {
        setMaintenceScheduleError(
          "dtEnd",
          "A data final não pode ser menor que a data inicial"
        );
      }
    } catch (e) {
      setMaintenceScheduleError("dtStart", "Data inválida");
      setMaintenceScheduleError("dtEnd", "Data inválida");
    }
  }

  setState((prev) => ({
    ...prev,
    errors: { ...prev.errors, maintenceSchedule: maintenceScheduleErrors },
  }));
  return !isInvalid;
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
