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
const profileEditForm = document.forms["profileEditForm"];
const addCardForm = document.forms["addCardForm"];
const cardListEl = document.querySelector(".cards__list");

//buttons
const profileEditBtn = document.querySelector("#profile-edit-btn");
const editCloseBtn = document.querySelector("#edit-close-btn");
const addNewCardButton = document.querySelector(".profile__add-button");
const addCloseBtn = document.querySelector("#add-close-btn");

//other elements
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = profileEditForm.querySelector("#profile-title-input");
const profileDescriptionInput = profileEditForm.querySelector(
  "#profile-description-input"
);
const cardTitleInput = addCardForm.querySelector("#add-card-title-input");
const cardUrlInput = addCardForm.querySelector("#add-card-url-input");

// functions
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
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

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

// Event Listeners

profileEditBtn.addEventListener("click", () => openModal(profileEditModal));

editCloseBtn.addEventListener("click", () => {
  closeModal(profileEditModal);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

addNewCardButton.addEventListener("click", () => openModal(addCardModal));

addCloseBtn.addEventListener("click", () => closeModal(addCardModal));

// Event handlers

profileEditForm.addEventListener("submit", handleProfileSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => renderCard(cardData));
