const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileDesc = profile.querySelector('.profile__description');
const profileEditBtn = profile.querySelector('.profile__edit');
const profileAddBtn = profile.querySelector('.profile__add');

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.cards');
const card = cardsContainer.querySelector('.card');

const popup = document.querySelectorAll('.popup');
const popupOverlay = document.querySelectorAll('.popup__overlay');
const popupContainer = document.querySelectorAll('.popup__container');
const popupEditProfile = document.querySelector('.popup__edit-profile');
const popupEditCard = document.querySelector('.popup__edit-card');
const popupImageContainer = document.querySelector('.popup__image-container');
const popupCloseBtn = document.querySelectorAll('.popup__close');
const popupImage = document.querySelector('.popup__image');
const popupImgDesc = document.querySelector('.popup__img-description');

const profileForm = document.querySelector('form[name="edit-profile"]');
const nameInput = document.querySelector('input[name="name"]');
const jobInput = document.querySelector('input[name="status"]');

const cardForm = document.querySelector('form[name="edit-card"]');
const placeInput = document.querySelector('input[name="place"]');
const linkInput = document.querySelector('input[name="link"]');


const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
  inputElement.classList.add('popup__text_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__text_error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
  inputElement.classList.remove('popup__text_type_error');
  errorElement.classList.remove('popup__text_error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll('.popup__text'));
  const buttonElement = form.querySelector('.popup__submit');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(form, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
   formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
   });
   setEventListeners(formElement);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', '');
  }
  else {
    buttonElement.removeAttribute('disabled');
  }
};

enableValidation();


function updateValues() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function openPopupEditProfileBtn() {
  updateValues();
  openPopup(popupEditProfile);
}

function openPopupEditCardBtn() {
  openPopup(popupEditCard);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function closePopupBtn(evt) {
  closePopup(evt.closest('.popup'));
}

function handleClosePopupKey(evt) {
  if(evt.key === 'Escape') {
    closePopup(evt.target.closest('.popup'));
    console.log(true);
  }
}

function handleProfileFormSubmit(evt) {
  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function handleCardFormSubmit(evt) {
  renderCard(placeInput.value, linkInput.value);
  cardForm.reset();
  closePopup(popupEditCard);
}

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

function renderCard(cardName, cardLink) {
  const newCard = createCard(cardName, cardLink);
  cardsContainer.prepend(newCard);
}

initialCards.forEach(function(card) {
  renderCard(card.name, card.link);
});


profileEditBtn.addEventListener('click', openPopupEditProfileBtn);
profileAddBtn.addEventListener('click', openPopupEditCardBtn);
popup.forEach(popup => popup.addEventListener('click', function(evt) {
  if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup__overlay')) {
    closePopupBtn(evt.target);
  }
}));
popup.forEach(popup => popup.addEventListener('keydown', handleClosePopupKey));


profileForm.addEventListener('submit', handleProfileFormSubmit);

cardForm.addEventListener('submit', handleCardFormSubmit);

