import { BASEURL } from "config";

const SPRINGURL = "http://localhost:8080";

const ENDPOINTS = {
  AUTH: {
    LOGIN: BASEURL + "/auth/login",
    REFRESH: BASEURL + "/auth/refresh",
  },
  USER: {
    POST: SPRINGURL + "/api/users",
    GET: SPRINGURL + "/api/users",
    GET_ID: (id) => SPRINGURL + "/api/users/" + id,
    PATCH: SPRINGURL + "/api/users/",
    PATCH_ID: (id) => SPRINGURL + "/api/users/" + id,
    DELETE: SPRINGURL + "/api/users/",
    PROFILE: {
      GET_PHOTO: (id) => BASEURL + "/uploads/" + id,
      POST_PHOTO: (id) => BASEURL + "/users/" + id + "/photo",
      PUT_CHANGE_PASSWORD: (id) =>
        BASEURL + "/auth/user/" + id + "/change-password",
    },
  },
};

export default ENDPOINTS;
