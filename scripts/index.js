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
/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

/* -------------------------------------------------------------------------- */
/*                             Functions and Event Handlers                               */
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
  closeModal(addCardModal);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector("#card-delete");

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    previewImageTitle.textContent = cardData.name;
    openModal(previewImageModal);
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileModalCloseButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});

previewImageCloseButton.addEventListener("click", () => {
  closeModal(previewImageModal);
});

addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

profileEditButton.addEventListener("click", () => openModal(profileEditModal));
profileEditForm.addEventListener("submit", handleProfileSubmit);
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
