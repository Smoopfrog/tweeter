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
  
  $('.tweetToggle').on('click', () => {
    if ($('.new-tweet').css('display') == 'none') {
      $('.new-tweet').slideDown('slow');
      return;
    }
    $('.new-tweet').slideUp('slow');
      return;
  })

  $('.tweet-form').on('submit', function(event) {
    const charLimit = this.counter.value;
    const values = $(this).serialize();
    let valid = true;

    event.preventDefault();

    // check if textbox is empty
    if (charLimit == 140) {
      $(".error").empty();
      const errorMsg = $('<div>').text(" Your tweet is empty! ");
      //adds icon to errorMsg
      errorMsg.prepend('<i class="fa-solid fa-circle-exclamation"></i>');
      errorMsg.append('<i class="fa-solid fa-circle-exclamation"></i>');

      // Append and slidedown errorMsg
      $('.error').append(errorMsg).slideDown('slow');
      
      // Clear error in 3 seconds
      setTimeout(() => {
        $(".error").empty();
      }, 3000);

      return
    }

    // Check if over character limit
    if (charLimit <= 0) {
      $(".error").empty();
      const errorMsg = $('<div>').text(" Your tweet is too long! ");
      //adds icon to errorMsg
      errorMsg.prepend('<i class="fa-solid fa-circle-exclamation"></i>');
      errorMsg.append('<i class="fa-solid fa-circle-exclamation"></i>');

      // Append and slidedown errorMsg
      $('.error').append(errorMsg).slideDown('slow');

      // Clear error in 3 seconds
      setTimeout(() => {
        $(".error").empty();
      }, 3000);

      return
    }

    // check values for null
    if (values === null) {
      $(".error").empty();
      const errorMsg = $('<div>').text(" Null value ");
      //adds icon to errorMsg
      errorMsg.prepend('<i class="fa-solid fa-circle-exclamation"></i>');
      errorMsg.append('<i class="fa-solid fa-circle-exclamation"></i>');

      // Append and slidedown errorMsg
      $('.error').append(errorMsg).slideDown('slow');

      // Clear error in 3 seconds
      setTimeout(() => {
        $(".error").empty();
      }, 3000);

      return
    }


    // posts values to /tweets
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: values,
      success: () => {
        loadTweet();
      }
    });
  });
});