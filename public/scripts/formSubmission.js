$(document).ready(function () {
  $("#target").submit(function (event) {
    jQuery.post("/tweets", $(this).serialize());

    event.preventDefault();
  });
});
