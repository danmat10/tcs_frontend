import { BASEURL } from "../config";

const ENDPOINTS = {
  AUTH: {
    LOGIN: BASEURL + "/auth/login",
    REFRESH: BASEURL + "/auth/refresh",
  },
  USER: {
    POST: BASEURL + "/db/users",
    GET: BASEURL + "/db/users",
    PATCH: BASEURL + "/db/users/",
    DELETE: BASEURL + "/db/users/",
  },
};

export default ENDPOINTS;
