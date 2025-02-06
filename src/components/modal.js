export function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalOnEscape);
}

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalOnEscape);
}

export function closeModalOnEscape(evt) {
  if (evt.key === 'Escape') {
    const popupIsOpened = document.querySelector('.popup_is-opened');

    if (popupIsOpened) {
      closeModal(popupIsOpened);
    }
  }
}

export function closeModalOnOverlay(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    closeModal(evt.target);
  }
}