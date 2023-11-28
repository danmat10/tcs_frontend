import axios from "axios";
import { createRefresh } from "react-auth-kit";

import { handleApiCall } from "services";
import { ENDPOINTS, MESSAGES } from "config";

const AUTH_TOKEN_EXPIRES_AT = 90;
const REFRESH_TOKEN_EXPIRES_AT = 90;
const AUTH_TOKEN_REFRESH_INTERVAL = 15;

const handleLogin = async ({ data, state, setState }) => {
  let response = await handleApiCall(
    { method: "post", endpoint: ENDPOINTS.AUTH.LOGIN, data: data },
    MESSAGES.AUTH.LOGIN
  );
  if (response) {
    if (response.user.primeiroAcesso) {
      setState({
        ...state,
        view: "firstAccess",
        user: {
          username: response.user.nmUsuario,
          currentPassword: data.password,
          id: response.user.id,
          user: response.user,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        },
      });
      return;
    }
    state.signIn({
      expiresIn: AUTH_TOKEN_EXPIRES_AT,
      token: response.accessToken,
      tokenType: "Bearer",
      refreshToken: response.refreshToken,
      refreshTokenExpireIn: REFRESH_TOKEN_EXPIRES_AT,
      authState: response.user,
    });
  }
};

const handleEditPassword = async ({ data, header, id }) => {
  await handleApiCall(
    {
      method: "put",
      endpoint: ENDPOINTS.USER.PROFILE.PUT_CHANGE_PASSWORD(id),
      data: data,
      header: header,
    },
    MESSAGES.USER.PROFILE.PATCH_PASSWORD
  );
};

const handleFirstAccess = async ({ data, state }) => {
  const response = await handleApiCall(
    {
      method: "put",
      endpoint: ENDPOINTS.USER.PROFILE.PUT_CHANGE_PASSWORD(state.user.id),
      data: data,
      header: {
        Authorization: "Bearer " + state.user.accessToken,
      },
    },
    MESSAGES.USER.PROFILE.PATCH_PASSWORD
  );
  if (response !== undefined) {
    state.signIn({
      expiresIn: AUTH_TOKEN_EXPIRES_AT,
      token: state.user.accessToken,
      tokenType: "Bearer",
      refreshToken: state.user.refreshToken,
      refreshTokenExpireIn: REFRESH_TOKEN_EXPIRES_AT,
      authState: state.user,
    });
  }
};

const refreshApi = createRefresh({
  interval: AUTH_TOKEN_REFRESH_INTERVAL,
  refreshApiCallback: async ({ refreshToken, authUserState }) => {
    console.log("refreshApiCallback");
    try {
      const response = await axios.post(ENDPOINTS.AUTH.REFRESH, {
        refreshToken: refreshToken,
      });
      return {
        isSuccess: true,
        newAuthToken: response.data.access_token,
        newAuthTokenExpireIn: AUTH_TOKEN_EXPIRES_AT,
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

const handleResetPassword = async ({ data }) => {
  await handleApiCall(
    {
      method: "post",
      endpoint: ENDPOINTS.AUTH.RESET_PASSWORD,
      data: data,
    },
    MESSAGES.AUTH.RESET_PASSWORD
  );
};

export {
  handleFirstAccess,
  handleLogin,
  handleEditPassword,
  refreshApi,
  handleResetPassword,
};
