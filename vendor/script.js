let editButton = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');

function openPopup() {
  popup.classList.add('popup_opened');
}

editButton.addEventListener('click', openPopup);
