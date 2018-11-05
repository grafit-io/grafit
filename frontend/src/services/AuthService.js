import { AUTH_API } from "../constants"

export const AuthService = {
    login,
    logout,
    getJWT,
    isLoggedIn,
};

function login(username, password) {
    return fetch(AUTH_API,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ username: username, password: password })
        })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Wrong credentials')
            }
        })
        .catch(reason => { throw reason })
        .then(data => {
            let token = data['token']
            console.log("Recieved JWT: " + token)
            localStorage.setItem('jwt', token)
        })
        .catch(reason => { throw reason })

}

function logout() {
    // remove jwt from local storage to log user out
    localStorage.removeItem('jwt');
}

function getJWT() {
    return localStorage.getItem('jwt')
}

function isLoggedIn() {
    return localStorage.getItem('jwt') !== null
}