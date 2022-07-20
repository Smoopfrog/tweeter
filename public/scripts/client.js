const testTweet = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
};

const createTweetElement = testTweet => {
  console.log("Original Tweet obj:", testTweet);

  const tweetTemplate = `
  <article class="tweet">
    <header>
      <div class="iconName">
        <img src="https://i.imgur.com/73hZDYK.png">
      <div>Name</div>
      </div>
      <div id="tweeterHandle"> @tweeterhandle</div>
    </header>
    <p>Example Tweeter Text</p>
    <footer>
      <div>post date</div>
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


$(() => {
  
  createTweetElement(testTweet);

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

