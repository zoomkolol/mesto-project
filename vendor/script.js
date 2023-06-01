let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileDesc = profile.querySelector('.profile__description');
let profileEditBtn = profile.querySelector('.profile__edit');

let cardsContainer = document.querySelector('.cards');
let card = cardsContainer.querySelector('.card');

let popup = document.querySelector('.popup');
let popupCloseBtn = popup.querySelector('.popup__close');
const formElement = popup.querySelector('.popup__form');
const nameInput = popup.querySelector('#popup__text_name');
const jobInput = popup.querySelector('#popup__text_status');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function updateValues() {
  nameInput.setAttribute('value', profileName.textContent);
  jobInput.setAttribute('value', profileDesc.textContent);
}

function openPopup() {
  popup.classList.add('popup_opened');
  updateValues();
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  updateValues();
  closePopup();
}


function addCard(cardName, cardLink) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__description').textContent = cardName;
  cardElement.querySelector('.card__image').setAttribute('src', cardLink);

  cardElement.querySelector('.card__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle(card__like_active);
  })

  cardsContainer.append(cardElement);
}

profileEditBtn.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);

for (let i = 0; i < initialCards.length; i++) {
  addCard(initialCards[i].name, initialCards[i].link);
}
