const cardTemplate = document.querySelector('#card-template').content;

export function createCard(cardName, cardLink, cardLikes, myCard, cardId, isLiked, handleCardClick, handleLikeClick, deleteCard, removeLike, likeCard) {
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
  cardLikesCounter.textContent = cardLikes;

  if(isLiked) {
    cardLikeBtn.classList.add('card__like_active');
    /*cardLikeBtn.addEventListener('click', function(evt) {
      removeLike(cardId, cardLikesCounter, evt);
    })*/
  }
  /*else {
    cardLikeBtn.addEventListener('click', function(evt) {
      likeCard(cardId, cardLikesCounter, evt);
    })
  }*/

  cardLikeBtn.addEventListener('click', (evt) => {
    handleLikeClick(cardId, cardLikesCounter, evt);
  })


  if(!myCard) {
    cardDelete.remove();
  }
  else {
    cardDelete.addEventListener('click', function(evt) {
      deleteCard(cardId, evt);
    })
  }

  cardImage.addEventListener('click', () => handleCardClick(cardLink, cardName));

  return cardElement;
}
