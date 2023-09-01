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

  return errors;
};

export { validateConstructionCreateForm };
