// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы

// @todo: Функция создания карточки
function addCard (card) {
  const cardNode = cardTemplate.querySelector('.card').cloneNode(true);

  const image = cardNode.querySelector('.card__image');
  const title = cardNode.querySelector('.card__title');
  const deleteButton = cardNode.querySelector('.card__delete-button');

  image.src = card.link;
  image.alt = card.name;
  title.textContent = card.name;

  deleteButton.addEventListener("click", () => removeCard(cardNode));

  return cardNode;
}

// @todo: Функция удаления карточки
function removeCard(cardNode) {
  cardNode.remove();
}

// @todo: Вывести карточки на страницу
const placesList = document.querySelector('.places__list');

initialCards.forEach(card => {
  const cardElement = addCard(card);
  placesList.append(cardElement);
});
