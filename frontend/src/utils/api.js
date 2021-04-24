import {optionsApi} from "./constants.js";

class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers =  {
            "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
                "Content-Type": 'application/json',
                "Accept": 'application/json',
        };
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me `, {
            method: 'GET',
            headers: this._headers
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    editUserInfo(valuesFromInput) {
        return fetch(`${this._baseUrl}/users/me `, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: valuesFromInput.name,
                    about: valuesFromInput.about
                })
            }
        ).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    editUserAvatar(valuesFromInput) {
        return fetch(`${this._baseUrl}/users/me/avatar `, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: valuesFromInput.avatar
                })
            }
        ).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }).catch(err => console.log(err));
    }


    addCard(valuesFromInput) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(
                {
                    name: valuesFromInput.name,
                    link: valuesFromInput.link
                }
            )
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    deleteCard(cardID) {
        return fetch(`${this._baseUrl}/cards/${cardID}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }


    likeOn(cardID) {
        return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
            method: 'PUT',
            headers: this._headers
        }).then(res => {
            console.log(res);
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    likeOff(cardID) {
        return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
            method: 'DELETE',
            headers: this._headers
        }).then(res => {
            if (res.ok) {
                console.log(res);
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    changeLikeCardStatus(cardID,hasLike) {
        if (hasLike) {return this.likeOff(cardID)} else {return this.likeOn(cardID)}
    }
}

const api = new Api(optionsApi);

export default api;
