import { BASEURL } from "config";

const SPRINGURL = "http://localhost:8080";

const ENDPOINTS = {
  AUTH: {
    LOGIN: BASEURL + "/api/auth/login",
    REFRESH: BASEURL + "/api/auth/refreshToken",
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
    DELETE_id: (id) => BASEURL + "/api/departments/" + id,
  },
  CONSTRUCTION: {
    GET: BASEURL + "/api/constructions",
    POST: BASEURL + "/api/constructions",
    PUT_ID: (id) => BASEURL + "/api/constructions/" + id,
  },
  PATRIMONY: {
    GET_PARAMS: (params) => {
      const url = new URL(BASEURL + "/api/patrimonies");
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
      return url.toString();
    },
    GET_ID: (id) => BASEURL + "/api/patrimonies/" + id,
    GET: BASEURL + "/api/patrimonies",
    POST: BASEURL + "/api/patrimonies",
    PUT_ID: (id) => BASEURL + "/api/patrimonies/" + id,
  },
  MAINTENCE: {
    GET: BASEURL + "/api/maintences",
    POST: BASEURL + "/api/maintences",
    PUT_ID: (id) => BASEURL + "/api/maintences/" + id,
  },
};

export { ENDPOINTS };
