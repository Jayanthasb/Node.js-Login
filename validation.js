// Document is ready

$(document).ready(function () {
  // Validate Username
  $("#usercheck").hide();
  let usernameError = true;
  $("#iname").keyup(function () {
    validateUsername();
  });

  function validateUsername() {
    let usernameValue = $("#iname").val();
    if (usernameValue.length == "") {
      $("#usercheck").show();
      usernameError = false;
      return false;
    } else if (usernameValue.length < 3 || usernameValue.length > 10) {
      $("#usercheck").show();
      $("#usercheck").html("**length of username must be between 3 and 10");
      usernameError = false;
      return false;
    } else {
      $("#usercheck").hide();
    }
  }

  // Validate Email
  const email = document.getElementById("iemail");
  email.addEventListener("blur", () => {
    let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
    let s = email.value;
    if (regex.test(s)) {
      email.classList.remove("is-invalid");
      emailError = true;
    } else {
      email.classList.add("is-invalid");
      emailError = false;
    }
  });

  // Validate Password

  let passwordError = true;
  $("#ipassword").keyup(function () {
    let message = validatePassword($("#ipassword").val());
    $("#strengthMessage").html(`<p> ${message}</p>`);
    console.log(message);
  });
  function validatePassword(password) {
    let strength = 0;

    if (password.length < 6) {
      $("#strengthMessage").removeClass();
      $("#strengthMessage").addClass("Short");
      passwordError = false;
      return "Too short";
    }
    if (password.length > 6) strength += 1;
    // If password contains both lower and uppercase characters, increase strength value.
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1;
    // If it has numbers and characters, increase strength value.
    if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/))
      strength += 1;
    // If it has one special character, increase strength value.
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1;
    // If it has two special characters, increase strength value.
    if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/))
      strength += 1;
    // Calculated strength value, we can return messages
    // If value is less than 2
    if (strength < 2) {
      $("#strengthMessage").removeClass();
      $("#strengthMessage").addClass("Weak");
      passwordError = false;
      return "Weak";
    } else if (strength == 2) {
      $("#strengthMessage").removeClass();
      $("#strengthMessage").addClass("Good");

      return "Good";
    } else {
      $("#strengthMessage").removeClass();
      $("#strengthMessage").addClass("Strong");

      return "Strong";
    }
  }

  // Validate  Password Confirmation
  $("#con-passcheck").hide();
  let confirmPasswordError = true;
  $("#iconf-password").keyup(function () {
    validateConfirmPassword();
  });
  function validateConfirmPassword() {
    let confirmPasswordValue = $("#iconf-password").val();
    let passwordValue = $("#ipassword").val();
    if (passwordValue != confirmPasswordValue) {
      $("#con-passcheck").show();
      $("#con-passcheck").html("**Password didn't Match");
      $("#con-passcheck").css("color", "red");
      confirmPasswordError = false;
      return false;
    } else {
      $("#con-passcheck").hide();
    }
  }

  // Submit button
  $("#btn").click(function () {
    validateUsername();
    validatePassword();
    validateConfirmPassword();
    validateEmail();
    if (
      usernameError == true &&
      passwordError == true &&
      confirmPasswordError == true &&
      emailError == true
    ) {
      return true;
    } else {
      return false;
    }
  });
});
