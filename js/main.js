
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const pwd = document.querySelector("#password");
const confirmPwd = document.querySelector("#confirm-password");
const region = document.querySelector("#region");
const dob = document.querySelector("#dob");
const signUp = document.querySelector("#sign-up");

const isRequired = value => value === "" ? false : true;
const isEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|
        (".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|
        (([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
const isSecure = (pwd) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{5,})")/;
    return re.test(pwd);
};

const showError = (input, message) => {
    const field = input.parentElement;
    field.classList.remove("success");
    field.classList.add("error");

    const error = field.querySelector("small");
    error.textContent = message;
};

const showSuccess = (input) => {
    const field = input.parentElement;
    field.classList.remove("error");
    field.classList.add("success");

    const error = field.querySelector("small");
    error.textContent("");
};

const checkUsername = () => {
    const unameValue = username.value.trim();
    if (!isRequired(unameValue)) {
        showError(username, "Username cannot be empty");
    }
    else {
        showSuccess(username);
        return true;
    }
    return false;
};

const checkEmail = () => {
    const emailValue = email.value.trim();
    if (!isRequired(emailValue)) {
        showError(email, "Email cannot be empty");
    }
    else if (!isEmail(emailValue)) {
        showError(email, "Email is invalid");
    }
    else {
        showSuccess(email);
        return true;
    }
    return false;
};

const checkPassword = () => {
    const pwdValue = pwd.value.trim();
    if(!isRequired(pwdValue)) {
        showError(pwd, "Password cannot be empty");
    }
    else if (!isSecure(pwdValue)) {
        showError(pwd, "Password must atleast has 5 characters that include 1 lowercase, 1 uppercase, 1 number");
    }
    else {
        showSuccess(pwd);
        return true;
    }
    return false;
};

const checkRePassword = () => {
    const rePwdValue = confirmPwd.value.trim();
    const pwdValue = pwd.value.trim();
    if(!isRequired(rePwdValue)) {
        showError(confirmPwd, "Please confirm your password");
    }
    else if (pwdValue !== rePwdValue) {
        showError(confirmPwd, "Your password does not match");
    }
    else {
        showSuccess(confirmPwd);
        return true;
    }
    return false;
};

const checkRegion = () => {
    const regionValue = region.value.trim();
    if (!isRequired(regionValue)) {
        showError(region, "Region cannot be empty");
    }
    else if (regionValue.toLowerCase() != "indonesia" || regionValue.toLowerCase() != "singapore"){
        showError(region, "Region must be in Indonesia or Singapore")
    }
    else {
        showSuccess(region);
        return true;
    }
    return false;
};

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

signUp.addEventListener("input", debounce(function(e) {
    switch (e.target.id) {
        case "username" :
            checkUsername();
            break;
        case "email" :
            checkEmail();
            break;
        case "password" :
            checkPassword();
            break;
        case "confirm-password" :
            checkRePassword();
            break;
        case "region" :
            checkRegion();
            break;
    }
}));

signUp.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkRePassword();
        isRegionValid = checkRegion();

    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid &&
        isRegionValid;

    // submit to the server if the form is valid
    if (isFormValid) {

    }
});