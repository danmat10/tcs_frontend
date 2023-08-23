import axios from "axios";
import { toast } from "react-toastify";

const apiCall = async (
  method,
  endpoint,
  data = null,
  headers = {},
  toastConfig = {
    pending: "Processando...",
    success: "Sucesso!",
    error: "Erro ao processar.",
    show: true,
  }
) => {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const config = {
    method,
    url: endpoint,
    headers: { ...defaultHeaders, ...headers },
  };

  if (data !== null) {
    config.data = data;
  }

  if (toastConfig.show) {
    return toast
      .promise(axios(config), {
        pending: toastConfig.pending,
        success: toastConfig.success,
        error: {
          render({ data }) {
            const errorMessage = data?.response?.data?.message || "";
            return toastConfig.error + errorMessage;
          },
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        if (!toastConfig.show) {
          toast.error(error.message);
        }
      });
  } else {
    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      toast.error(error.message);
    }
  }
};

export default apiCall;
