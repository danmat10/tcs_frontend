import axios from "axios";
import { ENDPOINTS } from "config";
import { AUTH_TOKEN_EXPIRES_AT } from "config";
import { createRefresh } from "react-auth-kit";
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

const handleApiCall = async (config, toastObject) => {
  const { method, endpoint, data, header } = config;
  const response = await apiCall(method, endpoint, data, header, toastObject);
  return response;
};

const refreshApi = createRefresh({
  interval: AUTH_TOKEN_EXPIRES_AT,
  refreshApiCallback: async ({
    authToken,
    authTokenExpireAt,
    refreshToken,
    refreshTokenExpiresAt,
    authUserState,
  }) => {
    try {
      const response = await axios.post(ENDPOINTS.AUTH.REFRESH, {
        refresh_token: refreshToken,
      });
      return {
        isSuccess: true,
        newAuthToken: response.data.access_token,
        newAuthTokenExpireIn: AUTH_TOKEN_EXPIRES_AT,
        newRefreshToken: refreshToken,
        newRefreshTokenExpireIn: refreshTokenExpiresAt,
        newAuthUserState: authUserState,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
      };
    }
  },
});

const handleBuscaCep = async (cep) => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    if (data.erro) {
      return null;
    }
    return data;
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    return null;
  }
};

export { apiCall, handleApiCall, refreshApi, handleBuscaCep };
