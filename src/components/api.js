import { data } from 'autoprefixer';
import {updateProfileValues, updateAvatar, profileAvatar} from './modal';
import {renderCard} from "./card";

let myID;

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
  headers: {
    authorization: '2c7dd9fd-d8e0-4401-88fd-d84a69cc2a4c',
    'Content-Type': 'application/json'
  }
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
  .then((data) => {
    data.forEach(card => {
      const like = card.likes.find(like => like._id === myID);
      let isLiked = false;
      if(like) {
        isLiked = true;
      }

      if(myID === card.owner._id) {
        renderCard(card.name, card.link, card.likes.length, true, card._id, isLiked);
      }
      else {
        renderCard(card.name, card.link, card.likes.length, false, card._id, isLiked);
      }
    });
  })
  .catch(err => console.log(err));
}

export function getMyProfile() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-26/users/me', {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((data) => {
    updateProfileValues(data.name, data.about);
    profileAvatar.src = data.avatar;
    myID = data._id;
  })
  .catch(err => console.log(err));
}

function renderLoadingText(button, isLoading) {
  if(isLoading) {
    button.textContent = 'Сохранение...';
  }
  else {
    button.textContent = 'Сохранить';
  }
}

export function changeName(name, about, button) {
  renderLoadingText(button, true);
  return fetch('https://nomoreparties.co/v1/plus-cohort-26/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(res => res.json())
  .then((data) => {
    updateProfileValues(data.name, data.about);
  })
  .catch(err => console.log(err))
  .finally(() => {
    renderLoadingText(button, false);
  });
}

export function changeAvatar(url, button) {
  renderLoadingText(button, true);
  return fetch('https://nomoreparties.co/v1/plus-cohort-26/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url
    })
  })
  .then(res => res.json())
  .then(data => updateAvatar(data.avatar))
  .catch(err => console.log(err))
  .finally(() => {
    renderLoadingText(button, false);
  });
}

export function addCard(name, link, button) {
  renderLoadingText(button, true);
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
  .then((data) => {
    renderCard(data.name, data.link, data.likes.length, true, data._id, false);
  })
  .catch(err => console.log(err))
  .finally(() => {
    renderLoadingText(button, false);
  });
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
  .catch(err => console.log(err));
}

export function likeCard(id, cardLikesCounter) {
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
  .then(data => cardLikesCounter.textContent = data.likes.length)
  .catch(err => console.log(err));
}

export function removeLike(id, cardLikesCounter) {
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
  .then(data => cardLikesCounter.textContent = data.likes.length)
  .catch(err => console.log(err));
}
