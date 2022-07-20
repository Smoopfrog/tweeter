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

};


$(() => {
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

