import { openModal } from "../pages/index.js";

const previewImageModal = document.querySelector("#image-preview-modal");
const previewImage = previewImageModal.querySelector("#image-preview");
const previewImageCloseButton = previewImageModal.querySelector(
  "#close-image-preview"
);
const previewImageTitle = previewImageModal.querySelector(
  "#preview-image-title"
);

export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handeImageClick = handleImageClick;
  }

  _getCardTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNone(true);
    return cardElement;
  }

  _getElement() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._cardElement
      .querySelector("#card-delete")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick({
          name: this._name,
          link: this._link,
        });
      });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
  _handleImageClick() {
    previewImage.src = this_.link;
    previewImage.alt = `Photo of ${this_.name}`;
    previewImageTitle.textContent = this_.name;
    openModal(previewImageModal);
  }

  getView() {
    this._cardElement = this._getElement();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = `Image $ ${this._link}`;
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}
