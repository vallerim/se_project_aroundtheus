import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, submitButtonLoadingText) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputItems = this._popupForm.querySelectorAll(".modal__input");
    this._submitButton = this._popupForm.querySelector(".modal__button");
    /*this._submitButtonLoadingText = submitButtonLoadingText.textContent;*/
  }

  _getInputValues() {
    const inputValues = {};
    this._inputItems.forEach((inputItems) => {
      inputValues[inputItems.name] = inputItems.value;
    });
    return inputValues;
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  /*setLoading(submit, loadingText = "Saving...") {
    if (submit) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }*/

  setLoadMessage(isLoading) {
    this._submitButton.textContent = isLoading
      ? "Saving..."
      : this._submitButtonLoadingText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
