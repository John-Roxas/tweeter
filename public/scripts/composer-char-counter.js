// This runs a callback when the DOM is ready to be manipulated with jQuery.
$(document).ready(function () {
  // This event handler will run everytime the focus is on our text box and keys are pressed on a keyboard.
  $("#tweet-text").on("input", function () {
    // Declaring a variable that will represent the length of the string typed into textbox #tweet-text
    let newValue = $(this).val().length;
    // This variable will be needed for the colour change conditional for the counter!
    const counter = $(this).parent().find(".counter");

    counter.val(140 - newValue);

    // Colour changer conditional. Happens after the value of counter gets updated above.
    if (counter.val() < 0) {
      counter.css("color", "darkred");
    } else {
      counter.css("color", "#917017");
    }
  });
  // --- our code goes here ---
});
