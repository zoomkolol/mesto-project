import {renderCard} from './card.js';
import {cardForm} from '../index.js';
import {changeName, changeAvatar, addCard} from './api.js';

const popupEditProfile = document.querySelector('.popup__edit-profile');
const popupEditCard = document.querySelector('.popup__edit-card');
const popupAddAvatar = document.querySelector('.popup__edit-avatar');

export const profileName = document.querySelector('.profile__name');
export const profileDesc = document.querySelector('.profile__description');
export const profileAvatar = document.querySelector('.profile__avatar');

const profileSubmit = document.querySelector('#popup__submit-edit-profile_btn');
const cardSubmit = document.querySelector('#popup__submit-edit-card_btn');
const avatarSubmit = document.querySelector('#popup__submit-edit-avatar_btn');


const nameInput = document.querySelector('input[name="name"]');
const jobInput = document.querySelector('input[name="status"]');
const avatarInput = document.querySelector('input[name="avatar"]');

const placeInput = document.querySelector('input[name="place"]');
const linkInput = document.querySelector('input[name="link"]');



export function updateProfileValues(name, about) {
  profileName.textContent = name;
  profileDesc.textContent = about;
}

export function updateAvatar(avatar) {
  profileAvatar.src = avatar;
}

export function openPopup(popup) {
  document.addEventListener('keydown', handleEscapeKey);
  popup.classList.add('popup_opened');
}

export function openPopupEditProfileBtn() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
  openPopup(popupEditProfile);
}

export function openPopupEditCardBtn() {
  openPopup(popupEditCard);
}

export function openPopupAddAvatar() {
  openPopup(popupAddAvatar);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscapeKey);
}

export function closePopupBtn(evt) {
  closePopup(evt.closest('.popup'));
}

function handleEscapeKey(evt) {
  if(evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

export function handleProfileFormSubmit() {
  changeName(nameInput.value, jobInput.value, profileSubmit);
  closePopup(popupEditProfile);
}

export function handleAvatarFormSubmit() {
  changeAvatar(avatarInput.value, avatarSubmit);
  closePopup(popupAddAvatar);
}

export function handleCardFormSubmit() {
  addCard(placeInput.value, linkInput.value, cardSubmit);
  cardForm.reset();
  closePopup(popupEditCard);
}
