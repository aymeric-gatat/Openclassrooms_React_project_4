// Fermer la pop up
const btnClose = document.querySelector(".close");
const popUp = document.querySelector(".bground");

btnClose.addEventListener("click", () => {
  popUp.style.display = "none"; // La pop-up disparait au clic
});

// =============== Validation du formulaire =============== //

// Selection de tous les champs (inputs)
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const numberTournement = document.getElementById("quantity");
const locations = document.querySelectorAll('input[name="location"]');
let selectedLocation = "";
const CGU = document.getElementById("checkbox1");
const newsLetters = document.getElementById("checkbox2");

const allInputs = document.querySelectorAll("input");
const form = document.forms.reserve;

// Ajouter le class error
function setInvalideClass(inputElement) {
  inputElement.classList.add("error");
  inputElement.addEventListener("change", () => {
    if (inputElement.value !== "") {
      inputElement.classList.remove("error");
    }
  });
}

// Application du message d'erreur
function toggleErrorMessage(element, test, messageError, type) {
  element.addEventListener(type, () => {
    const errorMsg = element.parentNode.querySelector(".error-msg");
    if (!test(element)) {
      if (!errorMsg) {
        const newErrorMsg = document.createElement("div");
        newErrorMsg.className = "error-msg";
        newErrorMsg.textContent = messageError;
        element.parentNode.appendChild(newErrorMsg);
      }
    } else if (errorMsg) {
      element.parentNode.removeChild(errorMsg);
    }
  });
}

// Verification des champs (inputs)
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email.value)) {
    setInvalideClass(email);
  }
  return regex.test(email.value);
}

function validateName(name) {
  if (name.value.length <= 2) {
    setInvalideClass(name);
  }
  return name.value.length >= 2;
}

function validateBirth(birthdate) {
  if (birthdate.value === "") {
    setInvalideClass(birthdate);
  }
  return birthdate.value !== "";
}

function validateNbr(number) {
  const newNumber = parseFloat(number.value);
  if (isNaN(newNumber)) {
    setInvalideClass(number);
  }
  return !isNaN(newNumber);
}

function validateCGU(cgu) {
  if (!cgu.checked) {
    setInvalideClass(cgu);
  }
  return cgu.checked;
}

function validateLocation(locations) {
  locations.forEach((location) => {
    if (location.checked) {
      selectedLocation = location.value;
    }
  });
  return selectedLocation !== "";
}

// Affichage des messages si erreur pour chaque champs (inputs)
toggleErrorMessage(email, validateEmail, "Veuillez entrer une adresse email valide.", "blur");
toggleErrorMessage(firstName, validateName, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.", "blur");
toggleErrorMessage(lastName, validateName, "Veuillez entrer 2 caractères ou plus pour le champ du nom.", "blur");
toggleErrorMessage(birthdate, validateBirth, "Vous devez entrer votre date de naissance.", "blur");
toggleErrorMessage(numberTournement, validateNbr, "Vous devez rentrer un nombre", "blur");
toggleErrorMessage(CGU, validateCGU, "Vous devez vérifier que vous acceptez les termes et conditions.", "click");

// Envoie du formulaire
function validate(event) {
  event.preventDefault();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const errorMsg = form.querySelector(".error-msg");
  if (
    !validateName(firstName) ||
    !validateName(lastName) ||
    !validateEmail(email) ||
    !validateBirth(birthdate) ||
    !validateNbr(numberTournement) ||
    !validateCGU(CGU) ||
    !validateLocation(locations)
  ) {
    const newErrorMsg = document.createElement("div");
    newErrorMsg.className = "error-msg";
    newErrorMsg.textContent = "Vous devez remplir les champs du formulaire avnt de valider";
    form.classList.add("form-error");
    form.appendChild(newErrorMsg);
    setTimeout(() => {
      form.removeChild(newErrorMsg);
      form.classList.remove("form-error");
    }, 2000);
  } else {
    const formData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      birthdate: birthdate.value,
      numberTournement: numberTournement.value,
      location: selectedLocation,
      CGU: CGU.checked,
      newsLetters: newsLetters.checked,
    };
    const tyMsg = document.createElement("div");
    const tyMsgBtn = document.createElement("button");

    tyMsg.className = "tymsg";
    tyMsg.textContent = "Merci pour votre inscription";
    form.parentNode.appendChild(tyMsg);

    tyMsgBtn.className = "tymsg-btn";
    tyMsgBtn.textContent = "Fermer";
    tyMsg.appendChild(tyMsgBtn);

    tyMsgBtn.addEventListener("click", () => {
      popUp.style.display = "none";
    });
  }
});

// Submit du formulaire
/*firstName.addEventListener("click", () => 

  
});*/
