// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  function textInput() {
    $(".saveBtn").on("click", function() {
      let divEl = $(this).parent().attr('id');
      let description = $(this).siblings('.description').val();
      localStorage.setItem(divEl, description);
    });
  }

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  let currentHour = dayjs().hour();

  function updateColor() {
    $(".time-block").each(function(){
      let divEl = parseInt($(this).attr("id").split("-")[1]);
      console.log(divEl);
      if (divEl === currentHour) {
        $(this).removeClass("past");
        $(this).removeClass("future");
        $(this).addClass("present");
      } else if (divEl < currentHour) {
        $(this).removeClass("present");
        $(this).removeClass("future");
        $(this).addClass("past");
      } else if (divEl > currentHour) {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
    })
  };

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  $(".time-block").each(function(i) {
    $("#hour-"+ (i + 9) + " .description").val(localStorage.getItem("hour-" + (i + 9)));
  });

  // TODO: Add code to display the current date in the header of the page.
  let today = dayjs();
  $("#current-day").text(today.format("dddd, MMMM DD, YYYY"));

  setInterval(updateColor, 300000);
  updateColor();
  textInput();
});
