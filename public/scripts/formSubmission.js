$(document).ready(function () {
  $("#target").submit(function (event) {
    // Writing a shortcut to the input form so we don't have a lot of unnecessary code.
    let input = $(this).serialize().slice(5);
    console.log(input);
    if (!input) {
      alert("Write something in the textbox! Cannot tweet an empty message!");
    } else {
      jQuery.post("/tweets", $(this).serialize());
    }

    event.preventDefault();
  });
});
