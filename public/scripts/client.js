/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Data taken from compass page M4W9: Dynamic Tweets
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

/* 
The render tweets function will take our array of tweets stored in the data array above and appends them to the 
.tweets.container div in our html.
*/
const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  tweets.forEach((element) => {
    console.log("incoming new tweet");
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

$(document).ready(function () {
  renderTweets(data);
});
