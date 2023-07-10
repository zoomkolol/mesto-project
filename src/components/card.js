import {openPopup} from './modal.js';


const popupImage = document.querySelector('.popup__image');
const popupImgDesc = document.querySelector('.popup__img-description');
const popupImageContainer = document.querySelector('.popup__image-container');

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.cards');

function createCard(cardName, cardLink) {
  if(cardName == undefined) {
    console.log('cardName is ' + cardName);
  }

  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardImgDesc = cardElement.querySelector('.card__description');

  cardImgDesc.textContent = cardName;
  cardImage.setAttribute('src', cardLink);
  cardImage.setAttribute('alt', cardName);

  cardElement.querySelector('.card__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__like_active');
  })

  const deleteBtn = cardElement.querySelector('.card__delete');

  deleteBtn.addEventListener('click', function(evt) {
    const cardToRemove = deleteBtn.closest('.card');
    cardToRemove.remove();
  })

  cardImage.addEventListener('click', () => handleCardClick(cardLink, cardName));

  return cardElement;
}

function handleCardClick(link, name) {
  openPopup(popupImageContainer);
  popupImage.setAttribute('src', link);
  popupImage.setAttribute('alt', name);
  popupImgDesc.textContent = name;
}

export function renderCard(cardName, cardLink) {
  const newCard = createCard(cardName, cardLink);
  cardsContainer.prepend(newCard);
}
