window.openModal = function openModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("modal--open");
};

window.closeModal = function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("modal--open");
};

const form = document.getElementById("form");
const inputs = form.querySelectorAll(".input__area");

inputs.forEach((input) => {
  const errorSpan = input.nextElementSibling;

  input.addEventListener("invalid", function (event) {
    event.preventDefault();
    input.classList.add("input__area--error");
    errorSpan.textContent = input.validationMessage;
    if (input.type === "tel") {
      errorSpan.textContent = "Номер телефона должен иметь вид +79998887766";
    } else if (input.type === "email") {
      errorSpan.textContent = "Email должен содержать латинские буквы и знак @";
    }
  });

  input.addEventListener("input", function () {
    if (input.validity.valid) {
      input.classList.remove("input__area--error");
      errorSpan.textContent = "";
    }
  });
});

form.addEventListener("submit", function (event) {
  inputs.forEach((input) => {
    if (!input.validity.valid) {
      event.preventDefault();
    }
  });
});
