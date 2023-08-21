const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_status_invalid",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// show input error
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

// hide input error
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);

  errorElement.textContent = " ";
};

const submitButtonState = (formElement) => {
  const submitButton = formElement.querySelector(config.submitButtonSelector);

  if (formElement.checkValidity()) {
    submitButton.disabled = false;
    submitButton.classList.remove(config.inactiveButtonClass);
  } else {
    submitButton.disabled = true;
    submitButton.classList.add(config.inactiveButtonClass);
  }
};

//  checkInputValidity
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
    submitButtonState(formElement);
  } else {
    hideInputError(formElement, inputElement);
    submitButtonState(formElement);
  }
};

// setEventListeners
const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
    });
    setEventListeners(inputElement);
  });
};

// enableValidation
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation(config);
