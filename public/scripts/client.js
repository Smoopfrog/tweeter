const safety = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = tweet => {
  // set date and timeago variables
  const date = new Date(tweet.created_at);
  const tweetAge = timeago.format(date);
  const content = `${safety(tweet.content.text)}`

  // create the tweetTemplate
  const tweetTemplate = `
  <article class="tweet">
    <header>
      <div class="iconName">
        <img src="${tweet.user.avatars}">
      <div>${tweet.user.name}</div>
      </div>
      <div id="tweeterHandle">${tweet.user.handle}</div>
    </header>
    <p>
    ${content}
    </p>
    <footer>
      <div>${tweetAge}</div>
      <div class="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-heart"></i>
        <i class="fa-solid fa-retweet"></i>            
      </div>
    </footer>
  </article>
  `;

  //Append tweetTemplate
  $("#tweetFeed").append(tweetTemplate);
};

const renderTweets = tweets => {
  // loops through tweets
  tweets.forEach(tweet => {
  // calls createTweetElement for each tweet
    createTweetElement(tweet);
  });
};

const loadTweet = () => {
  $('#tweetFeed').empty();

  $.ajax({
    method: 'GET',
    url: '/tweets',
    success: (responseJSON) => {
      renderTweets(responseJSON);
    }
  });
};

$(() => {
  loadTweet();

  $('.tweet-form').on('submit', function(event) {
    const charLimit = this.counter.value;
    const values = $(this).serialize();
    let valid = true;

    event.preventDefault();

    // Check if over character limit
    if (charLimit <= 0) {
      valid = false;
      alert("You are over the character limit!");
    }

    // check if textbox is empty
    if (charLimit == 140) {
      valid = false;
      alert("Tweet empty!");
    }

    // check values for null
    if (values === null) {
      valid = false;
      alert("You are over the character limit");
    }

    // posts values to /tweets
    if (valid) {
      $.ajax({
        method: 'POST',
        url:'/tweets',
        data: values,
        success: () => {
          loadTweet();
        }
      });
    }
  });
});

