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

  const cpfError = validateCPForCNPJ(values.nmCpf);
  if (cpfError) {
    errors.nmCpf = cpfError;
  }

  const trimmedNmFornecedor = values.nmFornecedor?.trim();
  if (!trimmedNmFornecedor) {
    errors.nmFornecedor = "Obrigatório";
  } else if (trimmedNmFornecedor.length < 3) {
    errors.nmFornecedor =
      "O nome do fornecedor deve ter pelo menos 3 caracteres";
  }

  const trimmedNmNF = values.nmNF?.trim();
  if (!trimmedNmNF) {
    errors.nmNF = "Obrigatório";
  }

  const trimmedDtNf = values.dtNf?.trim();
  if (!trimmedDtNf) {
    errors.dtNf = "Obrigatório";
  }

  const trimmedDtAquisicao = values.dtAquisicao?.trim();
  if (!trimmedDtAquisicao) {
    errors.dtAquisicao = "Obrigatório";
  }

  if (trimmedDtAquisicao && trimmedDtNf) {
    const dtNf = new Date(trimmedDtNf);
    const dtAquisicao = new Date(trimmedDtAquisicao);
    if (dtNf > dtAquisicao) {
      errors.dtAquisicao = "A data de aquisição deve ser maior que a NF";
    }
  }

  if (!values.vlAquisicao || values.vlAquisicao <= 0) {
    errors.vlAquisicao = "Obrigatório";
  }

  if (values.warranties.length > 0) {
    values.warranties.forEach((warranty, index) => {
      const trimmedDsWarranty = warranty.dsWarranty?.trim();
      if (!trimmedDsWarranty) {
        errors.warranties = errors.warranties || [];
        errors.warranties[index] = { dsWarranty: "Obrigatório" };
      }
    });
  }

  return errors;
};

const validatePatrimonyEditForm = (values, patrimony) => {
  const errors = validatePatrimonyCreateForm(values);

  if (
    values.nmPatrimonio === patrimony.nmPatrimonio &&
    values.nmSerie === patrimony.nmSerie &&
    values.nmDescricao === patrimony.nmDescricao &&
    values.nmCpf === patrimony.nmCpf &&
    values.nmFornecedor === patrimony.nmFornecedor &&
    values.nmNF === patrimony.nmNF &&
    values.dtNf === patrimony.dtNf &&
    values.dtAquisicao === patrimony.dtAquisicao &&
    values.vlAquisicao === patrimony.vlAquisicao &&
    values.fixo === patrimony.fixo &&
    JSON.stringify(values.warranties) === JSON.stringify(patrimony.warranties)
  ) {
    errors._errors = "Nenhum campo foi alterado";
  }

  return errors;
};

export { validatePatrimonyCreateForm, validatePatrimonyEditForm };
