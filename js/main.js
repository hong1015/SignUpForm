const isIe = !!window.MSInputMethodContext && !!document.documentMode;

window.onresize = function (event) {
  resizeActiveFormType();
};
function switchForm(type) {
  const submitFormBtn = document.getElementById("signUpBtn");
  const logInFormBtn = document.getElementById("logInBtn");

  let unTargetType;
  switch (type) {
    case FormType.signUp:
      unTargetType = ".log_in";
      submitFormBtn.classList.add("active");
      logInFormBtn.classList.remove("active");
      break;
    case FormType.logIn:
      unTargetType = ".sign_up";
      submitFormBtn.classList.remove("active");
      logInFormBtn.classList.add("active");
      break;
  }

  const unSelectForm = document.querySelector(unTargetType);
  unSelectForm.classList.remove("active-body");
  activeFormType(type);
}

function activeFormType(type) {
  const formType = document.getElementById(type);
  const formBody = document.querySelector(".form-body");

  formBody.style.height = formType.offsetHeight + "px";
  formType.classList.add("active-body");
}

function resizeActiveFormType() {
  const formActiveType = document.querySelector(".active-body");
  const formBody = document.querySelector(".form-body");

  formBody.style.height = formActiveType.offsetHeight + "px";
}

function submitForm(formId, event) {
  event.preventDefault();
  const selectedForm = document.getElementById(formId);
  const isNormalUser = robotCheck(selectedForm);
  if (isNormalUser) {
    formSubmit(selectedForm, event);
  }
}

function formValidationCheck(formId) {
  const selectedForm = document.getElementById(formId);

  if (!selectedForm.checkValidity()) {
    const formFields = selectedForm.querySelectorAll("input");

    for (i = 0; i < formFields.length; i++) {
      let input = formFields[i];
      if (!input.validity.valid) {
        input.classList.add("error");
      }
    }
  }
}

function robotCheck(selectedForm) {
  const robotField = selectedForm.robot;
  if (robotField !== undefined) {
    const robotTrap = selectedForm.robot.value.length;
    if (robotTrap !== 0) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}

function formSubmit(selectedForm) {
  const formSubmitData = new FormData(selectedForm);

  selectedForm.reset();
  if (isIe) {
    ieFormReset(selectedForm);
  } else {
    const formDataDisplay = Object.fromEntries(formSubmitData);
    console.log("submit form data", formDataDisplay);
  }
}
function ieFormReset(selectedForm) {
  const formId = selectedForm.id;
  switch (formId) {
    case FormType.signUpForm:
      document.getElementById("firstName").value = "";
      document.getElementById("lastName").value = "";
      document.getElementById("emailAddress").value = "";
      document.getElementById("password").value = "";
      break;
    case FormType.logInForm:
      document.getElementById("emailAddressLogin").value = "";
      document.getElementById("passwordLogin").value = "";
      break;
  }
}

function validationCheck(fieldId) {
  const selectedField = document.getElementById(fieldId);
  const selectedFieldVaild = selectedField.validity.valid;
  if (selectedFieldVaild) {
    selectedField.classList.remove("error");
  } else {
    selectedField.classList.add("error");
  }
}

function asteriskCheck(fieldId) {
  const selectedField = document.getElementById(fieldId);
  const selectedFieldValue = selectedField.value;
  console.log(selectedFieldValue === "");
  if (selectedFieldValue === "") {
    selectedField.parentElement.classList.add("asterisk-active");
  } else {
    selectedField.parentElement.classList.remove("asterisk-active");
  }
}

function showPassword(fieldId, parentField) {
  const selectedParentField = document.getElementById(parentField);
  const selectedField = document.getElementById(fieldId);
  if (selectedParentField.classList.contains("lock-open")) {
    selectedField.type = "password";
    selectedParentField.classList.remove("lock-open");
  } else {
    selectedField.type = "text";
    selectedParentField.classList.add("lock-open");
  }
}

function removeAsterisk(parentField) {
  const selectedParentField = document.getElementById(parentField);
    selectedParentField.classList.remove("asterisk-active");
  
}
function activeAsterisk(fieldId, parentField) {
  const selectedParentField = document.getElementById(parentField);
  const selectedField = document.getElementById(fieldId);
  if (selectedField.value === "") {
    selectedParentField.classList.add("asterisk-active");
  } else {
    selectedParentField.classList.remove("asterisk-active");
  }
}
