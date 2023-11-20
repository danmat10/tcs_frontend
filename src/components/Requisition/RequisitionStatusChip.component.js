import { Chip } from "@mui/material";

const parseLocalDate = (dateString) => {
  const [day, month, year] = dateString
    .split("/")
    .map((num) => parseInt(num, 10));
  return new Date(year, month - 1, day);
};

const getRequisitionStatus = (requisition) => {
  let status = "Pendente";

  if (
    requisition.patrimonios[0].dtPrevisaoRetirada !== null &&
    requisition.patrimonios[0].dtDevolucao !== null &&
    requisition.patrimonios[0].dtRetirada !== null
  ) {
    status = "Devolvida";
  }
  if (
    requisition.patrimonios[0].dtPrevisaoRetirada !== null &&
    requisition.patrimonios[0].dtDevolucao === null &&
    requisition.patrimonios[0].dtRetirada !== null
  ) {
    status = "Em Obra";
  }

  if (status === "Pendente") {
    try {
      const dtPrevisaoRetirada = parseLocalDate(
        requisition.patrimonios[0].dtPrevisaoRetirada
      );
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      if (dtPrevisaoRetirada < currentDate) {
        status = "Retirada Atrasada";
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (status === "Em Obra") {
    try {
      const dtPrevisaoDevolucao = parseLocalDate(
        requisition.patrimonios[0].dtPrevisaoDevolucao
      );
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      if (dtPrevisaoDevolucao < currentDate) {
        status = "Devolução Atrasada";
      }
    } catch (err) {
      console.log(err);
    }
  }

  return status;
};

const RequisitionStatusChip = ({ requisition }) => {
  let status = getRequisitionStatus(requisition);

  let statusColor = "info";
  switch (status) {
    case "Pendente":
      statusColor = "warning";
      break;
    case "Em Obra":
      statusColor = "info";
      break;
    case "Devolvida":
      statusColor = "success";
      break;
    case "Rejeitada":
      statusColor = "error";
      break;
    case "Retirada Atrasada":
      statusColor = "secondary";
      break;
    default:
      statusColor = "info";
  }
  return (
    <Chip label={status} color={statusColor} variant="filled" size="small" />
  );
};

export { RequisitionStatusChip };
