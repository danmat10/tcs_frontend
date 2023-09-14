import axios from "axios";
import { createRefresh } from "react-auth-kit";

import { handleApiCall } from ".";
import {
  AUTH_TOKEN_EXPIRES_AT,
  ENDPOINTS,
  MESSAGES,
  REFRESH_TOKEN_EXPIRES_AT,
} from "config";

const handleLogin = async ({ data, signIn }) => {
  let response = await handleApiCall(
    { method: "post", endpoint: ENDPOINTS.AUTH.LOGIN, data: data },
    MESSAGES.AUTH.LOGIN
  );
  if (response) {
    signIn({
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

export { handleLogin, handleEditPassword, refreshApi };
