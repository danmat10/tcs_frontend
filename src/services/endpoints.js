import { BASEURL } from "../config";

const ENDPOINTS = {
  AUTH: {
    LOGIN: BASEURL + "/auth/login",
    REFRESH: BASEURL + "/auth/refresh",
  },
  USER: {
    POST: BASEURL + "/db/users",
    GET: BASEURL + "/db/users",
    GET_ID: (id) => BASEURL + "/db/users/" + id,
    PATCH: BASEURL + "/db/users/",
    PATCH_ID: (id) => BASEURL + "/db/users/" + id,
    DELETE: BASEURL + "/db/users/",
    PROFILE: {
      POST_PHOTO: (id) => BASEURL + "/users/" + id + "/photo",
      PUT_CHANGE_PASSWORD: (id) =>
        BASEURL + "/auth/user/" + id + "/change-password",
    },
  },
};

export default ENDPOINTS;
