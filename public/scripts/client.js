/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
    
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

  // Submit handler

  $("form").on("submit", function (event) {
    event.preventDefault();

    // Create AJAX POST request to send form data to server

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $(this).serialize(),
    });
  });
});

// Creating HTML of new tweets

const createTweetElement = function (tweet) {
  let $tweet = $(`<article class="tweet">
    <header class="article-tweet">
      <div><img class="tweet-avatar" src=${tweet.user.avatars} alt="tweet-avatar">
      <span class="tweet-user">${tweet.user.name}</span></div>
      <span class="tweet-user-page">${tweet.user.handle}</span>
    </header>
    <div class="tweet-body">${tweet.content.text}</div>
    <footer>
      <span class="tweet-time">${tweet.created_at}</span>
      <span><i class="tweet-icon fas fa-flag"></i> <i class=" tweet-icon fas fa-retweet"></i> <i class="tweet-icon fas fa-heart"></i></span>
    </footer>
  </article>`);

  return $tweet;
};

const renderTweets = function (tweets) {
  for (const tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $("#tweet-container").append($tweet);
  }
};
