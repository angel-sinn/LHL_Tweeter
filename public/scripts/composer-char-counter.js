$(document).ready(function () {
  // Implementing character counter

  $("textarea").keyup(function () {
    let remaining = 140 - $(this).val().length;
    $(".counter").text(remaining);

    if (remaining < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "");
      $(".new-tweet p.exceeds-text").slideUp();
      $(".new-tweet p.empty-text").slideUp();
    }
  });

  // Implementing scroll to top button

  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $(".to-top-button").show();
    } else {
      $(".to-top-button").hide();
    }
  });

  $(".to-top-button").click(function() {
    $('section.new-tweet').slideDown("fast");
    $('section.new-tweet textarea').focus();
  })
});
