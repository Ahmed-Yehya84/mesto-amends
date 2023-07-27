let editFormButton = document.querySelector(".profile__edit-button");
let popupForm = document.querySelector(".popup");
let closePopupForm = document.querySelector(".popup__close-button");
let editForm = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_name_user");
let occupationInput = document.querySelector(".popup__input_name_occupation");
let profileName = document.querySelector(".profile__name");
let profileOccupation = document.querySelector(".profile__occupation");

editFormButton.addEventListener("click", openPopup);
closePopupForm.addEventListener("click", closePopup);
editForm.addEventListener("submit", submitHandler);

function submitHandler(e) {
  e.preventDefault();

  profileName.textContent = nameInput.value;
  profileOccupation.textContent = occupationInput.value;

  closePopup();
}

function openPopup() {
  popupForm.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  occupationInput.value = profileOccupation.textContent;
}

function closePopup() {
  popupForm.classList.remove("popup_opened");
}
