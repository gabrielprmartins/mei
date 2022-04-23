// Fixed header
const header = document.querySelector('.header');
const activeClass = 'active';

function handleScroll() {
  if (header) {
    if (window.scrollY > 0) header.classList.add(activeClass);
    else header.classList.remove(activeClass);
  }
}

window.addEventListener('scroll', handleScroll);

// Parameters service
const parameters = new URLSearchParams(location.search);

parameters.forEach((parameter) => {
  const element = document.getElementById(parameter);
  if (element) element.checked = true;
});

// Menu mobile
const buttonMenu = document.querySelector('.input-open-menu');
const menu = document.querySelector('.menu');
const html = document.documentElement;

function handleOutsideClick({ target }) {
  if (target !== menu) {
    buttonMenu.checked = false;
    setTimeout(() => html.removeEventListener('click', handleOutsideClick));
  }
}

function handleClickButtonMenu() {
  if (buttonMenu.checked) {
    setTimeout(() => html.addEventListener('click', handleOutsideClick));
  }
}

buttonMenu.addEventListener('click', handleClickButtonMenu);
