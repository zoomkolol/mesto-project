const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
  headers: {
    authorization: '2c7dd9fd-d8e0-4401-88fd-d84a69cc2a4c',
    'Content-Type': 'application/json'
  }
}

export function getProfileAndCards() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-26/users/me', {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export function getCards() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-26/cards', {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export function changeName(name, about) {
  return fetch('https://nomoreparties.co/v1/plus-cohort-26/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export function changeAvatar(url) {
  return fetch('https://nomoreparties.co/v1/plus-cohort-26/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export function addCard(name, link) {
  return fetch('https://nomoreparties.co/v1/plus-cohort-26/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export function deleteCard(id) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-26/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export function likeCard(id) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-26/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export function removeLike(id) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-26/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  return Promise.reject(`Ошибка: ${res.status}`);
  })
}

