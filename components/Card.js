export default class Card {
constructor( data, cardSelector, handleImageClick) {
this._name = data.name;
this._link = data.link;
this._cardSelector = cardSelector;
this._handeImageClick = handleImageClick;
}


_setEventListeners() {
 this._cardElement.querySelector(".card__like-button").addEventListener("click", () => {
    this._handleLikeIcon();
  });

  this._cardElement.querySelector("#card-delete").addEventListener("click", () => {
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
  this._cardElement.querySelector(".card__like-button").classList.toggle(".card__like-button_active");
}

_handleDeleteCard() {
this._cardElement.remove();
this._cardElement = null;
}


getView() {
  this._cardElement = document
  .querySelector(this._cardSelector)
  .content.querySelector(".card")
  .cloneNode(true);

  this._cardElement.querySelector(".card__image").style.backgroundImage = `url(${this._link})`;
  this._cardElement.querySelector(".card__title").textContent = this._name;

this._setEventListeners();

return this._cardElement;
}
}