import {likesCard, removeLikesCard, deleteCard} from "./api.js";

const cardTemplate = document.querySelector('#card-template').content;

function getCardTemplate() {
  return cardTemplate.querySelector('.card').cloneNode(true);
}

export function createCard (card, removeCard, handleLike, openPreview, userId) {
  const cardNode = getCardTemplate();

  const cardImage = cardNode.querySelector('.card__image');
  const cardTitle = cardNode.querySelector('.card__title');
  const deleteButton = cardNode.querySelector('.card__delete-button');
  const likeButton = cardNode.querySelector('.card__like-button');
  const likeCounter = cardNode.querySelector('.card__like-counter');

  const likesValue = card.likes;
  const cardOwnerId = card.owner._id;
  const cardId = card._id;

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  likeCounter.textContent = Array.isArray(likesValue) ? likesValue.length : 0;

// Проверка владельца карточки: если пользователь — автор, показываем кнопку удаления
  if (cardOwnerId === userId) {
    deleteButton.addEventListener("click", () => removeCard(cardNode, cardId));
  } else {
    deleteButton.style.display = "none";
  }

// Проверка, лайкнул ли пользователь карточку
  if (likesValue.some(like => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener("click", () => handleLike(likeButton, cardId, likeCounter));

  cardImage.addEventListener("click", function () {
    openPreview(card.name, card.link);
  });

  return cardNode;
}

// Функция удаления карточки
export function removeCard(cardNode, cardId) {
  deleteCard(cardId)
    .then(() => {
      cardNode.remove();
    })
    .catch(err => console.log(`Ошибка удаления карточки: ${err}`));
}

// Функция добавления лайка
export function handleLike(cardElement, cardId, cardLikesCounter) {
  const isLiked = cardElement.classList.contains('card__like-button_is-active');
  
  if (isLiked) {
    removeLikesCard(cardId)
      .then((data) => {
        cardElement.classList.remove('card__like-button_is-active');
        cardLikesCounter.textContent = data.likes.length;
      })
      .catch(err => console.log(`Ошибка удаления лайка: ${err}`));
  } else {
    likesCard(cardId)
      .then((data) => {
        cardElement.classList.add('card__like-button_is-active');
        cardLikesCounter.textContent = data.likes.length;
      })
      .catch(err => console.log(`Ошибка добавления лайка: ${err}`));
  }
}