import { Chip } from "@mui/material";

const parseLocalDate = (dateString) => {
  const [day, month, year] = dateString
    .split("/")
    .map((num) => parseInt(num, 10));
  return new Date(year, month - 1, day);
};

const MaintenceStatusChip = ({ maintence }) => {
  let status = getMaintenceStatus(maintence);

  let statusColor = "default";
  switch (status) {
    case "Executada":
      statusColor = "success";
      break;
    case "Em Execução":
      statusColor = "warning";
      break;
    case "Atrasada":
      statusColor = "error";
      break;
    case "Cancelada":
      statusColor = "default";
      break;
    default:
      statusColor = "info";
  }
  return (
    <Chip label={status} color={statusColor} variant="filled" size="small" />
  );
};

const getMaintenceStatus = (maintence) => {
  let status = maintence.statusMaintenance;

  if (status === "Agendada") {
    try {
      const dtPrevisionMaintence = parseLocalDate(
        maintence.dtPrevisionMaintence
      );
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      if (dtPrevisionMaintence < currentDate) {
        status = "Atrasada";
      }
    } catch (err) {
      console.log(err);
    }
  }
  return status;
};

export { MaintenceStatusChip, getMaintenceStatus };
