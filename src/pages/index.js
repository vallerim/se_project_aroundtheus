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

const addNewCardButton = document.querySelector("#profile-add-card");
const addCardModal = document.querySelector("#add-card-modal");

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
  handleProfileFormSubmit(data);
});
profileEditPopup.setEventListeners();

/* --------------------------- Popup Preview Image -------------------------- */

const imagePopUp = new PopUpWithImage("#image-preview-modal");
imagePopUp.setEventListeners();

/* --------------------------- Popup Add Card -------------------------- */

const addCardPopUp = new PopupWithForm(
  "#add-card-modal",

  handleAddCardSubmit
);
addCardPopUp.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                                   Section                                  */
/* -------------------------------------------------------------------------- */

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardEl = renderCard(item);
      cardSection.addItem(cardEl);
    },
  },
  "#cards__list"
);
cardSection.renderItems();

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function renderCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  return card.getView();
}

function handleImageClick(data) {
  imagePopUp.open(data);
}

function handleProfileFormSubmit(data) {
  profileEditPopup.close();
}
function handleAddCardSubmit(data) {
  const title = data.title;
  const image = data.url;
  const cardAdd = renderCard({
    name: title,
    link: image,
  });
  cardSection.addItem(cardAdd);
  addCardPopUp.close();
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
