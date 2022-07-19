$(document).ready(function() {
  
  $("#tweet-text").on('keydown', function() {
    let textLength = $(this).val().length;
    let charsLeft = 140 - textLength;
    // console.log("textLength: ", textLength)
    // console.log("charsLeft: ", charsLeft)
    // console.log("this.parentElement.counter: ", this.parentElement.counter)
    let counterVal = this.parentElement.counter;
    // console.log("counterVal: ", $(counterVal));
    $(counterVal).text(charsLeft);
    // console.log("counterVal.val(): ", $(counterVal).val());

  });
});