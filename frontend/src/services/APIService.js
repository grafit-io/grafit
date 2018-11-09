import { AuthService } from "./AuthService";
import { API, ARTICLE_ENDPOINT, USER_ENDPOINT } from "../constants";

export const APIService = {
  callGetAPI,
  getArticles,
  getArticle,
  updateArticle,
  createArticle,
  deleteArticle,
  createUser
};

function callGetAPI(query) {
  return fetch(API + query, {
    headers: {
      Authorization: "Token " + AuthService.getJWT()
    }
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else if (response.status === 403) {
      throw new Error("Not authenticated or jwt invalid");
    } else {
      throw new Error("Something went wrong ...");
    }
  });
}

function callPostAPI(apiEndpoint, object) {
  return fetch(API + apiEndpoint, {
    headers: {
      Authorization: "Token " + AuthService.getJWT(),
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(object)
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Could not send post");
    }
  });
}

function callPutAPI(apiEndpoint, object) {
  return fetch(API + apiEndpoint, {
    headers: {
      Authorization: "Token " + AuthService.getJWT(),
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "PUT",
    body: JSON.stringify(object)
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      console.log(response);
      throw new Error("Could not send put");
    }
  });
}

function callDeleteAPI(apiEndpoint) {
  return fetch(API + apiEndpoint, {
    headers: {
      Authorization: "Token " + AuthService.getJWT()
    },
    method: "DELETE"
  }).then(response => {
    if (response.ok) {
      return true;
    } else {
      throw new Error("Could not delete item");
    }
  });
}

function getArticles() {
  return callGetAPI(ARTICLE_ENDPOINT).catch(error => console.log(error));
}

function getArticle(id) {
  return callGetAPI(ARTICLE_ENDPOINT + id).catch(error => console.log(error));
}

function updateArticle(id, title, text) {
  const article = {
    title: title,
    text: text
  };
  return callPutAPI(ARTICLE_ENDPOINT + id + "/", article);
}

function createArticle(title, text) {
  const article = {
    title: title,
    text: text
  };
  return callPostAPI(ARTICLE_ENDPOINT, article);
}

function deleteArticle(id) {
  return callDeleteAPI(ARTICLE_ENDPOINT + id);
}

function createUser(username, password, firstname, lastname, email) {
  const user = {
    username: username,
    password: password,
    first_name: firstname,
    last_name: lastname,
    email: email
  };

  return fetch(API + USER_ENDPOINT, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(user)
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Could not send post");
    }
  });
}
