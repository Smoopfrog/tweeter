const safety = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = tweet => {
  // set date and timeago variables
  const date = new Date(tweet.created_at);
  const tweetAge = timeago.format(date);
  const content = `${safety(tweet.content.text)}`;

  // create the tweetTemplate
  const tweetTemplate = `
  <article class="tweet">
    <header>
      <div class="icon-name">
        <img src="${tweet.user.avatars}">
      <div>${tweet.user.name}</div>
      </div>
      <div id="tweeter-handle">${tweet.user.handle}</div>
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
  $("#tweet-feed").append(tweetTemplate);
};

const renderTweets = tweets => {
  // sorts tweets from newest to oldest
  tweets.sort((a, b) => {
    return b.created_at - a.created_at;
  })

  // loops through tweets
  tweets.forEach(tweet => {
  // calls createTweetElement for each tweet
    createTweetElement(tweet);
  });
};

const loadTweet = () => {
  $('#tweet-feed').empty();

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
  
  // function for scroll-up button
  $(window).scroll(() => {
    if (window.scrollY !== 0) {
      $('#scroll-up').show();
      return;
    }
    $('#scroll-up').hide();
    return;
  })

  $('#scroll-up').click(() => {
    scrollTo(0, 0);
  });

  // Toggle new tweet box
  $('.tweet-toggle').on('click', () => {
    if ($('.new-tweet').css('display') == 'none') {
      $('.new-tweet').slideDown('slow');
      $("#tweet-text").focus();
      return;
    }
    $('.new-tweet').slideUp('slow');
    return;
  });

  // submit a new tweet
  $('.tweet-form').on('submit', function(event) {
    const charLimit = this.counter.value;
    const values = $(this).serialize();

    // clear error msg
    $(".error").empty();

    // prevent refresh
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
        $('.error').slideUp('slow');
      }, 3000);

      return;
    }

    // Check if over character limit
    if (charLimit < 0) {
      $(".error").empty();
      const errorMsg = $('<div>').text(" Your tweet is too long! ");
      //adds icon to errorMsg
      errorMsg.prepend('<i class="fa-solid fa-circle-exclamation"></i>');
      errorMsg.append('<i class="fa-solid fa-circle-exclamation"></i>');

      // Append and slidedown errorMsg
      $('.error').append(errorMsg).slideDown('slow');

      // Clear error in 3 seconds
      setTimeout(() => {
        $('.error').slideUp('slow');
      }, 3000);

      return;
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
        $('.error').slideUp('slow');
      }, 3000);

      return;
    }
    
    // posts values to /tweets
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: values,
      success: () => {
        loadTweet();
        $('#tweet-text').val('');
        $('.counter').val(140);

      }
    });
  });
});