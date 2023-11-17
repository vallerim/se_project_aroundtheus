export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _responseHandle(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._responseHandle);
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.url,
      }),
    }).then(this._responseHandle);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._responseHandle);
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._responseHandle);
  }

  newUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    }).then(this._responseHandle);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    }).then(this._responseHandle);
  }

  addLikeToCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: "PUT",
    }).then(this._responseHandle);
  }

  removeLikeFromCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: "DELETE",
    }).then(this._responseHandle);
  }
}
