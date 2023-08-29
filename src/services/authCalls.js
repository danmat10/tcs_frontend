import { REFRESH_TOKEN_EXPIRES_AT } from "config";
import { AUTH_TOKEN_EXPIRES_AT } from "config";

const { ENDPOINTS } = require("config");
const { MESSAGES } = require("config");
const { handleApiCall } = require("./apiUtils");

const handleLogin = async ({ data, signIn }) => {
    let response = await handleApiCall(
        { method: "post", endpoint: ENDPOINTS.AUTH.LOGIN, data: data },
        MESSAGES.AUTH.LOGIN
    );
    if (response) {
        signIn({
            expiresIn: AUTH_TOKEN_EXPIRES_AT,
            token: response.access_token,
            tokenType: "Bearer",
            refreshToken: response.refresh_token,
            refreshTokenExpireIn: REFRESH_TOKEN_EXPIRES_AT,
            authState: response.user,
        });
    }
};

const handleEditPassword = async ({ data, header }) => {
    await handleApiCall({
        method: "put",
        endpoint: ENDPOINTS.USER.PROFILE.PUT_CHANGE_PASSWORD(data.id),
        data: data,
        header: header
    },
        MESSAGES.USER.PROFILE.PATCH_PASSWORD
    );
};

export { handleLogin, handleEditPassword };