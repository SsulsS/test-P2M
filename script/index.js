const footerPopup = document.querySelector('.footer-popup');

//FORMS
const loginForm = document.querySelector('.login-form');
const passwordForm = document.querySelector('.password-form');
const errorForm = document.querySelector('.error-form');

//INPUTS
const loginInput = loginForm.querySelector('.form__input');
const passwordInput = passwordForm.querySelector('.form__input');
const errorLoginInput = errorForm.querySelector('.form__input_type_login');
const errorPasswordInput = errorForm.querySelector('.form__input_type_password');

//BUTTONS
const backButton = document.querySelector('.back-button');
const loginButton = loginForm.querySelector('.form__button')
const passwordButton = passwordForm.querySelector('.form__button')
const errorButton = errorForm.querySelector('.form__button')
const footerButton = document.querySelector('.footer__button');
const hideButtons = document.querySelectorAll('.form__hide-button');
const clearButtons = document.querySelectorAll('.form__clear-button');

function closeEsc(evt){
    if (evt.key === 'Escape'){
      const openedWind = document.querySelector('.footer-popup_opened');
      closepopup(openedWind)
    } 
  };
  
  function closepopup(popup) {
    popup.classList.remove('footer-popup_opened');
    document.removeEventListener('keydown',closeEsc);
  };
  
  function openpopup(popup) {
    popup.classList.add('footer-popup_opened');
    document.addEventListener('keydown',closeEsc);  
  };

  function check(popup){
    const classList = popup.classList;
    let check = 0;

    for (let i = 0; i < classList.length; i++) {
      if (classList[i] == 'footer-popup_opened') {
        check++ 
      }
    }

    if (check > 0) {
      closepopup(popup);
    } else{
      openpopup(popup);
    }
  }

  footerButton.addEventListener('click',function(){
    check(footerPopup);
  })

hideButtons.forEach((element)=> {
  element.addEventListener('click', function (evt) {
    evt.target.classList.toggle('form__hide-button_active');
    passwordCheck(element.parentNode)
  });
})

clearButtons.forEach((element)=> {
  element.addEventListener('click', function () {
    clearInputs(element)
    element.classList.remove('form__clear-button_active')
});
})

function clearInputs(clearButton) {
  const parent = clearButton.parentNode
  const input = parent.querySelector('.form__input')
  const span = parent.querySelector('.form__span')
  if (input.classList.contains('form__input_type_login')) {
    document.querySelectorAll('.form__input_type_login').forEach(element => {
      element.value = ''
      element.classList.remove('form__input_type_error')
      errorForm.querySelector('.span_login').classList.add('form__span_inactive')
    });
  } else if(input.classList.contains('form__input_type_password')) {
    document.querySelectorAll('.form__input_type_password').forEach(element => {
      element.value = ''
      element.classList.remove('form__input_type_error')
      errorForm.querySelector('.span_password').classList.add('form__span_inactive')
    });
  } 
}
  
function show(element) {
  const input = element.querySelector('.form__input');
  input.setAttribute('type', 'text');
}

function hide(element) {
  var input = element.querySelector('.form__input');
  input.setAttribute('type', 'password');
}

let pwShow = 0;

function passwordCheck(element) {
  if (pwShow == 0) {
      pwShow = 1;
      show(element);
  } else {
      pwShow = 0;
      hide(element);
  }
}

  const profiles = [
    {
      name: 'Вадим',
      login: '79857878780',
      password: '123',
    },
    {
      name: 'Александр',
      login: '79859925837',
      password: 'password',
    },
    {
      name: 'Дмитрий',
      login: '79859492863',
      password: 'abc',
    },
    {
      name: 'Глеб', 
      login: '79857288235',
      password: 'qwe',
    },
    {
      name: 'Даниил',
      login: '79851289183',
      password: '111111',
    },
];

function backTransition(){
  loginForm.closest('.auth').classList.add('auth_opened');
  passwordForm.closest('.auth').classList.remove('auth_opened');
};
function backTransitionFromError(){
  passwordForm.closest('.auth').classList.add('auth_opened');
  errorForm.closest('.auth').classList.remove('auth_opened');
}
backButton.addEventListener('click',function(){
  if (errorForm.closest('.auth').classList.contains('auth_opened')){
    backTransitionFromError()
  }else{
    backTransition()
  }
});

function transition(event) {
  event.preventDefault();
  loginForm.closest('.auth').classList.remove('auth_opened');
  passwordForm.closest('.auth').classList.add('auth_opened');
};
loginButton.addEventListener('click',transition);

function transitionInError() {
  passwordForm.closest('.auth').classList.remove('auth_opened');
  errorForm.closest('.auth').classList.add('auth_opened');

  errorLoginInput.value = loginInput.value;
  errorPasswordInput.value = passwordInput.value;

  errorLoginInput.classList.add('form__input_type_error')
  errorPasswordInput.classList.add('form__input_type_error')

  errorForm.querySelector('.span_login').classList.remove('form__span_inactive')
  errorForm.querySelector('.span_password').classList.remove('form__span_inactive')

  clearButtons.forEach((element)=> {
    element.classList.add('form__clear-button_active');
  })
}

function checkError(){
  let verify = false;
  for (let i = 0; i < profiles.length; i++) {
    if (loginInput.value == profiles[i].login && passwordInput.value == profiles[i].password) {
      verify = true
    }
  }
  if (!verify) {
    transitionInError()
  }
};
passwordButton.addEventListener('click', checkError)


//-------VALID----------------------------------------------------
const validLogin = new FormValid({
  formSelector: loginForm,
  fieldsetSelector: '.form__set',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
});
validLogin.enableValidation();

const validPassowrd = new FormValid({
  formSelector: passwordForm,
  fieldsetSelector: '.form__set',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
});
validPassowrd.enableValidation();

