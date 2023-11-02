const { Chip } = require("@mui/material");

const MaintenceStatusChip = ({ maintence }) => {
  const status = getMaintenceStatus(maintence);
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
    default:
      statusColor = "info";
  }
  return (
    <Chip label={status} color={statusColor} variant="filled" size="small" />
  );
};

function getMaintenceStatus(maintence) {
  if (maintence.dtEndMaintence) {
    return "Concluída";
  }
  if (maintence.dtStartMaintence) {
    return "Em manutenção";
  }
  const [year, month, day] = maintence.dtPrevisionMaintence
    .split("-")
    .map(Number);
  const previsionDate = new Date(year, month - 1, day);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  if (previsionDate < currentDate) {
    return "Atrasada";
  } else {
    return "Prevista";
  }
}

export { MaintenceStatusChip, getMaintenceStatus };
