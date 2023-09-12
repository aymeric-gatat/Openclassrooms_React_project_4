// Fermer la pop up
const btnClose = document.querySelector(".close");
const popUp = document.querySelector(".bground");

btnClose.addEventListener("click", () => {
  popUp.style.display = "none"; // La pop-up disparait au clic
});
