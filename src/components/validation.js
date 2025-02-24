// Экспорт функций

export const clearValidation = (form, validationConfig) => {
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const button = form.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((input) => {
      hideInputError(form, input, validationConfig);
  });
  toggleButtonState(inputList, button, validationConfig);
};

export const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(form, validationConfig);
  });
};

// Остальные функции

const showInputError = (form, input, errorMessage, validationConfig) => {
  const error = form.querySelector(`.${input.id}-input-error`);
  input.classList.add(validationConfig.inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(validationConfig.errorClass);
};

const hideInputError = (form, input, validationConfig) => {
  const error = form.querySelector(`.${input.id}-input-error`);
  input.classList.remove(validationConfig.inputErrorClass);
  error.classList.remove(validationConfig.errorClass);
  error.textContent = '';
};

const checkValidity = (form, input, validationConfig) => {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }

  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, validationConfig);
  } else {
    hideInputError(form, input, validationConfig);
  }
};

const setEventListeners = (form, validationConfig) => {
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const button = form.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((input) => {
      hideInputError(form, input, validationConfig);
      input.addEventListener('input', function () {
        checkValidity(form, input, validationConfig);
          toggleButtonState(inputList, button, validationConfig);
      });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
};

const toggleButtonState = (inputList, button, validationConfig) => {
  if(hasInvalidInput(inputList)){
      button.classList.add(validationConfig.inactiveButtonClass);
      button.disabled = true;
  } else{
      button.classList.remove(validationConfig.inactiveButtonClass);
      button.disabled = false;
  }
}
