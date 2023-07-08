const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (inputElement.validity.patternMismatch) {
  inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
  inputElement.setCustomValidity("");
}

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const disableButton = (buttonElement) => {
  buttonElement.setAttribute('disabled', '');
}

const setEventListeners = (form, inputSelector, submitButtonSelector, inputErrorClass, errorClass) => {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const buttonElement = form.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  form.addEventListener('reset', () => {
    disableButton(buttonElement)
  });
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(form, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inputErrorClass, errorClass}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
   formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
   });
   setEventListeners(formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)) {
    disableButton(buttonElement);
  }
  else {
    buttonElement.removeAttribute('disabled');
  }
};
