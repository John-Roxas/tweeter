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
    let tweetsReversed = tweets.reverse();

    tweetsReversed.forEach((element) => {
      let $newTweet = createTweetElement(element);
      $(".tweets-container").append($newTweet);
    });
  };

  /*This function takes a tweet object in a form that matches above as an input and returns a tweet jQuery object
that matches our original html structure for a tweet
*/
  const createTweetElement = function (tweet) {
    let currentTime = Date.now();

    /* timeBetween is calculated by determining the difference between the current time and the time stored in 
  tweet.created_at. It then calculates this difference from unix time to days.
  */
    let timeBetween = Math.floor(
      (currentTime - tweet.created_at) / 1000 / 60 / 60 / 24
    );

    let $tweet = $(`
      <article class="tweets">
        <header class="tweets-article-header">
              <div class="tweets-article-headerleft">
                <img class ="tweets-article-headerleft-img"src="${tweet.user.avatars}">
                <h3 class="tweets-article-headerleft-name">${tweet.user.name}</h3>
              </div>
              <div class="tweets-article-headerright">
                <h3 class="tweets-article-headerright-handle">${tweet.user.handle}</h3>
              </div>
            </header>
            <div class="tweets-body">
              <p class="tweet-p">${tweet.content.text}</p>
            </div>
            <footer class="tweets-article-footer">
              <div class="tweets-article-footerleft">
                <p class="tweets-article-footerleft-timesince">${timeBetween} Days Ago</h5>
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
  const loadTweets = function (newTweet) {
    if (newTweet === true) {
      $.get("/tweets", function (data) {
        $(".tweets-container").empty();
        renderTweets(data);
      });
    } else {
      $.get("/tweets", function (data) {
        renderTweets(data);
      });
    }
  };

  // Form submission functionality.

  $("#target").submit(function (event) {
    // Writing a shortcut to the input form so we don't have a lot of unnecessary code.
    let input = $(this).serialize().slice(5);
    if (!input) {
      alert("Write something in the textbox! Cannot tweet an empty message!");
    } else if (input === "%20") {
      alert("Write something in the textbox! Cannot tweet an empty message!");
    } else if (input.length > 140) {
      alert("Tweet is too long! Consider cutting down!");
    } else {
      jQuery.post("/tweets", $(this).serialize(), () => {
        loadTweets(true);
        $("#tweet-text").val("");
      });
    }

    event.preventDefault();
  });
  loadTweets();
  // renderTweets(data);
});
