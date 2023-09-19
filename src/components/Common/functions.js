function formatDateToField(input) {
  if (!input) return "";
  const date = new Date(input);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

function formatFieldToDate(input) {
  if (!input) return "";
  const partes = input.split("-");
  if (partes.length !== 3) return "";
  const [ano, mes, dia] = partes;
  return `${dia}/${mes}/${ano}`;
}

function formatBackendDateToField(input) {
  if (!input) return "";
  const partes = input.split("/");
  if (partes.length !== 3) return "";
  const [dia, mes, ano] = partes;
  return `${ano}-${mes}-${dia}`;
}

export { formatDateToField, formatFieldToDate, formatBackendDateToField };
