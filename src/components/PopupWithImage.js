import Popup from "./Popup.js";

export default class PopUpWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupImage = this._popupElement.querySelector(
      ".modal__image-preview"
    );
    this._popupImageText = this._popupElement.querySelector(
      ".modal__image-title"
    );
  }

  open(data) {
    this._popupImageText.textContent = data._name;
    this._popupImage.alt = data._name;
    this._popupImage.src = data._link;
    super.open();
  }
}
