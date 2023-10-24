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

  open({ title, url }) {
    this._popupImageText.textContent = title;
    this._popupImage.alt = title;
    this._popupImage.src = url;
    super.open();
  }
}
