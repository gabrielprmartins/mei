// Fixed header
const header = document.querySelector('.header');
const activeClass = 'active';

function handleScroll() {
  if (header) {
    if (window.scrollY > 0) header.classList.add(activeClass);
    else header.classList.remove(activeClass);
  }
}

if (header) window.addEventListener('scroll', handleScroll);

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

if (buttonMenu) buttonMenu.addEventListener('click', handleClickButtonMenu);

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

if (form) form.addEventListener('submit', handleSubmit);

// Adress by cep
const cep = document.getElementById('cep');
const street = document.getElementById('rua');
const number = document.getElementById('numero');
const district = document.getElementById('bairro');
const city = document.getElementById('cidade');
const state = document.getElementById('uf');

function formatCep(cep) {
  const regex = /^([\d]{2})([\d]{3})([\d]{3})|^[\d]{2}.[\d]{3}-[\d]{3}/;
  if (regex.test(cep)) return cep;
  else return false;
}

function fillAdress(obj) {
  const { logradouro, numero, bairro, localidade, uf } = obj;
  if (logradouro) street.value = logradouro;
  if (numero) number.value = numero;
  if (bairro) district.value = bairro;
  if (localidade) city.value = localidade;
  if (uf) state.value = uf;
}

async function fetchCep(cep) {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const json = await response.json();
  return fillAdress(json);
}

function handleBlur(event) {
  const cepValue = formatCep(event.target.value);
  if (cepValue) {
    fetchCep(cepValue);
  }
}

if (cep) cep.addEventListener('blur', handleBlur);
