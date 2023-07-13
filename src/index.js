import './styles/index.css';
import {enableValidation} from './components/validate.js';
import {popupEditProfile, popupEditCard, popupAddAvatar, openPopupEditProfileBtn, openPopupEditCardBtn, openPopupAddAvatar, openPopup, closePopup} from './components/modal.js';
import {getProfileAndCards, changeName, changeAvatar, addCard, deleteCard, likeCard, removeLike} from './components/api.js';
import {createCard} from './components/card.js';

//#region Объявление констант
const profile = document.querySelector('.profile');
const profileEditBtn = profile.querySelector('.profile__edit');
const profileAddBtn = profile.querySelector('.profile__add');
const profileAddAvatar = profile.querySelector('.profile__avatar-container');

const popupImage = document.querySelector('.popup__image');
const popupImgDesc = document.querySelector('.popup__img-description');
const popupImageContainer = document.querySelector('.popup__image-container');

const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__avatar');

const profileSubmit = document.querySelector('#popup__submit-edit-profile_btn');
const cardSubmit = document.querySelector('#popup__submit-edit-card_btn');
const avatarSubmit = document.querySelector('#popup__submit-edit-avatar_btn');

const profileForm = document.forms["edit-profile"];
const cardForm = document.forms["edit-card"];
const avatarForm = document.forms["edit-avatar"];

const nameInput = document.querySelector('input[name="name"]');
const aboutInput = document.querySelector('input[name="status"]');
const avatarInput = document.querySelector('input[name="avatar"]');

const placeInput = document.querySelector('input[name="place"]');
const linkInput = document.querySelector('input[name="link"]');

const cardsContainer = document.querySelector('.cards');
//#endregion

export function updateProfileValues(name, about) {
  profileName.textContent = name;
  profileDesc.textContent = about;
}

export function updateAvatar(avatar) {
  profileAvatar.src = avatar;
}

export function handleProfileFormSubmit() {
  changeName(nameInput.value, aboutInput.value, profileSubmit);
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

export function handleCardClick(link, name) {
  openPopup(popupImageContainer);
  popupImage.setAttribute('src', link);
  popupImage.setAttribute('alt', name);
  popupImgDesc.textContent = name;
}

function handleLikeClick(cardId, cardLikesCounter, evt) {
  if(evt.target.classList.contains('card__like_active')) {
    removeLike(cardId, cardLikesCounter, evt);
  }
  else {
    likeCard(cardId, cardLikesCounter, evt);
  }
}

export function updateLikes(likesAmount, cardLikesCounter, likeButton) {
  cardLikesCounter.textContent = likesAmount;
  likeButton.target.classList.toggle('card__like_active');
}

export function removeCardFromDOM(card) {
  card.target.closest('.card').remove();
}


export function renderCard(cardName, cardLink, cardLikes, myCard, cardId, isLiked, append) {
  const newCard = createCard(cardName, cardLink, cardLikes, myCard, cardId, isLiked, handleCardClick, handleLikeClick, deleteCard, removeLike, likeCard);
  if(append) {
    cardsContainer.append(newCard);
  }
  else {
    cardsContainer.prepend(newCard);
  }
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text_error_active'
});

profileEditBtn.addEventListener('click', () => openPopupEditProfileBtn(nameInput, aboutInput, profileName, profileDesc));
profileAddBtn.addEventListener('click', openPopupEditCardBtn);
profileAddAvatar.addEventListener('click', openPopupAddAvatar);

profileForm.addEventListener('submit', handleProfileFormSubmit);
avatarForm.addEventListener('submit', handleAvatarFormSubmit);
cardForm.addEventListener('submit', handleCardFormSubmit);

getProfileAndCards();
