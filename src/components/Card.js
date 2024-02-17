export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    isLiked,
    _id,
    handleDeleteCardClick,
    handleLikeCardClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this.isLiked = isLiked;
    this.id = _id;
    this._cardDeleteButton = document.querySelector(".card__delete-button");
    this._handleDeleteCardClick = handleDeleteCardClick; // Add this
    this._handleLikeCardClick = handleLikeCardClick;
  }

  _getElement() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeIcon());
    this._cardDeleteButton.addEventListener("click", () =>
      this._handleDeleteCardClick(this)
    );
    this._cardImage.addEventListener("click", () =>
      this._handleImageClick(this._link, this._name)
    );
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _likeRender() {
    if (this.isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  updateLikeIcon() {
    this.isLiked = this.isLiked;
    this._likeRender();
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getId() {
    return this._id;
  }

  _getCardTemplate() {
    const element = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return element;
  }

  getView() {
    this._cardElement = this._getCardTemplate();
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardDeleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = `Image $ ${this._name}`;
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardTitle.textContent = this._name;
    this._likeRender();
    this._setEventListeners();
    return this._cardElement;
  }

  getId() {
    return this.id;
  }
}
