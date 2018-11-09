import { AuthService } from "./AuthService"
import { API, ARTICLE_ENDPOINT } from "../constants"


export const APIService = {
    callGetAPI,
    getArticles,
    getArticle,
    updateArticle,
};

function callGetAPI(query) {
    return fetch(API + query, {
        headers: {
            'Authorization': 'Token ' + AuthService.getJWT()
        }
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else if (response.status === 403) {
            throw new Error('Not authenticated or jwt invalid')
        } else {
            throw new Error('Something went wrong ...');
        }
    })
}

// eslint-disable-next-line
function callPostAPI(apiEndpoint, object) {
    return fetch(API + apiEndpoint,
        {
            headers: {
                'Authorization': 'Token ' + AuthService.getJWT(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(object)
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Could not send post')
            }
        })
}

function callPutAPI(apiEndpoint, object) {
    return fetch(API + apiEndpoint,
        {
            headers: {
                'Authorization': 'Token ' + AuthService.getJWT(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(object)
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                console.log(response)
                throw new Error('Could not send put')
            }
        })
}


function getArticles() {
    return callGetAPI(ARTICLE_ENDPOINT)
        .catch(error => console.log(error))
}

function getArticle(id) {
    return callGetAPI(ARTICLE_ENDPOINT + id)
        .catch(error => console.log(error))
}

function updateArticle(id, title, text) {
    let object = {
        title: title,
        text: text
    }
    return callPutAPI(ARTICLE_ENDPOINT + id + "/", object)
}
