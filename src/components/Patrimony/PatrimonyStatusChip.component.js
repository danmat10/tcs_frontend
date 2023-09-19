const { Chip } = require("@mui/material");

const PatrimonyStatusChip = ({ patrimony }) => {
  const status = getPatrimonyStatus(patrimony);
  let statusColor = "default";
  switch (status) {
    case "Em Obra":
      statusColor = "info";
      break;
    case "Disponível":
      statusColor = "success";
      break;
    default:
      statusColor = "default";
  }
  return (
    <Chip label={status} color={statusColor} variant="filled" size="small" />
  );
};

function getPatrimonyStatus(patrimony) {
  if (patrimony.fixo) {
    return "Fixo";
  } else if (patrimony.actualConstruction) {
    return "Em Obra";
  } else {
    return "Disponível";
  }
}

export { PatrimonyStatusChip, getPatrimonyStatus };
