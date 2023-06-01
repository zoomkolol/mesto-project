let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileDesc = profile.querySelector('.profile__description');
let profileEditBtn = profile.querySelector('.profile__edit');
let profileAddBtn = profile.querySelector('profile__add');

let cardsContainer = document.querySelector('.cards');
let card = cardsContainer.querySelector('.card');

let popup = document.querySelector('.popup');
let popupCloseBtn = popup.querySelector('.popup__close');
const formElement = popup.querySelector('.popup__form');

const profileForm = document.querySelector('form[name="edit-profile"]');
const nameInput = popup.querySelector('input[name="name"]');
const jobInput = popup.querySelector('input[name="status"]');

const cardForm = document.querySelector('form[name="edit-card"]');
const placeInput = popup.querySelector('input[name="place"]');
const linkInput = popup.querySelector('input[name="link"]');

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
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
}

function openPopup(button) {
  popup.classList.add('popup_opened');
  if(button.target == profileEditBtn) {
    profileForm.style.display = 'flex';
    cardForm.style.display = 'none';
    updateValues();
  }
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

for (let i = 0; i < initialCards.length; i++) {
  addCard(initialCards[i].name, initialCards[i].link);
}

profileEditBtn.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
