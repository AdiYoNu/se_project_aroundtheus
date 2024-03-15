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

// wrappers

const profileEditModal = document.querySelector("#profile-edit-modal");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addCardModal = document.querySelector("#add-card-modal");
const previewImageModal = document.querySelector("#image-preview-modal");
const profileEditForm = document.forms["profileEditForm"];
const addCardForm = document.forms["addCardForm"];
const cardListEl = document.querySelector(".cards__list");
const modals = document.querySelectorAll(".modal");

//buttons
const profileEditBtn = document.querySelector("#profile-edit-btn");
const editCloseBtn = document.querySelector("#edit-close-btn");
const addNewCardButton = document.querySelector(".profile__add-button");
const addCloseBtn = document.querySelector("#add-close-btn");
const previewCloseBtn = document.querySelector("#preview-close-btn");

//other elements
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = profileEditForm.querySelector("#profile-title-input");
const profileDescriptionInput = profileEditForm.querySelector(
  "#profile-description-input"
);
const cardTitleInput = addCardForm.querySelector("#add-card-title-input");
const cardUrlInput = addCardForm.querySelector("#add-card-url-input");
const cardPreviewEl = document.querySelector(".modal__preview-image");
const cardPreviewImageTitle = document.querySelector(".modal__image-title");

// functions
function openModal(modal) {
  modal.classList.add("modal__opened");
  document.addEventListener("keyup", handleEsc);
}

function closeModal(modal) {
  modal.classList.remove("modal__opened");
  document.removeEventListener("keyup", handleEsc);
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

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
  renderCard({ name, link });
  addCardForm.reset();
  closeModal(addCardModal);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    cardPreviewEl.src = cardImageEl.src;
    cardPreviewEl.alt = cardImageEl.alt;
    cardPreviewImageTitle.textContent = cardTitleEl.textContent;
    openModal(previewImageModal);
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

function handleEsc(e) {
  e.preventDefault();
  isEscEvent(e, closeModal);
}

function isEscEvent(e, action) {
  const openedModal = document.querySelector(".modal__opened");
  if (e.key === "Escape") {
    action(openedModal);
  }
}

// Event Listeners

profileEditBtn.addEventListener("click", () => {
  openModal(profileEditModal);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

// editCloseBtn.addEventListener("click", () => closeModal(profileEditModal));

addNewCardButton.addEventListener("click", () => openModal(addCardModal));

// addCloseBtn.addEventListener("click", () => closeModal(addCardModal));

// previewCloseBtn.addEventListener("click", () => closeModal(previewImageModal));

modals.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("modal") ||
      e.target.classList.contains("modal__close-button")
    ) {
      closeModal(modal);
    }
  });
});

// Event handlers

profileEditForm.addEventListener("submit", handleProfileSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => renderCard(cardData));
