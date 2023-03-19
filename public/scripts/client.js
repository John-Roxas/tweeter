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

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  tweets.forEach((element) => {
    let newTweet = createTweetElement(element);
    $("#tweets-container").append(newTweet);
  });
};

const createTweetElement = function (tweet) {
  let $tweet = $(`
  <article class="tweet">
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
            <p class="tweets-article-footerleft-timesince">${tweet.created_at}</h5>
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

renderTweets(data);
