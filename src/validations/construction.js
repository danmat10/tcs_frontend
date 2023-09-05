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

  const cpfError = validateCPForCNPJ(values.nmCpf);
  if (cpfError) {
    errors.nmCpf = cpfError;
  }

  const trimmedCliente = values.nmCliente?.trim();
  if (!trimmedCliente) {
    errors.nmCliente = "Obrigatório";
  } else if (trimmedCliente.length < 2) {
    errors.nmCliente = "O nome do cliente deve ter pelo menos 2 caracteres";
  }

  const enderecoErrors = {};

  const trimmedBairro = values.endereco.nmBairro?.trim();
  if (!trimmedBairro) {
    enderecoErrors.nmBairro = "Obrigatório";
  }

  const trimmedLogradouro = values.endereco.nmLogradouro?.trim();
  if (!trimmedLogradouro) {
    enderecoErrors.nmLogradouro = "Obrigatório";
  }

  const trimmedNumero = values.endereco.nmNumero?.trim();
  if (!trimmedNumero) {
    enderecoErrors.nmNumero = "Obrigatório";
  }

  const trimmedCidade = values.endereco.nmCidade?.trim();
  if (!trimmedCidade) {
    enderecoErrors.nmCidade = "Obrigatório";
  }

  const trimmedEstado = values.endereco.nmEstado?.trim();
  if (!trimmedEstado) {
    enderecoErrors.nmEstado = "Obrigatório";
  }

  if (Object.keys(enderecoErrors).length) {
    errors.endereco = enderecoErrors;
  }

  const trimmedDtInicio = values.dtInicio?.trim();
  if (!trimmedDtInicio) {
    errors.dtInicio = "Obrigatório";
  }

  const trimmedDtPrevisaoFinalizacao = values.dtPrevisaoFinalizacao?.trim();
  if (!trimmedDtPrevisaoFinalizacao) {
    errors.dtPrevisaoFinalizacao = "Obrigatório";
  }

  if (trimmedDtInicio && trimmedDtPrevisaoFinalizacao) {
    const dtInicio = new Date(trimmedDtInicio);
    const dtPrevisaoFinalizacao = new Date(trimmedDtPrevisaoFinalizacao);
    if (dtInicio > dtPrevisaoFinalizacao) {
      errors.dtPrevisaoFinalizacao =
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

  const trimmedDtFinalizacao = values.dtFinalizacao?.trim();
  if (trimmedDtFinalizacao) {
    const dtInicio = new Date(values.dtInicio);
    const dtFinalizacao = new Date(trimmedDtFinalizacao);
    if (dtInicio > dtFinalizacao) {
      errors.dtFinalizacao =
        "A data de finalização deve ser maior que a data de início";
    }
  }

  if (
    values.nmObra === construction.nmObra &&
    values.usuario.id === construction.usuario.id &&
    values.nmCpf === construction.nmCpf &&
    values.nmCliente === construction.nmCliente &&
    values.endereco.nmCep === construction.endereco.nmCep &&
    values.endereco.nmBairro === construction.endereco.nmBairro &&
    values.endereco.nmLogradouro === construction.endereco.nmLogradouro &&
    values.endereco.nmNumero === construction.endereco.nmNumero &&
    values.endereco.nmComplemento === construction.endereco.nmComplemento &&
    values.endereco.nmCidade === construction.endereco.nmCidade &&
    values.endereco.nmEstado === construction.endereco.nmEstado &&
    values.dtInicio === construction.dtInicio &&
    values.dtPrevisaoFinalizacao === construction.dtPrevisaoFinalizacao &&
    values.dtFinalizacao === construction.dtFinalizacao
  ) {
    errors._errors = "Nenhuma alteração foi feita";
  }

  return errors;
};

export { validateConstructionCreateForm, validateConstructionEditForm };
