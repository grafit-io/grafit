import { AuthService } from "./AuthService"
import { API } from "../constants"

export const APIService = {
    getArticles,
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
        .then(data => { return data })
        .catch(error => console.log(error))
}
