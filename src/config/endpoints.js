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
    GET_ID: (id) => BASEURL + "/db/users/" + id,
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
  DEPARTMENT: {
    GET: BASEURL + "/db/departments",
    POST: BASEURL + "/db/departments",
    PATCH_id: (id) => BASEURL + "/db/departments/" + id,
    DELETE: BASEURL + "/db/departments/",
  },
  CONSTRUCTION: {
    GET: BASEURL + "/db/constructions",
    POST: BASEURL + "/db/constructions",
    PATCH_id: (id) => BASEURL + "/db/constructions/" + id,
    DELETE: BASEURL + "/db/constructions/",
  },
};

export default ENDPOINTS;
