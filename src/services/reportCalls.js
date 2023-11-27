import axios from "axios";
import { ENDPOINTS, MESSAGES } from "config";
import { toast } from "react-toastify";

const handleCreateReport = async ({ data, header }) => {
  if (data.type === "EXCEL") {
    try {
      await toast.promise(
        handleExcelReport(data, header),
        MESSAGES.REPORT.POST
      );
    } catch (error) {
      console.error("Erro ao criar o relatório:", error);
    }
  } else {
    try {
      await toast.promise(handlePdfReport(data, header), MESSAGES.REPORT.POST);
    } catch (error) {
      console.error("Erro ao criar o relatório:", error);
    }
  }
};

const handleExcelReport = async (data, headers) => {
  try {
    const response = await axios.post(ENDPOINTS.REPORT.POST, data, {
      headers: headers,
      responseType: "blob",
    });

    const excelBlob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(excelBlob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "report.xlsx");

    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);

    window.URL.revokeObjectURL(url);

    return "Relatório Excel baixado com sucesso!";
  } catch (error) {
    console.error("Ocorreu um erro ao baixar o relatório Excel:", error);
    throw new Error("Falha ao baixar o relatório Excel");
  }
};

const handlePdfReport = async (data, headers) => {
  try {
    const response = await axios.post(ENDPOINTS.REPORT.POST, data, {
      headers: headers,
      responseType: "blob",
    });

    const pdfBlob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(pdfBlob);

    const link = document.createElement("a");
    link.href = url;

    link.setAttribute("target", "_blank");

    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);

    return "Relatório baixado e aberto com sucesso!";
  } catch (error) {
    console.error("Ocorreu um erro ao baixar e abrir o relatório:", error);
    throw new Error("Falha ao baixar e abrir o relatório");
  }
};

export { handleCreateReport };
