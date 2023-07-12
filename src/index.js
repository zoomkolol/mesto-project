import './styles/index.css';
import {enableValidation} from './components/validate.js';
import {openPopupEditProfileBtn, openPopupEditCardBtn, openPopupAddAvatar, closePopupBtn, handleProfileFormSubmit, handleAvatarFormSubmit, handleCardFormSubmit} from './components/modal.js';
import {getCards, getMyProfile} from './components/api.js';

export const profile = document.querySelector('.profile');
const profileEditBtn = profile.querySelector('.profile__edit');
const profileAddBtn = profile.querySelector('.profile__add');
const profileAddAvatar = profile.querySelector('.profile__avatar-container');

const popups = document.querySelectorAll('.popup');

const profileForm = document.forms["edit-profile"];
export const cardForm = document.forms["edit-card"];
const avatarForm = document.forms["edit-avatar"];

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text_error_active'
});

profileEditBtn.addEventListener('click', openPopupEditProfileBtn);
profileAddBtn.addEventListener('click', openPopupEditCardBtn);
profileAddAvatar.addEventListener('click', openPopupAddAvatar);

popups.forEach(popup => popup.addEventListener('click', function(evt) {
  if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup__overlay')) {
    closePopupBtn(evt.target);
  }
}));

profileForm.addEventListener('submit', handleProfileFormSubmit);
avatarForm.addEventListener('submit', handleAvatarFormSubmit);
cardForm.addEventListener('submit', handleCardFormSubmit);

getMyProfile();
getCards();
