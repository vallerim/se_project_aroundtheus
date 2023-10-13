import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#edit-modal");
const profileModalCloseButton = document.querySelector("#modal-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector("#edit-profile-form");
const cardsWrap = document.querySelector(".gallery__cards");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addNewCardButton = document.querySelector("#profile-add-card");
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalCloseButton = document.querySelector(
  "#add-card-modal-close-button"
);
const addCardFormElement = document.querySelector("#add-card-form");
const cardTitleInput = addCardFormElement.querySelector("#card-title-input");
const cardUrlInput = addCardFormElement.querySelector("#card-image-url");
const previewImageModal = document.querySelector("#image-preview-modal");
const previewImage = previewImageModal.querySelector("#image-preview");
const previewImageCloseButton = previewImageModal.querySelector(
  "#close-image-preview"
);
const previewImageTitle = previewImageModal.querySelector(
  "#preview-image-title"
);
const cardData = {
  name: cardTitleInput.value,
  link: cardUrlInput.value,
};

/* -------------------------------------------------------------------------- */
/*                                  Validation                                */
/* -------------------------------------------------------------------------- */
const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormElement = profileEditModal.querySelector("#edit-profile-form");
const addFormElement = addCardModal.querySelector("#add-card-form");

const editFormValidator = new FormValidator(
  validationSettings,
  editFormElement
);
const addFormValidator = new FormValidator(validationSettings, addFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
}

function renderCard(data, wrapper) {
  const cardElement = createCard(data);
  wrapper.prepend(cardElement);
}

function createCard(cardData, cardSelector) {
  const card = new Card(cardData, "#card-template");
  return card.getView();
}

/* -------------------------------------------------------------------------- */
/*                             Functions and Event Handlers                   */
/* -------------------------------------------------------------------------- */

function handleProfileSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardsWrap);
  addCardFormElement.reset();

  closeModal(addCardModal);
  addFormValidator.resetValidation();
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function closeByClick(evt) {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal__close")
  ) {
    closeModal(evt.currentTarget);
  }
}

[profileEditModal, addCardModal, previewImageModal].forEach((modal) => {
  modal.addEventListener("click", closeByClick);
});

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

addNewCardButton.addEventListener("click", () => openModal(addCardModal));

profileEditForm.addEventListener("submit", handleProfileSubmit);

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

export { openModal };
