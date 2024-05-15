const inputAvatar = document.getElementById("input-avatar");
const inputAvatarChosen = document.getElementById("avatar-chosen");
const deleteButton = document.getElementById("delete-button");
const overlay = document.getElementById("overlay-area");

inputAvatar.addEventListener("change", function () {
  if (this.files && this.files[0]) {
    const reader = new FileReader();
    reader.onload = function (event) {
      inputAvatarChosen.style.backgroundImage = `url('${event.target.result}')`;
      overlay.classList.add("input__choose-file--hide");
      inputAvatar.classList.add("input__area--hide");
    };
    reader.readAsDataURL(this.files[0]);
  }
});

deleteButton.addEventListener("click", function () {
  inputAvatar.value = "";
  inputAvatarChosen.style.backgroundImage = "none";
  overlay.classList.remove("input__choose-file--hide");
  inputAvatar.classList.remove("input__area--hide");
});
