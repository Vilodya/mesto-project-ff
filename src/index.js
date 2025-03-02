import './index.css';

import { openModal, closeModal, closeModalOnOverlay} from './components/modal.js';
import { addCard, removeCard, handleLike } from './components/card.js';
import { clearValidation, enableValidation } from './components/validation.js';
import { getUserInfo, getInitialCards, editProfile, changeAvatar } from './components/api.js';

// Объявление переменных
const modalEdit = document.querySelector('.popup_type_edit');
const modalNewCard = document.querySelector('.popup_type_new-card');
const modalAvatar = document.querySelector('.popup_type_avatar');
const modals = document.querySelectorAll('.popup');

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonNewCard = document.querySelector('.profile__add-button');
const buttonsClosePopup = document.querySelectorAll('.popup__close');

const previewModal = document.querySelector('.popup_type_image');
const previewModalImage = previewModal.querySelector('.popup__image');
const previewModalCaption = previewModal.querySelector('.popup__caption');

const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Находим форму в DOM
const formEditProfile = document.forms["edit-profile"];
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

// Находим форму в DOM
const formNewPlace = document.forms["new-place"];
// Находим поля формы в DOM
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const imageUrlInput = document.querySelector('.popup__input_type_url');

// Находим форму в DOM
const formAvatar = document.forms['edit-avatar'];
const avatarInput = formAvatar.querySelector('.popup__input_type_avatar-link');

// @todo: Вывести карточки на страницу
const cardList = document.querySelector('.places__list');

// Validation Config
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Функции
function openPreview(name, link) {
  previewModalImage.src = link;
  previewModalImage.alt = name;
  previewModalCaption.textContent = name;
  openModal(previewModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  const name = nameInput.value;
  const about = jobInput.value;

  renderLoading(true, submitButton);
  editProfile(name, about)
      .then(data => {
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;
        closeModal(modalEdit);
      })
      .catch(err => console.log(err))
      .finally(() => {
        renderLoading(false, submitButton);
      })
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  const avatar = avatarInput.value;

  renderLoading(true, submitButton);
  changeAvatar(avatar)
      .then(data => {
        profileImage.style.backgroundImage = `url(${data.avatar})`;
        closeModal(modalAvatar);
      })
      .catch(err => console.log(err))
      .finally(() => {
        renderLoading(false, submitButton);
      })
}

function handleCardFormSubmit(evt){
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
  clearValidation(modalNewCard, validationConfig);
  evt.target.reset();
  closeModal(modalNewCard);
}

Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, cardsData]) => {
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileImage.style.backgroundImage = `url(${userData.avatar})`;
        const userId = userData._id;

        cardsData.forEach(card => {
            const cardElement = addCard(
                card,
                removeCard,
                handleLike,
                openPreview
            );
            cardList.append(cardElement);
        });
    })
    .catch(err => console.log(`Ошибка загрузки данных: ${err}`));

function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

// Обработчики событий
buttonEdit.addEventListener("click", function () {
  clearValidation(modalEdit, validationConfig);
  openModal(modalEdit);
});

buttonNewCard.addEventListener("click", function () {
  clearValidation(modalNewCard, validationConfig);
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

profileImage.addEventListener('click', function () {
  openModal(modalAvatar);
  clearValidation(modalAvatar, validationConfig);
  avatarInput.value = '';
});

formEditProfile.addEventListener('submit', handleProfileFormSubmit);
formNewPlace.addEventListener('submit', handleCardFormSubmit);
formAvatar.addEventListener('submit', handleAvatarFormSubmit);

enableValidation(validationConfig);