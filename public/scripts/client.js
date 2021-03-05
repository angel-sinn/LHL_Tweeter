/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  // Compose Tweet handler

  $(".write-tweet").on("click", function () {
    $('section.new-tweet').slideToggle();
    $('section.new-tweet textarea').focus();
  })

  // Submit handler

  $("form").on("submit", function (event) {
    event.preventDefault();

    // Form validation

    const maxTextLength = 140;
    const textLength = $("#tweet-text").val().length;

    if (textLength > maxTextLength) {
      $(".new-tweet p.exceeds-text").text(
        "⛔️ Maximum character limit exceeded! Please post again."
      );
      $(".new-tweet p.exceeds-text").slideDown();
      
    } else if (textLength <= 0) {
      $(".new-tweet p.empty-text").text(
        "⛔️ Tweet must contain at least 1 character! Please post again."
      );
      $(".new-tweet p.empty-text").slideDown();

    } else {
      // Create AJAX POST request to send form data to server

      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize(),
        success: function (data) {
          loadTweets();
          $("#tweet-text").val("");
          $(".counter").text("140");
        },
      });
    }
  });

  const loadTweets = function () {
    // Create AJAX GET request to fetch data from server

    $.ajax({
      url: "/tweets",
      method: "GET",
      success: function (data) {
        renderTweets(data.reverse());
      },
    });
  };

  loadTweets();
});

// Escape function to prevent XSS - returns inner HTML of text node

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Creating HTML of new tweets

const createTweetElement = function (tweet) {
  let $tweet = $(`<article class="tweet">
    <header class="article-tweet">
      <div><img class="tweet-avatar" src=${
        tweet.user.avatars
      } alt="tweet-avatar">
      <span class="tweet-user">${tweet.user.name}</span></div>
      <span class="tweet-user-profile">${tweet.user.handle}</span>
    </header>
    <div class="tweet-body">${escape(tweet.content.text)}</div>
    <footer>
      <span class="tweet-time">${moment(tweet.created_at).fromNow()}</span>
      <span><i class="tweet-icon fas fa-flag"></i> <i class=" tweet-icon fas fa-retweet"></i> <i class="tweet-icon fas fa-heart"></i></span>
    </footer>
  </article>`);

  return $tweet;
};

const renderTweets = function (tweets) {
  $("#tweet-container").empty();
  for (const tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $("#tweet-container").append($tweet);
  }
};
