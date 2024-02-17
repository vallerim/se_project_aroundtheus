import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitButton = this._popupForm.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
    this._deleteButton = this._popupElement.querySelector(
      ".card__delete-button"
    );
  }

  setSubmitButton(action) {
    this._handleFormSubmit = action;
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }

  setLoadMessage(isLoading) {
    this._submitButton.textContent = isLoading
      ? "Saving..."
      : this._submitButtonLoadingText;
  }

  _handleButtonSubmit = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit();
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
}
