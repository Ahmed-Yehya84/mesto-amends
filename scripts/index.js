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

const closeAddPhoto = document.querySelector(".popup__close-button");
const photoName = document.querySelector(".popup__input_value_photo-name");
const photoLink = document.querySelector(".popup__input_value_photo-link");
const addPhotoForm = document.querySelector(".popup__form_type_add-photo");
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

editFormButton.addEventListener("click", handleOpenEditFormClick);

closeEditPopup.addEventListener("click", handleCloseEditFormClick);

editForm.addEventListener("submit", handleEditFormSubmit);
addPhotoButton.addEventListener("click", handleAddPhotoFormClick);
closeAddPhoto.addEventListener("click", handleCloseAddPhotoFormClick);
buttonCloseImagePopup.addEventListener("click", handlePhotoModalCloseClick);
addPhotoForm.addEventListener("submit", handleAddPhotoFormSubmit);

const overlayLayers = document.querySelectorAll(".popup");
// universal functions

function openPopup(popup) {
  popup.classList.add("popup_opened");
  window.addEventListener("keydown", closePopupViaEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  window.removeEventListener("keydown", closePopupViaEsc, false);
}

// open edit popup
function handleOpenEditFormClick() {
  nameInput.value = profileName.textContent;
  occupationInput.value = profileOccupation.textContent;
  openPopup(editPopup);
}

// close edit popup
function handleCloseEditFormClick() {
  closePopup(editPopup);
}

// open add photo popup
function handleAddPhotoFormClick() {
  openPopup(addPhotoPopup);
}

// close add photo popup
function handleCloseAddPhotoFormClick() {
  closePopup(addPhotoPopup);
}
// openPhotoModal
function handlePhotoModalOpenClick() {
  openPopup(popupPhotoLarge);
}
// closePhotoModal
function handlePhotoModalCloseClick() {
  closePopup(popupPhotoLarge);
}

// adding user Photos handler function

function handleAddPhotoFormSubmit(event) {
  // submitButton = document.querySelector(".popup__submit-button");
  event.preventDefault();
  const name = photoName.value;
  const link = photoLink.value;

  renderCard(name, link);

  closePopup(addPhotoPopup);
  addPhotoForm.reset();
  submitButtonState(addPhotoForm);
}

// edit form handler function

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileOccupation.textContent = occupationInput.value;

  closePopup(editPopup);
  editForm.reset();
}

function createCard(cardName, cardImage) {
  const cardTemplate = document.querySelector("#card-box").content;
  const cardClone = cardTemplate.querySelector(".card").cloneNode(true);
  cardClone.querySelector(".card__image").src = cardImage;
  cardClone.querySelector(".card__image").alt = cardName;

  cardClone.querySelector(".card__name").textContent = cardName;

  // card like button  делегирование событий

  cardClone.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("card__like-button")) {
      evt.target.classList.toggle("card__like-button_clicked");
    }
  });

  // card delete functionality
  cardClone
    .querySelector(".card__delete")
    .addEventListener("click", (event) => {
      event.target.closest(".card").remove();
    });

  // image pop up
  cardClone.querySelector(".card__image").addEventListener("click", (event) => {
    popupImage.setAttribute("src", event.target.src);
    popupImage.setAttribute("alt", cardName);
    popupImageName.textContent = cardName;

    handlePhotoModalOpenClick();
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

function clickToCloseHandler(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

function closePopupViaEsc(event) {
  if (event.code === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

// overlayers function

overlayLayers.forEach((overlay) => {
  overlay.addEventListener("click", clickToCloseHandler);
});
