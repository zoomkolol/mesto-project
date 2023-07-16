const cardTemplate = document.querySelector('#card-template').content;

export function createCard(userId, card, handleCardClick, handleLikeClick, handleCardDelete) {
  if(card.name == undefined) {
    console.log('cardName is ' + card.name);
  }

  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardImgDesc = cardElement.querySelector('.card__description');
  const cardLikesCounter = cardElement.querySelector('.card__like-counter');
  const cardDelete = cardElement.querySelector('.card__delete');
  const cardLikeBtn = cardElement.querySelector('.card__like');

  cardImgDesc.textContent = card.name;
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', card.name);
  cardLikesCounter.textContent = card.likes.length;

  if(card.likes.find(like => like._id === userId)) {
    cardLikeBtn.classList.add('card__like_active');
  }

  cardLikeBtn.addEventListener('click', (evt) => {
    handleLikeClick(card._id, cardLikesCounter, evt);
  })

  if(userId !== card.owner._id) {
    cardDelete.remove();
  }
  else {
    cardDelete.addEventListener('click', function(evt) {
      handleCardDelete(card._id, evt);
    })
  }

  cardImage.addEventListener('click', () => handleCardClick(card.link, card.name));

  return cardElement;
}

export function updateLikes(likesAmount, cardLikesCounter, evt) {
  cardLikesCounter.textContent = likesAmount;
  evt.target.classList.toggle('card__like_active');
}

export function removeCard(evt) {
  evt.target.closest('.card').remove();
}
