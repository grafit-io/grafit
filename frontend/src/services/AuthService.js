import { AUTH_API, JWT_LOCALSTOR_KEY } from "../constants";
import { APIService } from "./APIService";

export const AuthService = {
  login,
  logout,
  getJWT,
  isLoggedIn
};

function login(username, password) {
  return fetch(AUTH_API, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({ username: username, password: password })
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Wrong credentials");
      }
    })
    .catch(reason => {
      throw reason;
    })
    .then(data => {
      let token = data["token"];
      console.log("Recieved JWT: " + token);
      localStorage.setItem(JWT_LOCALSTOR_KEY, token);
    })
    .catch(reason => {
      throw reason;
    });
}

function isJWTValid(jwt) {
  return APIService.callGetAPI("")
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

function logout() {
  // remove jwt from local storage to log user out
  localStorage.removeItem(JWT_LOCALSTOR_KEY);
}

function getJWT() {
  return localStorage.getItem(JWT_LOCALSTOR_KEY);
}

function isLoggedIn() {
  if (getJWT() !== null) {
    return isJWTValid(getJWT());
  }
  return Promise.resolve(false);
}
