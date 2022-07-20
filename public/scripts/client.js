const testTweets = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const createTweetElement = testTweet => {
  const date = new Date(testTweet.created_at);

  const tweetTemplate = `
  <article class="tweet">
    <header>
      <div class="iconName">
        <img src="${testTweet.user.avatars}">
      <div>"${testTweet.user.name}"</div>
      </div>
      <div id="tweeterHandle">"${testTweet.user.handle}"</div>
    </header>
    <p>"${testTweet.content.text}"</p>
    <footer>
      <div>"${date}"</div>
      <div class="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-heart"></i>
        <i class="fa-solid fa-retweet"></i>            
      </div>
    </footer>
  </article>
  `;

  $("#tweetFeed").append(tweetTemplate);
  };

const renderTweets = tweets => {
  // loops through tweets
  tweets.forEach(tweet => {  
  // calls createTweetElement for each tweet
    createTweetElement(tweet);  
  });
  
  // takes return value and appends it to the tweets container
}

$(() => {
  
  renderTweets(testTweets);
  // Box shadow on tweet
  $(".tweet").on('mouseover', function() {
    $(".tweet").addClass("shadowBox");
  });

  $(".tweet").on('mouseout', function() {
    $(".tweet").removeClass("shadowBox");
  });

  // Icon color change 
  $(".tweet i").on('mouseover', function(event) {
    event.target.style.color = "orange";
  });
  
  $(".tweet i").on('mouseout', function(event) {
    event.target.style.color = "";
  });

  
});

