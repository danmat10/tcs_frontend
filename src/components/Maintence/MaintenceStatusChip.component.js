const { Chip } = require("@mui/material");

const MaintenceStatusChip = ({ maintence }) => {
  const status = maintence.statusMaintenance;
  let statusColor = "default";
  switch (status) {
    case "Concluída":
      statusColor = "success";
      break;
    case "Em manutenção":
      statusColor = "warning";
      break;
    case "Atrasada":
      statusColor = "error";
      break;
    case "Cancelada":
      statusColor = "default";
    default:
      statusColor = "info";
  }
  return (
    <Chip label={status} color={statusColor} variant="filled" size="small" />
  );
};

export { MaintenceStatusChip };
