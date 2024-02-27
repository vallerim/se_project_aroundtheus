import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { validationSettings, initialCards } from "../utils/Constants.js";
import Api from "../components/Api.js";
import { data } from "autoprefixer";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

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
const profileAvatarEditButton = document.querySelector(
  ".profile__avatar-button"
);

/* -------------------------------------------------------------------------- */
/*                                     API                                    */
/* -------------------------------------------------------------------------- */

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d1b633d5-4516-4e6f-a396-7606abde29df",
    "Content-Type": "application/json",
  },
});

let cardSection;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfoNew.setUserInfo(userData);
    userInfoNew.setAvatar(userData.avatar);
    cardSection = new Section(
      {
        items: initialCards,
        renderer: (item) => createCard(item),
      },
      "#cards__list"
    );
    cardSection.renderItems();
  })
  .catch((err) => console.error(err));

/* -------------------------------------------------------------------------- */
/*                                 Form add and Validation                    */
/* -------------------------------------------------------------------------- */

const editFormElement = profileEditModal.querySelector("#edit-profile-form");
const addFormElement = addCardModal.querySelector("#add-card-form");
const avatarElement = document.querySelector("#edit-avatar-modal");

const editFormValidator = new FormValidator(
  validationSettings,
  editFormElement
);
const addFormValidator = new FormValidator(validationSettings, addFormElement);
const avatarElementValidator = new FormValidator(
  validationSettings,
  avatarElement
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarElementValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                               Popup                                        */
/* -------------------------------------------------------------------------- */

/* ----------------------------- Edit Popup Form Profile---------------------- */

const userInfoNew = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__image"
);
const profileEditPopup = new PopupWithForm("#edit-modal", (data) => {
  userInfoNew.setUserInfo(data);
  handleProfileFormEdit(data);
});
profileEditPopup.setEventListeners();

/* --------------------------- Popup Preview Image -------------------------- */

const imagePopUp = new PopupWithImage("#image-preview-modal");
imagePopUp.setEventListeners();

/* --------------------------- Popup Add Card -------------------------- */

const addCardPopUp = new PopupWithForm("#add-card-modal", handleAddCardSubmit);
addCardPopUp.setEventListeners();

/* ------------------------------ Avatar PopUp ------------------------------ */

const avatarPopup = new PopupWithForm("#edit-avatar-modal", handleAvatarForm);
avatarPopup.setEventListeners();

/* -------------------------- Delete Confirm Popup -------------------------- */

const deleteCardPopup = new PopupWithConfirmation("#confirm-delete-modal");
deleteCardPopup.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function renderCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteCardClick,
    handleCardLikeClick
  );
  return card.getView();
}
function createCard(cardData) {
  const cardEl = renderCard(cardData);
  cardSection.addItem(cardEl);
}

function handleImageClick(data) {
  imagePopUp.open(data);
}

function handleProfileFormEdit(data) {
  profileEditPopup.setLoadMessage(true, "Saving...");
  api
    .editUserInfo(data)
    .then((userData) => {
      userInfoNew.setUserInfo(data);
      profileEditPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileEditPopup.setLoadMessage(false, "Save");
    });
}

function handleAddCardSubmit(card) {
  addCardPopUp.setLoadMessage(true, "Saving...");
  api
    .addNewCard(card)
    .then((res) => {
      renderCard(res);
      addCardPopUp.close();
    })

    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addCardPopUp.setLoadMessage(false, "Create");
    });
}

function handleDeleteCardClick(card) {
  deleteCardPopup.open();
  deleteCardPopup.setSubmitAction(() => {
    deleteCardPopup.setLoadMessage(true, "Deleting...");
    api
      .deleteCard(card.getId())
      .then(() => {
        card.handleDeleteCard();
        deleteCardPopup.close();
      })
      .catch((err) => {
        console.error("Failed to delete the card:", err);
      })
      .finally(() => {
        deleteCardPopup.setLoadMessage(false);
      });
  });
}

function handleAvatarForm(data) {
  avatarPopup.setLoadMessage(true);
  api
    .newUserAvatar(data.link)
    .then((userData) => {
      userInfoNew.setAvatar(userData.avatar);
      avatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      avatarPopup.setLoadMessage(false, "Saving...");
    });
}

function handleCardLikeClick(cardId) {
  if (!cardId.isLiked) {
    api
      .addLikeToCard(cardId.getId())
      .then((res) => {
        cardId.updateLikeStatus(res.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .removeLikeFromCard(cardId.getId())
      .then((res) => {
        cardId.updateLikeStatus(res.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  }
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

profileAvatarEditButton.addEventListener("click", () => {
  avatarPopup.open();
  avatarElementValidator.toggleButtonState();
});
