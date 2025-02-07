import './index.css';

import { openModal, closeModal, closeModalOnOverlay} from './components/modal.js';
import { addCard, removeCard, handleLike } from './components/card.js';
import { initialCards } from './components/cards.js';

// Объявление переменных
const modalEdit = document.querySelector('.popup_type_edit');
const modalNewCard = document.querySelector('.popup_type_new-card');
const modals = document.querySelectorAll('.popup');

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonNewCard = document.querySelector('.profile__add-button');
const buttonsClosePopup = document.querySelectorAll('.popup__close');

const previewModal = document.querySelector('.popup_type_image');
const previewModalImage = previewModal.querySelector('.popup__image');
const previewModalCaption = previewModal.querySelector('.popup__caption');

function openPreview(name, link) {
  previewModalImage.src = link;
  previewModalImage.alt = name;
  previewModalCaption.textContent = name;
  openModal(previewModal);
}

buttonEdit.addEventListener("click", function () {
  openModal(modalEdit);
});

buttonNewCard.addEventListener("click", function () {
  openModal(modalNewCard);
});

buttonsClosePopup.forEach(button => {
  button.addEventListener("click", function (evt) {
    const modal = evt.target.closest('.popup');
    closeModal(modal);
  });
});

modals.forEach(modal => {
  modal.addEventListener("click", function (evt) {
    closeModalOnOverlay(evt);
  });
});

// Находим форму в DOM
const formEditProfile = document.forms["edit-profile"];
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function submitEditProfileForm(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(modalEdit);
}

formEditProfile.addEventListener('submit', submitEditProfileForm);

// Находим форму в DOM
const formNewPlace = document.forms["new-place"];
// Находим поля формы в DOM
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const imageUrlInput = document.querySelector('.popup__input_type_url');

const cardList = document.querySelector('.places__list');

function createCard(evt){
  evt.preventDefault();
  const newCard = addCard(
    {
      name: cardNameInput.value,
      link: imageUrlInput.value
    },
    removeCard,
    handleLike,
    openPreview
  );
  cardList.prepend(newCard);
  evt.target.reset();
  closeModal(modalNewCard);
}

formNewPlace.addEventListener('submit', createCard);

// @todo: Вывести карточки на страницу
const placesList = document.querySelector('.places__list');

initialCards.forEach(card => {
  const cardElement = addCard(card, removeCard, handleLike, openPreview);
  placesList.append(cardElement);
});
