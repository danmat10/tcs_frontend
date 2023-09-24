import { BASEURL, SPRINGURL } from "config";

const ENDPOINTS = {
  AUTH: {
    LOGIN: SPRINGURL + "/api/auth/login",
    REFRESH: SPRINGURL + "/api/auth/refreshToken",
  },
  USER: {
    POST: SPRINGURL + "/api/users",
    GET: SPRINGURL + "/api/users",
    GET_ID: (id) => SPRINGURL + "/api/users/" + id,
    PATCH: SPRINGURL + "/api/users/",
    PATCH_ID: (id) => SPRINGURL + "/api/users/" + id,
    PROFILE: {
      GET_PHOTO: (id) => SPRINGURL + "/api/users/" + id + "/foto",
      POST_PHOTO: (id) => SPRINGURL + "/api/users/" + id + "/",
      PUT_CHANGE_PASSWORD: (id) =>
        SPRINGURL + "/api/users/" + id + "/change-password",
    },
  },
  DEPARTMENT: {
    GET: SPRINGURL + "/api/department",
    POST: SPRINGURL + "/api/department",
    PUT: SPRINGURL + "/api/department",
    DELETE_id: (id) => SPRINGURL + "/api/department/" + id,
  },
  CONSTRUCTION: {
    GET: SPRINGURL + "/api/construction",
    POST: SPRINGURL + "/api/construction",
    PUT_ID: (id) => SPRINGURL + "/api/construction/" + id,
  },
  PATRIMONY: {
    GET_ID: (id) => SPRINGURL + "/api/patrimony/" + id,
    GET: SPRINGURL + "/api/patrimony",
    POST: SPRINGURL + "/api/patrimony",
    PUT_ID: (id) => SPRINGURL + "/api/patrimony/" + id,
    SEARCH: (params) => {
      const url = new URL(SPRINGURL + "/api/patrimony/search");
      for (const key in params) {
        url.searchParams.append(key, params[key]);
      }
      return url.toString();
    },
  },
  MAINTENCE: {
    GET: BASEURL + "/api/maintences",
    POST: BASEURL + "/api/maintences",
    PUT_ID: (id) => BASEURL + "/api/maintences/" + id,
  },
  ALLOCATION: {
    GET: SPRINGURL + "/api/allocation",
    POST: SPRINGURL + "/api/allocation",
  },
};

export { ENDPOINTS };
