let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileDesc = profile.querySelector('.profile__description');
let profileEditBtn = profile.querySelector('.profile__edit');

let card = document.querySelector('.card');
let cardLikeBtn = card.querySelectorAll('.card__like');

let popup = document.querySelector('.popup');
let popupCloseBtn = popup.querySelector('.popup__close');
const formElement = popup.querySelector('.popup__form');
const nameInput = popup.querySelector('#popup__text_name');
const jobInput = popup.querySelector('#popup__text_status');

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

function like() {
  cardLikeBtn.classList.add('card__like_active');
}

profileEditBtn.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
cardLikeBtn.addEventListener('click', like);
