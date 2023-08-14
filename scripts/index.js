const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const editFormButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit-form");
const addPhotoPopup = document.querySelector(".popup_type_add-photo");
const closeEditPopup = document.querySelector(".popup__close-button_type_edit");

const editForm = document.querySelector(".popup__form_type_edit");
const nameInput = document.querySelector(".popup__input_name_user");
const occupationInput = document.querySelector(".popup__input_name_occupation");
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");
const cards = document.querySelector(".cards");
const addPhotoButton = document.querySelector(".profile__add-button");
const card = document.querySelector(".card");
const closeAddPhoto = document.querySelector(".popup__close-button");
const photoName = document.querySelector(".popup__input_value_photo-name");
const photoLink = document.querySelector(".popup__input_value_photo-link");
const addPhotoForm = document.querySelector(".popup__form_type_add-photo");
const likeBotton = document.querySelectorAll(".card__like-button");
const inputs = document.querySelectorAll(
  ".popup__input_value_photo-name,.popup__input_value_photo-link"
);

const popupPhotoLarge = document.querySelector(".popup_type_modal");
const popupImage = document.querySelector(".popup__image");
const popupImageName = document.querySelector(".popup__name");
const buttonCloseImagePopup = document.querySelector(
  ".popup__close-button_type_modal"
);

const popup = document.querySelector(".popup");

editFormButton.addEventListener("click", openEditForm);

closeEditPopup.addEventListener("click", closeEditForm);

editForm.addEventListener("submit", handleEditForm);
addPhotoButton.addEventListener("click", openAddPhotoForm);
closeAddPhoto.addEventListener("click", closeAddPhotoForm);
buttonCloseImagePopup.addEventListener("click", closePhotoModal);
addPhotoForm.addEventListener("submit", handleAddPhotoForm);

// universal functions

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// open edit popup
function openEditForm() {
  nameInput.value = profileName.textContent;
  occupationInput.value = profileOccupation.textContent;
  openPopup(editPopup);
}

// close edit popup
function closeEditForm() {
  closePopup(editPopup);
}

// open add photo popup
function openAddPhotoForm() {
  openPopup(addPhotoPopup);
}

// close add photo popup
function closeAddPhotoForm() {
  closePopup(addPhotoPopup);
}

function closePhotoModal() {
  closePopup(popupPhotoLarge);
}

// adding user Photos handler function

function handleAddPhotoForm(e) {
  e.preventDefault();
  const name = photoName.value;
  const link = photoLink.value;

  renderCard(name, link);

  closePopup(addPhotoPopup);

  inputs.forEach((input) => {
    input.value = "";
  });
}

// edit form handler function

function handleEditForm(e) {
  e.preventDefault();

  profileName.textContent = nameInput.value;
  profileOccupation.textContent = occupationInput.value;

  closePopup(editPopup);
}

function createCard(cardName, cardImage) {
  const cardTemplate = document.querySelector("#card-box").content;
  const cardClone = cardTemplate.querySelector(".card").cloneNode(true);
  cardClone.querySelector(".card__image").src = cardImage;
  cardClone.querySelector(".card__image").alt = cardName;

  cardClone.querySelector(".card__name").textContent = cardName;
  closePopup(popupPhotoLarge);
  // card like button

  cardClone
    .querySelector(".card__like-button")
    .addEventListener("click", (e) => {
      e.target.classList.toggle("card__like-button_clicked");
    });

  // card delete functionality
  cardClone.querySelector(".card__delete").addEventListener("click", (e) => {
    e.target.closest(".card").remove();
  });

  // image pop up
  cardClone.querySelector(".card__image").addEventListener("click", (e) => {
    popupImage.setAttribute("src", e.target.src);
    popupImage.setAttribute("alt", cardName);
    popupImageName.textContent = cardName;

    openPopup(popupPhotoLarge);
  });

  return cardClone;
}

function renderCard(cardName, cardImage) {
  const newCard = createCard(cardName, cardImage);

  cards.prepend(newCard);
}

initialCards.reverse().forEach((card) => {
  const cardName = card.name;
  const cardImage = card.link;
  renderCard(cardName, cardImage);
});
