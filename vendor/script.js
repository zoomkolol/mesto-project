const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileDesc = profile.querySelector('.profile__description');
const profileEditBtn = profile.querySelector('.profile__edit');
const profileAddBtn = profile.querySelector('.profile__add');

const cardsContainer = document.querySelector('.cards');
const card = cardsContainer.querySelector('.card');

const popup = document.querySelector('.popup');
const popupCloseBtn = popup.querySelector('.popup__close');
const popupImage = popup.querySelector('.popup__image');
const popupImgDesc = popup.querySelector('.popup__img-description');

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
    popupImage.style.display = 'none';
    popupImgDesc.style.display = 'none';
    popup.style.background = 'rgba(0, 0, 0, 0.5)';
    updateValues();
  }
  else if(button.target == profileAddBtn){
    profileForm.style.display = 'none';
    cardForm.style.display = 'flex';
    popupImage.style.display = 'none';
    popupImgDesc.style.display = 'none';
    popup.style.background = 'rgba(0, 0, 0, 0.5)';
  }
  else {
    profileForm.style.display = 'none';
    cardForm.style.display = 'none';
    popupImage.style.display = 'block';
    popupImgDesc.style.display = 'block';
    popupImage.setAttribute('src', button.target.getAttribute('src'));
    popupImgDesc.textContent = button.target.getAttribute('alt');
    popup.style.background = 'rgba(0, 0, 0, 0.9)';
  }
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  if(evt.target == profileForm) {
    profileName.textContent = nameInput.value;
    profileDesc.textContent = jobInput.value;
    updateValues();
  }
  else {
    addCard(placeInput.value, linkInput.value);
  }

  closePopup();
}

function addCard(cardName, cardLink) {
  const cardTemplate = document.querySelector('#card-template').content;
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

  cardImage.addEventListener('click', openPopup);

  cardsContainer.prepend(cardElement);
}

initialCards.forEach(function(card) {
  addCard(card.name, card.link);
});

profileEditBtn.addEventListener('click', openPopup);
profileAddBtn.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', closePopup);
profileForm.addEventListener('submit', formSubmitHandler);
cardForm.addEventListener('submit', formSubmitHandler);

