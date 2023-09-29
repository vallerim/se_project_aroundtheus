export default class FormValidator {

  constructor(settings, formElement) {
    this._formElement = formElement;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

  }

_checkInputValidity(inputElement) {
  if (!inputElement.validity.valid) {
    return this._showInputError(inputElement);
  } else {
    this._hideInputError(inputElement);
  }
}

_showInputError(inputElement) {
  const errorMessageEl = this._formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(this._inputErrorClass);
  errorMessageEl.textContent = inputElement.validationMessage;
  errorMessageEl.classList.add(this._errorClass);
}

_hideInputError(inputElement) {
  const errorMessageEl = this._formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(this._inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(this._errorClass);
}

_toggleButtonState() {
    if (this._hasInvalidInput(this._inputEls)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
      return;
    }
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

_hasInvalidInput(inputList) {
  return !inputList.every((inputElement) => inputElement.validity.valid);
}

_setEventListeners() {
  this._inputEls = [
    ...this._formElement.querySelectorAll(this._inputSelector),
  ];
  this._submitButton = this._formElement.querySelector(
    this._submitButtonSelector
  );
  this._inputEls.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState(inputElement);
    });
  });
}

resetValidation() {
  if(!this._submitButton.disabled) {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }
}

enableValidation() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
}

}

//const settings = {
  //formSelector: ".modal__form",
  //inputSelector: ".modal__input",
  //submitButtonSelector: ".modal__button",
  //inactiveButtonClass: "modal__button_disabled",
  //inputErrorClass: "modal__input_type_error",
  //errorClass: "modal__error_visible",
//};
