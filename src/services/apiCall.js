import axios from "axios";
import { toast } from "react-toastify";

const defaultHeaders = {
  "Content-Type": "application/json",
};

const createConfig = (method, endpoint, data, headers) => {
  const config = {
    method,
    url: endpoint,
    headers: { ...defaultHeaders, ...headers },
  };

  if (data !== null) {
    config.data = data;
  }

  return config;
};

const handleApiResponseWithToast = async (config, toastConfig) => {
  return toast
    .promise(axios(config), {
      pending: toastConfig.pending,
      success: toastConfig.success,
      error: {
        render({ data }) {
          return (
            toastConfig.error[data?.response?.status] ||
            toastConfig.error.default
          );
        },
      },
    })
    .then((response) => response.data)
    .catch((error) => {});
};

const handleApiResponseWithoutToast = async (config) => {
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

const apiCall = async (
  method,
  endpoint,
  data = null,
  headers = {},
  toastConfig = {
    pending: "Processando...",
    success: "Sucesso!",
    error: {
      default: "Erro ao processar.",
    },
    show: true,
  }
) => {
  const config = createConfig(method, endpoint, data, headers);

  if (toastConfig.show) {
    return handleApiResponseWithToast(config, toastConfig);
  } else {
    return handleApiResponseWithoutToast(config);
  }
};

export default apiCall;
