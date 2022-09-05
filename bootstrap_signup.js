let form = document.querySelector("#form");
form.addEventListener("submit", function (event) {
  let pwd = document.querySelector("#pwd").value;
  let repwd = document.querySelector("#repwd").value;
  if (pwd != repwd || !form.checkValidity()) {
    document.querySelector("#repwd").setCustomValidity("text");
    event.preventDefault();
    event.stopPropagation();
  }

  form.classList.add("was-validated");

  //   form.classList.remove("needs-validation");
  //   form.classList.add("was-validated");

  //   //   form.classList.add("was-validated");
  // }
});

// function passcheck() {
//   let confirmPasswordValue = $("#pwd").val();
//   let passwordValue = $("#repwd").val();
//   if (passwordValue != confirmPasswordValue) {
//     $("#valid_repwd").html("**Password didn't Match");
//     return false;
//   } else {
//     $("#valid_repwd").html("**Passwords are Matching");
//     return true;
//   }
// }
// let pwdresult = passcheck();
// alert(pwdresult);
