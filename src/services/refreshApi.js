import axios from "axios";
import { createRefresh } from "react-auth-kit";

import ENDPOINTS from "./endpoints";
import {AUTH_TOKEN_EXPIRES_AT} from "config/constants";

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
        newAuthUserState: authUserState
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
      };
    }
  },
});

export default refreshApi;
