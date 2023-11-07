const { Chip } = require("@mui/material");

const PatrimonyStatusChip = ({ patrimony }) => {
  const status = patrimony.situacao;
  let statusColor = "default";
  switch (status) {
    case "Alocado":
      statusColor = "info";
      break;
    case "Disponível":
      statusColor = "success";
      break;
    case "Registrado":
      statusColor = "warning";
      break;
    default:
      statusColor = "default";
  }
  return (
    <Chip label={status} color={statusColor} variant="filled" size="small" />
  );
};

export { PatrimonyStatusChip };
