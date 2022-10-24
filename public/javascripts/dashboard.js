$(document).ready(function () {
  var i = 1;
  let fetchpromise = fetch("/online");
  fetchpromise
    .then((response) => {
      return response.json();
    })
    .then((test) => {
      console.log(test.length);
      for (let i = 0; i <= test.length; i++) {
        $("#tab_logic").append('<tr id="addr' + i + '"></tr>');
        $("#addr" + i).html(
          "<td>" +
            test[i].user_id +
            "</td><td><input ID='name" +
            i +
            "' type='text' placeholder='Name' class='form-control input-md' value=" +
            test[i].username +
            " />" +
            "</td><td><input  ID='mail" +
            i +
            "' type='text' placeholder='Mail'  class='form-control input-md' value=" +
            test[i].email +
            ">" +
            "</td><td><input  ID='button" +
            test[i].user_id +
            "' type='button' value='Chat'  class='form-control input-md btn-info'></td>"
        );

        // $("#tab_logic").append('<tr id="addr' + (i + 1) + '"></tr>');
      }
    });

  $("#add_row").click(function () {
    $("#tab_logic").append('<tr id="addr' + i + '"></tr>');
    $("#addr" + i).html(
      "<td>" +
        i +
        "</td><td><input ID='name" +
        i +
        "' type='text' placeholder='Name' class='form-control input-md'  /> </td><td><input  ID='mail" +
        i +
        "' type='text' placeholder='Mail'  class='form-control input-md'></td><td><input  ID='button" +
        i +
        "' type='button' value='Chat'  class='form-control input-md'></td>"
    );

    // $("#tab_logic").append('<tr id="addr' + (i + 1) + '"></tr>');
    i++;
  });
  $("#delete_row").click(function () {
    if (i > 1) {
      $("#addr" + (i - 1)).html("");
      i--;
    }
  });
  // $("#logout").click(function (e) {
  //   fetch("/logout", { method: "POST" });
  //   //   .then(function (response) {
  //   //     if (response.ok) {
  //   //       console.log("click was recorded");
  //   //       return;
  //   //     }
  //   //     throw new Error("Request failed.");
  //   //   })
  //   //   .catch(function (error) {
  //   //     console.log(error);
  //   //   });
  // });
});
