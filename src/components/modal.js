const popups = document.querySelectorAll('.popup');
export const popupEditProfile = document.querySelector('.popup__edit-profile');
export const popupEditCard = document.querySelector('.popup__edit-card');
export const popupAddAvatar = document.querySelector('.popup__edit-avatar');

export function openPopup(popup) {
  document.addEventListener('keydown', handleEscapeKey);
  popup.classList.add('popup_opened');
}

export function openPopupEditProfileBtn(nameInput, aboutInput, profileName, profileDesc) {
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

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscapeKey);
}

function closePopupBtn(evt) {
  closePopup(evt.closest('.popup'));
}

function handleEscapeKey(evt) {
  if(evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

popups.forEach(popup => popup.addEventListener('click', function(evt) {
  if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup__overlay')) {
    closePopupBtn(evt.target);
  }
}));
