import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import PopUpWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { validationSettings, initialCards } from "../utils/Constants.js";

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#edit-modal");
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
const cardListEl = document.querySelector("#cards__list");

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
/*                                 Form add and Validation                    */
/* -------------------------------------------------------------------------- */

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
/*                               Popup                                        */
/* -------------------------------------------------------------------------- */

/* ----------------------------- Edit Popup Form Profile---------------------- */

const userInfoNew = new UserInfo(".profile__title", ".profile__description");
const profileEditPopup = new PopupWithForm("#edit-modal", (data) => {
  userInfoNew.setUserInfo(data);
  profileEditPopup.close();
});
profileEditPopup.setEventListeners();

/* --------------------------- Popup Preview Image -------------------------- */

const imagePopUp = new PopUpWithImage("#image-preview-modal", handleImageClick);
imagePopUp.setEventListeners();

/* --------------------------- Popup Add Card -------------------------- */

const addCardPopUp = new PopupWithForm("#add-card-modal", handleFormSubmit);
addCardPopUp.setEventListeners;

/* -------------------------------------------------------------------------- */
/*                                   Section                                  */
/* -------------------------------------------------------------------------- */

const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  "#cards__list"
);
cardSection.renderItems();

//function createCard(item) {
//const cardElement = new Card(item, "#card-template", handleImageClick);
// return cardElement.getView();
//}

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

export function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardEl = card.getView();

  cardSection.addItem(cardEl);
}

export function handleImageClick(data) {
  imagePopUp.open(data);
}

function handleFormSubmit(data) {
  const cardValue = renderCard(data);
  cardSection.addItem(cardValue);
  profileEditPopup.close();
  return cardValue;
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  const profileData = userInfoNew.getUserInfo();
  profileTitleInput.value = profileData.name;
  profileDescriptionInput.value = profileData.job;
  profileEditPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  addCardPopUp.open();
});
