import Popup from "./Popup.js";

export default class PopUpWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupImage = document.querySelector(".modal__image-preview");
    this._popupImageText = document.querySelector(".modal__image-title");
  }

  open() {
    this._popupImageText.textContent = this.name;
    this._popupImage.alt = this.name;
    this._popupImage.src = this.link;
    super.open();
  }
}
