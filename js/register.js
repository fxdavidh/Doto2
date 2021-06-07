const isRequired = (value) => (value == "" ? false : true);

const isEmail = (value) => {
  var atSymbol = value.indexOf("@");
  if (atSymbol < 1) return false;

  var dot = value.indexOf(".");
  if (dot <= atSymbol + 2) return false;

  if (dot === value.length - 1) return false;

  return true;
};

const isSecure = (value) => {
  if (value.length < 5) return false;
  if (value.search(/[a-z]/) < 0) return false;
  if (value.search(/[A-Z]/) < 0) return false;
  if (value.search(/[0-9]/) < 0) return false;

  return true;
};

function validate() {
  var name = document.forms["register"]["username"].value;
  var email = document.forms["register"]["email"].value;
  var password = document.forms["register"]["password"].value;
  var repassword = document.forms["register"]["confirm-password"].value;
  var region = document.forms["register"]["region"].value;
  var dob = document.forms["register"]["dob"].value;

  var isUsernameValid,
    isEmailValid,
    isPasswordValid,
    isConfirmPasswordValid,
    isRegionValid,
    isDobValid = null;

  if (!isRequired(name)) {
    document.getElementById("error-username").innerHTML =
      "Your Name Cannot Be Empty";
    isUsernameValid = false;
  } else {
    document.getElementById("error-username").innerHTML = "";
    isUsernameValid = true;
  }

  if (!isRequired(email)) {
    document.getElementById("error-email").innerHTML =
      "Your Email Cannot Be Empty";
    isEmailValid = false;
  } else if (!isEmail(email)) {
    document.getElementById("error-email").innerHTML = "Wrong Email Format";
    isEmailValid = false;
  } else {
    document.getElementById("error-email").innerHTML = "";
    isEmailValid = true;
  }

  if (!isRequired(password)) {
    document.getElementById("error-password").innerHTML =
      "Your Password Cannot Be Empty";
    isPasswordValid = false;
  } else if (!isSecure(password)) {
    document.getElementById("error-password").innerHTML =
      "Password must atleast has 5 characters that include 1 lowercase, 1 uppercase, 1 number";
    isPasswordValid = false;
  } else {
    document.getElementById("error-password").innerHTML = "";
    isPasswordValid = true;
  }

  if (!isRequired(repassword)) {
    document.getElementById("error-repassword").innerHTML =
      "Please Confirm Your Password";
    isConfirmPasswordValid = false;
  } else if (repassword !== password) {
    document.getElementById("error-repassword").innerHTML =
      "Your Password doesn't match";
    isConfirmPasswordValid = false;
  } else {
    document.getElementById("error-repassword").innerHTML = "";
    isConfirmPasswordValid = true;
  }

  if (!isRequired(region)) {
    document.getElementById("error-region").innerHTML =
      "Your Region Cannot Be Empty";
    isRegionValid = false;
  } else if (region !== "Indonesia" || region !== "Singapore") {
    document.getElementById("error-region").innerHTML =
      "Your Region Can Only Be Indonesia or Singapore";
    isRegionValid = false;
  } else {
    document.getElementById("error-region").innerHTML = "";
    isRegionValid = true;
  }

  if (!isRequired(dob)) {
    document.getElementById("error-dob").innerHTML =
      "Your Date-of-Birth Cannot Be Empty";
    isDobValid = false;
  } else {
    document.getElementById("error-dob").innerHTML = "";
    isDobValid = true;
  }

  if (
    isUsernameValid == true &&
    isEmailValid == true &&
    isPasswordValid == true &&
    isConfirmPasswordValid == true &&
    isRegionValid == true &&
    isDobValid == true
  )
    return true;
  else return false;
}
