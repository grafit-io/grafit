import {AuthService} from "./AuthService"
import {API} from "../constants"

export const APIService = {
    getArticles,
    getArticle,
};

const DEFAULT_QUERY = "articles/"

function getArticles() {
    return fetch(API + DEFAULT_QUERY, {
        headers: {
            'Authorization': 'Token ' + AuthService.getJWT()
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong ...');
            }
        })
        .then(data => {
            return data
        })
        .catch(error => {
            // TODO handle 403 => not logged in
            console.log(error)
        })
}

function getArticle(id) {
    return fetch(API + DEFAULT_QUERY + id, {
        headers: {
            'Authorization': 'Token ' + AuthService.getJWT()
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong ...');
            }
        })
        .then(data => {
            return data
        })
        .catch(error => console.log(error))
}