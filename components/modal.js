import {renderCard} from './card.js';
import {cardForm} from './index.js';

const popupEditProfile = document.querySelector('.popup__edit-profile');
const popupEditCard = document.querySelector('.popup__edit-card');

const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');

const nameInput = document.querySelector('input[name="name"]');
const jobInput = document.querySelector('input[name="status"]');

const placeInput = document.querySelector('input[name="place"]');
const linkInput = document.querySelector('input[name="link"]');



function updateValues() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
}

export function openPopupEditProfileBtn() {
  updateValues();
  openPopup(popupEditProfile);
}

export function openPopupEditCardBtn() {
  openPopup(popupEditCard);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

export function closePopupBtn(evt) {
  closePopup(evt.closest('.popup'));
}

export function handleClosePopupKey(evt) {
  if(evt.key === 'Escape') {
    closePopup(evt.target.closest('.popup'));
    console.log(true);
  }
}

export function handleProfileFormSubmit() {
  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

export function handleCardFormSubmit() {
  renderCard(placeInput.value, linkInput.value);
  cardForm.reset();
  closePopup(popupEditCard);
}
