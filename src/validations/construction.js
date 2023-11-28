const { validateCPForCNPJ } = require("./user");

const validateConstructionCreateForm = (values) => {
  const errors = {};

  const trimmedObra = values.nmObra?.trim();
  if (!trimmedObra) {
    errors.nmObra = "Obrigatório";
  } else if (trimmedObra.length < 2) {
    errors.nmObra = "O nome da obra deve ter pelo menos 2 caracteres";
  }

  if (!values.usuario) {
    errors.usuario = "Obrigatório";
  }

  const cpfError = validateCPForCNPJ(values.nrCnpjCpf);
  if (cpfError) {
    errors.nrCnpjCpf = cpfError;
  }

  const trimmedCliente = values.nmCliente?.trim();
  if (!trimmedCliente) {
    errors.nmCliente = "Obrigatório";
  } else if (trimmedCliente.length < 2) {
    errors.nmCliente = "O nome do cliente deve ter pelo menos 2 caracteres";
  }

  const trimmedBairro = values.nmBairro?.trim();
  if (!trimmedBairro) {
    errors.nmBairro = "Obrigatório";
  }

  const trimmedLogradouro = values.nmLogradouro?.trim();
  if (!trimmedLogradouro) {
    errors.nmLogradouro = "Obrigatório";
  }

  const trimmedNumero = String(values.nrNumero).trim();
  if (!trimmedNumero) {
    errors.nrNumero = "Obrigatório";
  }

  const trimmedCidade = values.nmCidade?.trim();
  if (!trimmedCidade) {
    errors.nmCidade = "Obrigatório";
  }

  const trimmedEstado = values.nmUf?.trim();
  if (!trimmedEstado) {
    errors.nmUf = "Obrigatório";
  }

  const trimmedDtInicio = values.dtInicio?.trim();
  if (!trimmedDtInicio) {
    errors.dtInicio = "Obrigatório";
  }

  const trimmedDtPrevisaoFinalizacao = values.dtPrevisaoConclusao?.trim();
  if (!trimmedDtPrevisaoFinalizacao) {
    errors.dtPrevisaoConclusao = "Obrigatório";
  }

  if (trimmedDtInicio && trimmedDtPrevisaoFinalizacao) {
    const dtInicio = new Date(trimmedDtInicio);
    const dtPrevisaoFinalizacao = new Date(trimmedDtPrevisaoFinalizacao);
    if (dtInicio > dtPrevisaoFinalizacao) {
      errors.dtPrevisaoConclusao =
        "A data de previsão de finalização deve ser maior que a data de início";
    }
  }

  return errors;
};

const validateConstructionEditForm = (values, construction) => {
  const errors = validateConstructionCreateForm(values);
  if (values.usuario && values.usuario.flStatus === "Inativo") {
    errors.usuario = "O usuário selecionado está inativo";
  }

  const trimmedDtFinalizacao = values.dtFim?.trim();
  if (trimmedDtFinalizacao) {
    const dtInicio = new Date(values.dtInicio);
    const dtFinalizacao = new Date(trimmedDtFinalizacao);
    if (dtInicio > dtFinalizacao) {
      errors.dtFim =
        "A data de finalização deve ser maior que a data de início";
    }
  }

  if (
    values.nmObra === construction.nmObra &&
    values.usuario.id === construction.usuario.id &&
    values.nrCnpjCpf === construction.nrCnpjCpf &&
    values.nmCliente === construction.nmCliente &&
    values.nmCep === construction.nmCep &&
    values.nmBairro === construction.nmBairro &&
    values.nmLogradouro === construction.nmLogradouro &&
    values.nrNumero === construction.nrNumero &&
    values.nmComplemento === construction.nmComplemento &&
    values.nmCidade === construction.nmCidade &&
    values.nmUf === construction.nmUf &&
    values.dtInicio === construction.dtInicio &&
    values.dtPrevisaoFinalizacao === construction.dtPrevisaoFinalizacao &&
    values.dtFim === construction.dtFim
  ) {
    errors._errors = "Nenhuma alteração foi feita";
  }

  return errors;
};

export { validateConstructionCreateForm, validateConstructionEditForm };
