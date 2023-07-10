import { data } from 'autoprefixer';
import {profileName, profileDesc, profileAvatar} from './modal';
import {renderCard} from "./card";

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
      renderCard(card.name, card.link);
      console.log(true)
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
    profileName.textContent = data.name;
    profileDesc.textContent = data.about;
    profileAvatar.src = data.avatar;
  })
  .catch(err => console.log(err));
}
