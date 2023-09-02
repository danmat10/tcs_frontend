import { BASEURL } from "config";

const SPRINGURL = "http://localhost:8080";

const ENDPOINTS = {
  AUTH: {
    LOGIN: BASEURL + "/auth/login",
    REFRESH: BASEURL + "/auth/refresh",
  },
  USER: {
    POST: BASEURL + "/api/users",
    GET: BASEURL + "/api/users",
    GET_ID: (id) => BASEURL + "/api/users/" + id,
    PATCH: BASEURL + "/api/users/",
    PATCH_ID: (id) => BASEURL + "/api/users/" + id,
    PROFILE: {
      GET_PHOTO: (id) => BASEURL + "/uploads/" + id,
      POST_PHOTO: (id) => BASEURL + "/users/" + id + "/photo",
      PUT_CHANGE_PASSWORD: (id) =>
        BASEURL + "/auth/user/" + id + "/change-password",
    },
  },
  DEPARTMENT: {
    GET: BASEURL + "/api/departments",
    POST: BASEURL + "/api/departments",
    PATCH_id: (id) => BASEURL + "/api/departments/" + id,
  },
  CONSTRUCTION: {
    GET: BASEURL + "/api/constructions",
    POST: BASEURL + "/api/constructions",
    PUT_ID: (id) => BASEURL + "/api/constructions/" + id,
  },
};

export { ENDPOINTS };
