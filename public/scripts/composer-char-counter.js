$(document).ready(function () {
  $("textarea").keyup(function () {
    let remaining = 140 - $(this).val().length;
    $(".counter").text(remaining);

    if (remaining < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "");
    }
  });
});
