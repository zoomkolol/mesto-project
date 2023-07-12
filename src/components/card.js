import {openPopup} from './modal.js';
import {deleteCard, likeCard, removeLike} from './api.js';


const popupImage = document.querySelector('.popup__image');
const popupImgDesc = document.querySelector('.popup__img-description');
const popupImageContainer = document.querySelector('.popup__image-container');

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.cards');

let likesCount;

function createCard(cardName, cardLink, cardLikes, myCard, cardId, isLiked) {
  if(cardName == undefined) {
    console.log('cardName is ' + cardName);
  }

  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardImgDesc = cardElement.querySelector('.card__description');
  const cardLikesCounter = cardElement.querySelector('.card__like-counter');
  const cardDelete = cardElement.querySelector('.card__delete');
  const cardLikeBtn = cardElement.querySelector('.card__like');

  cardImgDesc.textContent = cardName;
  cardImage.setAttribute('src', cardLink);
  cardImage.setAttribute('alt', cardName);
  cardLikesCounter.textContent = cardLikes;

  if(isLiked) {
    cardLikeBtn.classList.add('card__like_active');
  }

  cardLikeBtn.addEventListener('click', function(evt) {
    handleLikeClick(evt, cardId, cardLikesCounter);
  })

  if(!myCard) {
    cardDelete.remove();
  }
  else {
    cardDelete.addEventListener('click', function(evt) {
      deleteCard(cardId);
      const cardToRemove = cardDelete.closest('.card');
      cardToRemove.remove();
    })
  }

  cardImage.addEventListener('click', () => handleCardClick(cardLink, cardName));

  return cardElement;
}

function handleLikeClick(evt, cardId, cardLikesCounter) {
  if(evt.target.classList.contains('card__like_active')) {
    evt.target.classList.toggle('card__like_active');
    removeLike(cardId, cardLikesCounter);
  }
  else {
    evt.target.classList.toggle('card__like_active');
    likeCard(cardId, cardLikesCounter);
  }
}

function handleCardClick(link, name) {
  openPopup(popupImageContainer);
  popupImage.setAttribute('src', link);
  popupImage.setAttribute('alt', name);
  popupImgDesc.textContent = name;
}

export function renderCard(cardName, cardLink, cardLikes, myCard, cardId, isLiked) {
  const newCard = createCard(cardName, cardLink, cardLikes, myCard, cardId, isLiked);
  cardsContainer.append(newCard);
}
