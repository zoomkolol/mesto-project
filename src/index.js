import './styles/index.css';
import {enableValidation} from './components/validate.js';
import {openPopupEditProfileBtn, openPopupEditCardBtn, closePopupBtn, handleClosePopupKey, handleProfileFormSubmit, handleCardFormSubmit} from './components/modal.js';
import {initialCards, renderCard} from './components/card.js';

export const profile = document.querySelector('.profile');
const profileEditBtn = profile.querySelector('.profile__edit');
const profileAddBtn = profile.querySelector('.profile__add');

const popup = document.querySelectorAll('.popup');

const profileForm = document.querySelector('form[name="edit-profile"]');
export const cardForm = document.querySelector('form[name="edit-card"]');

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text_error_active'
});

profileEditBtn.addEventListener('click', openPopupEditProfileBtn);
profileAddBtn.addEventListener('click', openPopupEditCardBtn);

popup.forEach(popup => popup.addEventListener('click', function(evt) {
  if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup__overlay')) {
    closePopupBtn(evt.target);
  }
}));

profileForm.addEventListener('submit', handleProfileFormSubmit);

cardForm.addEventListener('submit', handleCardFormSubmit);

initialCards.forEach(function(card) {
  renderCard(card.name, card.link);
});

