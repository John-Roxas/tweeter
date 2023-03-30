/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Data taken from compass page M4W9: Dynamic Tweets
$(document).ready(function () {
  /* 
  The render tweets function will take our array of tweets stored in the data array above and appends them to the 
  .tweets.container div in our html.
  */
  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    $(".tweets-container").empty();
    tweets.forEach((element) => {
      let $newTweet = createTweetElement(element);
      $(".tweets-container").prepend($newTweet);
    });
  };

  // Escape function to prevent malicious text inputs as tweets!
  const escapeFunc = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  /*This function takes a tweet object in a form that matches above as an input and returns a tweet jQuery object
that matches our original html structure for a tweet
*/
  const createTweetElement = function (tweet) {
    let currentTime = Date.now();

    /* timeBetween is calculated by determining the difference between the current time and the time stored in 
    tweet.created_at. It then calculates this difference from unix time to days.
    */
    let timeBetween = Math.floor();

    let $tweet = $(`
      <article class="tweets">
        <header class="tweets-article-header">
              <div class="tweets-article-headerleft">
                <img class ="tweets-article-headerleft-img"src="${
                  tweet.user.avatars
                }">
                <h3 class="tweets-article-headerleft-name">${
                  tweet.user.name
                }</h3>
              </div>
              <div class="tweets-article-headerright">
                <h3 class="tweets-article-headerright-handle">${
                  tweet.user.handle
                }</h3>
              </div>
            </header>
            <div class="tweets-body">
              <p class="tweet-p">${escapeFunc(tweet.content.text)}</p>
            </div>
            <footer class="tweets-article-footer">
              <div class="tweets-article-footerleft">
                <p class="tweets-article-footerleft-timesince">${timeago.format(
                  tweet.created_at
                )}</h5>
              </div>
              <div class="tweets-article-footerright">
                <i class="fa-solid fa-flag tweets-icon-color"></i>
                <i class="fa-solid fa-retweet tweets-icon-color"></i>
                <i class="fa-solid fa-heart tweets-icon-color"></i>
              </div>
            </footer>
      </article>`);
    return $tweet;
  };

  // jQuery function to make a request to /tweets and receive the arry of tweets as JSON.
  const loadTweets = function () {
    $.get("/tweets", function (data) {
      renderTweets(data);
    });
  };

  // Create HTML alert function
  const htmlALERT = function (type) {
    switch (type) {
      case "empty":
        {
          let $errorMsg = $(`
            <div class="errorMsg">
              <p> :( No empty tweets allowed! Try again!</p>
            </div>
          `);
          $(".container").prepend($errorMsg);
        }
        break;
      case "long": {
        let $errorMsg = $(`
            <div class="errorMsg">
              <p> :( You're over the maximum character limit! Make it smaller</p>
            </div>
          `);
        $(".container").prepend($errorMsg);
      }
    }
  };

  // Write a new Tweet link functionality.
  $(".headerRight").click(() => {
    if (!$("#toggleAnim").is(":visible")) {
      $("#toggleAnim").slideDown();
    } else {
      $("#toggleAnim").slideUp();
    }
  });

  // Form submission functionality.
  $("#target").submit(function (event) {
    // Writing a shortcut to the input form so we don't have a lot of unnecessary code.
    let input = $(this).serialize().slice(5);
    if (!input) {
      htmlALERT("empty");
    } else if (input === "%20") {
      htmlALERT("empty");
    } else if (input.length > 140) {
      htmlALERT("long");
    } else {
      jQuery.post("/tweets", $(this).serialize(), () => {
        loadTweets(true);
        $("#tweet-text").val("");
        // By default, the POST function should delete the error message. Turns out nothing gets deleted if it aleady doe snot exist.
        $(".errorMsg").remove();
      });
    }
    event.preventDefault();
  });

  /* This code adds a scroll event listener to the window object, which is triggered every time the user scrolls the page. 
  The code then checks if the scrollY property of the window object is equal to 0. If it is, then the user is at the top of the page
  and the code logs a message to the console. If it's not equal to 0, then the user is no longer at the top of the page and the code logs a different message to the console.
  */

  window.addEventListener("scroll", function () {
    if (window.scrollY === 0) {
      $("#scrollFunction").fadeOut();
    } else {
      $("#scrollFunction").fadeIn();
    }
  });

  // upButton functionality
  $("#upButton").click(() => {
    // Scrolls to position 0,0 in the window. Essentially the top left of the page.
    window.scrollTo(0, 0);
  });

  loadTweets();
  // renderTweets(data);
});
