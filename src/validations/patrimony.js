const { validateCPForCNPJ } = require("./user");

const validatePatrimonyCreateForm = (values) => {
  const errors = {};

  const trimmedNmPatrimonio = values.nmPatrimonio?.trim();
  if (!trimmedNmPatrimonio) {
    errors.nmPatrimonio = "Obrigatório";
  } else if (trimmedNmPatrimonio.length < 2) {
    errors.nmPatrimonio =
      "O nome do patrimônio deve ter pelo menos 2 caracteres";
  }

  const cpfError = validateCPForCNPJ(values.nrCnpj);
  if (cpfError) {
    errors.nrCnpj = cpfError;
  }

  const trimmedNmFornecedor = values.nmFornecedor?.trim();
  if (!trimmedNmFornecedor) {
    errors.nmFornecedor = "Obrigatório";
  } else if (trimmedNmFornecedor.length < 3) {
    errors.nmFornecedor =
      "O nome do fornecedor deve ter pelo menos 3 caracteres";
  }

  if (!values.nrNF || values.nrNF <= 0) {
    errors.nrNF = "Obrigatório";
  }

  const trimmedDtNF = values.dtNF?.trim();
  if (!trimmedDtNF) {
    errors.dtNF = "Obrigatório";
  }

  const trimmedDtAquisicao = values.dtAquisicao?.trim();
  if (!trimmedDtAquisicao) {
    errors.dtAquisicao = "Obrigatório";
  }

  if (trimmedDtAquisicao && trimmedDtNF) {
    const dtNF = new Date(trimmedDtNF);
    const dtAquisicao = new Date(trimmedDtAquisicao);
    if (dtNF > dtAquisicao) {
      errors.dtAquisicao = "A data de aquisição deve ser maior que a NF";
    }
  }

  if (!values.vlAquisicao || values.vlAquisicao <= 0) {
    errors.vlAquisicao = "Obrigatório";
  }

  if (values.warranties.length > 0) {
    values.warranties.forEach((warranty, index) => {
      const trimmedDsWarranty = warranty.tipoGarantia?.trim();
      if (!trimmedDsWarranty) {
        errors.warranties = errors.warranties || [];
        errors.warranties[index] = { tipoGarantia: "Obrigatório" };
      }
    });
  }

  return errors;
};

const validatePatrimonyEditForm = (values, patrimony) => {
  const errors = validatePatrimonyCreateForm(values);

  if (
    values.nmPatrimonio === patrimony.nmPatrimonio &&
    values.nrSerie === patrimony.nrSerie &&
    values.nmDescricao === patrimony.nmDescricao &&
    values.nrCnpj === patrimony.nrCnpj &&
    values.nmFornecedor === patrimony.nmFornecedor &&
    values.nrNF === patrimony.nrNF &&
    values.dtNF === patrimony.dtNF &&
    values.dtAquisicao === patrimony.dtAquisicao &&
    values.vlAquisicao === patrimony.vlAquisicao &&
    values.fixo === patrimony.fixo &&
    JSON.stringify(values.warranties) === JSON.stringify(patrimony.warranties)
  ) {
    errors._errors = "Nenhum campo foi alterado";
  }

  return errors;
};

const validatePatrionyDropForm = (values) => {
  const errors = {};

  const trimmedDtLost = values.dtLost?.trim();
  if (!trimmedDtLost) {
    errors.dtLost = "Obrigatório";
  }

  return errors;
};

export {
  validatePatrimonyCreateForm,
  validatePatrimonyEditForm,
  validatePatrionyDropForm,
};
