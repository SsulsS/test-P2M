class FormValid{    
  constructor(config){
    this.formSelector = config.formSelector;
    this.fieldsetSelector = config.fieldsetSelector;
    this.inputSelector = config.inputSelector;
    this.submitButtonSelector = config.submitButtonSelector;
    this.inactiveButtonClass = config.inactiveButtonClass;
    this.inputErrorClass = config.inputErrorClass;
    this.errorClass = config.errorClass;
    this.closeButton = config.closeButton;
    this.inputList = Array.from(this.formSelector.querySelectorAll(this.inputSelector));
    this.buttonElement = this.formSelector.querySelector(this.submitButtonSelector);
  }

  enableValidation(){
    this.formSelector.addEventListener('submit', function (evt) {
      evt.preventDefault();
    })
    
    const fieldSet = this.formSelector.querySelector(this.fieldsetSelector);
    this._setEventListeners(fieldSet , this.inputSelector , this.inputErrorClass);
  };

  _setEventListeners(formElement,inputSelector,inputErrorClass){
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    this._toggleButtonState();
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement, inputErrorClass);
        this._toggleButtonState();
      });
    });
  };

  _toggleButtonState(){
    if (this._hasInvalidInput(this.inputList)) {
      this.buttonElement.classList.add(this.inactiveButtonClass);
      this.buttonElement.disabled = true;
    } else {
      this.buttonElement.classList.remove(this.inactiveButtonClass);
      this.buttonElement.disabled = false;
    }
  };

  _checkInputValidity(formElement, inputElement, inputErrorClass){
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage,inputErrorClass);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };

  _hideInputError(inputElement){
    const errorElement = this.formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.inputErrorClass);
    errorElement.classList.remove(this.errorClass);
    errorElement.textContent = '';
  };

  _hasInvalidInput (inputList){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  resetValidation() {
    this._toggleButtonState();

    this.inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

}