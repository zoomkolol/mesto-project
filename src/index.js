import './styles/index.css';
import {enableValidation} from './components/validate.js';
import {popupEditProfile, popupEditCard, popupAddAvatar, openPopup, closePopup} from './components/modal.js';
import {getProfileAndCards, getCards, changeName, changeAvatar, addCard, deleteCard, likeCard, removeLike} from './components/api.js';
import {createCard, updateLikes, removeCard} from './components/card.js';

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

function initialCards() {
  getProfileAndCards()
  .then((data) => {
    updateProfileValues(data.name, data.about);
    profileAvatar.src = data.avatar;
    const userId = data._id;
    getCards()
    .then((data) => {
      data.forEach(card => {
        renderCard(userId, card.owner._id, card.name, card.link, card.likes, card._id, true);
      });
    })
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
}

function isLoading(button, isLoading) {
  if(isLoading) {
    button.textContent = 'Сохранение...';
  }
  else {
    button.textContent = 'Сохранить';
  }
}

export function updateProfileValues(name, about) {
  profileName.textContent = name;
  profileDesc.textContent = about;
}

export function handleProfileFormSubmit() {
  isLoading(profileSubmit, true);
  changeName(nameInput.value, aboutInput.value)
  .then((data) => {
    updateProfileValues(data.name, data.about);
    closePopup(popupEditProfile);
  })
  .catch(err => console.log(err))
  .finally(() => {
    isLoading(profileSubmit, false);
  });

}

export function handleAvatarFormSubmit() {
  isLoading(avatarSubmit, true);
  changeAvatar(avatarInput.value)
  .then((data) => {
    profileAvatar.src = data.avatar;
    closePopup(popupAddAvatar);
    avatarForm.reset();
  })
  .catch(err => console.log(err))
  .finally(() => {
    isLoading(avatarSubmit, false);
  });
}

export function handleCardFormSubmit() {
  isLoading(cardSubmit, true);
  addCard(placeInput.value, linkInput.value)
  .then((data) => {
    renderCard(data.owner._id, data.owner._id, data.name, data.link, data.likes, data._id, false);
    closePopup(popupEditCard);
    cardForm.reset();
  })
  .catch(err => console.log(err))
  .finally(() => {
    isLoading(cardSubmit, false);
  });
}

export function handleCardClick(link, name) {
  openPopup(popupImageContainer);
  popupImage.setAttribute('src', link);
  popupImage.setAttribute('alt', name);
  popupImgDesc.textContent = name;
}

export function handleCardDelete(cardId, evt) {
  deleteCard(cardId)
  .then(removeCard(evt))
  .catch(err => console.log(err));
}

function handleLikeClick(cardId, cardLikesCounter, evt) {
  if(evt.target.classList.contains('card__like_active')) {
    removeLike(cardId)
    .then(data => updateLikes(data.likes.length, cardLikesCounter, evt))
    .catch(err => console.log(err));
  }
  else {
    likeCard(cardId)
    .then(data => updateLikes(data.likes.length, cardLikesCounter, evt))
    .catch(err => console.log(err));
  }
}

export function renderCard(userId, cardOwner, cardName, cardLink, cardLikes, cardId, append) {
  const newCard = createCard(userId, cardOwner, cardName, cardLink, cardLikes, cardId, handleCardClick, handleLikeClick, handleCardDelete);
  if(append) {
    cardsContainer.append(newCard);
  }
  else {
    cardsContainer.prepend(newCard);
  }
}

export function openPopupEditProfileBtn() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileDesc.textContent;
  openPopup(popupEditProfile);
}

export function openPopupEditCardBtn() {
  openPopup(popupEditCard);
}

export function openPopupAddAvatar() {
  openPopup(popupAddAvatar);
}


initialCards();

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

profileForm.addEventListener('submit', handleProfileFormSubmit);
avatarForm.addEventListener('submit', handleAvatarFormSubmit);
cardForm.addEventListener('submit', handleCardFormSubmit);
