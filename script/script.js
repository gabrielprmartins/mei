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

// Form
const form = document.querySelector('.mei-form');
const buttonForm = document.querySelector('.button-payment');
const checkModal = document.querySelector('.check-modal');
const errorModal = document.querySelector('.error-modal');
const modalContainer = document.querySelector('.modal-container');
const buttonCloseModal = document.querySelector('.close-modal');

function resetForm() {
  const inputs = document.querySelectorAll('.mei-form input');
  const selects = document.querySelectorAll('.mei-form select');
  inputs.forEach((input) => (input.value = ''));
  selects.forEach((select) => (select.value = ''));
}

function handleOutsideModalClick({ target }) {
  if (target === modalContainer || target === buttonCloseModal) {
    resetForm();
    buttonForm.disabled = false;
    buttonForm.innerText = 'Enviar';
    modalContainer.classList.remove(activeClass);
    checkModal.classList.remove(activeClass);
    errorModal.classList.remove(activeClass);
    setTimeout(() =>
      html.removeEventListener('click', handleOutsideModalClick),
    );
  }
}

function formSent(response) {
  modalContainer.classList.add(activeClass);
  if (response.ok) {
    checkModal.classList.add(activeClass);
    setTimeout(() => html.addEventListener('click', handleOutsideModalClick));
  } else {
    errorModal.classList.add(activeClass);
    setTimeout(() => html.addEventListener('click', handleOutsideModalClick));
  }
}

function handleSubmit(event) {
  event.preventDefault();

  buttonForm.disabled = true;
  buttonForm.innerText = 'Enviando...';

  const data = new FormData(form);
  console.log(data.get('nome'));
  fetch('./enviar.php', { method: 'POST', body: data }).then(formSent);
}

if (form) {
  form.addEventListener('submit', handleSubmit);
}
