const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileDesc = profile.querySelector('.profile__description');
const profileEditBtn = profile.querySelector('.profile__edit');
const profileAddBtn = profile.querySelector('.profile__add');

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.cards');
const card = cardsContainer.querySelector('.card');

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

function updateValues() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function openPopupEditProfileBtn() {
  openPopup(popupEditProfile);
}

function openPopupEditCardBtn() {
  openPopup(popupEditCard);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function closePopupBtn(evt) {
  const popupToClose = evt.target.closest('.popup');
  closePopup(popupToClose);
}

function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  updateValues();
  closePopup(popupEditProfile);
}

function cardFormSubmitHandler(evt) {
  evt.preventDefault();
  addCard(placeInput.value, linkInput.value);
  cardForm.reset();
  closePopup(popupEditCard);
}

function addCard(cardName, cardLink) {
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

  cardsContainer.prepend(cardElement);
}

function handleCardClick(link, name) {
  openPopup(popupImageContainer);
  popupImage.setAttribute('src', link);
  popupImgDesc.textContent = name;
}

initialCards.forEach(function(card) {
  addCard(card.name, card.link);
});

updateValues();
profileEditBtn.addEventListener('click', openPopupEditProfileBtn);
profileAddBtn.addEventListener('click', openPopupEditCardBtn);
popupCloseBtn.forEach(btn => btn.addEventListener('click', closePopupBtn));
profileForm.addEventListener('submit', profileFormSubmitHandler);
cardForm.addEventListener('submit', cardFormSubmitHandler);

