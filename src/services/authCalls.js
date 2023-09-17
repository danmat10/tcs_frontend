import axios from "axios";
import { createRefresh } from "react-auth-kit";

import { handleApiCall } from "services";
import {
  AUTH_TOKEN_EXPIRES_AT,
  ENDPOINTS,
  MESSAGES,
  REFRESH_TOKEN_EXPIRES_AT,
} from "config";

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
        refreshToken: refreshToken,
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

export { handleFirstAccess, handleLogin, handleEditPassword, refreshApi };
