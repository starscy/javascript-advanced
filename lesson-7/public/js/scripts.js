function openBurgerMenu() {
  burgerMenu.style.display = "flex";
}
function closeBurgerMenu() {
  burgerMenu.style.display = "none";
}

let burgerButton = document.getElementById("burger");
burgerButton.addEventListener("click", openBurgerMenu);
let burgerMenu = document.querySelector(".navigation");
let burgerMenuClose = document.querySelector(".navigation__close");
burgerMenuClose.addEventListener("click", closeBurgerMenu);
let inputValue = document.querySelectorAll("card-description__text_square");
for (let elem of inputValue) {
  if (elem.value < 0) elem.value = 0;
}
console.log(inputValue);
