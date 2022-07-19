$(document).ready(function() {
  
  $("#tweet-text").on('keyup', function() {
    let textLength = $(this).val().length;
    let charsLeft = 140 - textLength;
    
    let counterVal = this.parentElement.counter;
    $(counterVal).text(charsLeft);

    // Add class to turn red if count is below 0
    if (charsLeft < 0) {
      $(counterVal).addClass("turnRed");
    } else {
      $(counterVal).removeClass("turnRed");
    }
  });
});