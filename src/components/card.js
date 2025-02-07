const cardTemplate = document.querySelector('#card-template').content;

function getCardTemplate() {
  return cardTemplate.querySelector('.card').cloneNode(true);
}

export function addCard (card, removeCard, handleLike, openPreview) {
  const cardNode = getCardTemplate();

  const cardImage = cardNode.querySelector('.card__image');
  const cardTitle = cardNode.querySelector('.card__title');
  const deleteButton = cardNode.querySelector('.card__delete-button');
  const likeButton = cardNode.querySelector('.card__like-button');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  deleteButton.addEventListener("click", () => removeCard(cardNode));
  likeButton.addEventListener("click", handleLike);

  cardImage.addEventListener("click", function () {
    openPreview(card.name, card.link);
  });

  return cardNode;
}

// @todo: Функция удаления карточки
export function removeCard(cardNode) {
  cardNode.remove();
}

// @todo: Функция добавления лайка
export function handleLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}