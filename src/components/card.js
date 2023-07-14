const cardTemplate = document.querySelector('#card-template').content;

export function createCard(userId, cardOwner, cardName, cardLink, cardLikes, cardId, handleCardClick, handleLikeClick, handleCardDelete) {
  if(cardName == undefined) {
    console.log('cardName is ' + cardName);
  }

  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardImgDesc = cardElement.querySelector('.card__description');
  const cardLikesCounter = cardElement.querySelector('.card__like-counter');
  const cardDelete = cardElement.querySelector('.card__delete');
  const cardLikeBtn = cardElement.querySelector('.card__like');

  cardImgDesc.textContent = cardName;
  cardImage.setAttribute('src', cardLink);
  cardImage.setAttribute('alt', cardName);
  cardLikesCounter.textContent = cardLikes.length;

  if(cardLikes.find(like => like._id === userId)) {
    cardLikeBtn.classList.add('card__like_active');
  }

  cardLikeBtn.addEventListener('click', (evt) => {
    handleLikeClick(cardId, cardLikesCounter, evt);
  })


  if(userId !== cardOwner) {
    cardDelete.remove();
  }
  else {
    cardDelete.addEventListener('click', function(evt) {
      handleCardDelete(cardId, evt);
    })
  }

  cardImage.addEventListener('click', () => handleCardClick(cardLink, cardName));

  return cardElement;
}

export function updateLikes(likesAmount, cardLikesCounter, evt) {
  cardLikesCounter.textContent = likesAmount;
  evt.target.classList.toggle('card__like_active');
}

export function removeCard(evt) {
  evt.target.closest('.card').remove();
}
