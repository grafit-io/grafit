let BASE_URL = window.location.origin.toString() + "/";

if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname === "0.0.0.0"
) {
  BASE_URL = "http://" + window.location.hostname + ":8000/";
}

export const AUTH_API = BASE_URL + "api-token-auth/";
export const API = BASE_URL + "api/v1/";

export const JWT_LOCALSTOR_KEY = "jwt";

export const ARTICLE_ENDPOINT = "articles/";
export const ARTICLETITLE_ENDPOINT = "articletitless";
export const USER_ENDPOINT = "users/";
export const WORKSPACE_ENDPOINT = "workspaces/";
export const SEARCH_ENDPOINT = "search/?searchTerm=";
export const ADDRELATED_ENDPOINT = "addconcept";
export const HIDE_ENDPOINT = "hideconcept";
