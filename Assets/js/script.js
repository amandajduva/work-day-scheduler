// Wrap all code that interacts with the DOM in a call to jQuery.

$(function () {
  // A listener for click events on the save button. This code
  // uses the id in the containing time-block as a key to save the user input in
  // local storage. 
  function textInput() {
    $(".saveBtn").on("click", function() {
      let divEl = $(this).parent().attr('id');
      let description = $(this).siblings('.description').val();
      localStorage.setItem(divEl, description);
    });
  }

  // Code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour.
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

  // Code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements.
  $(".time-block").each(function(i) {
    $("#hour-"+ (i + 9) + " .description").val(localStorage.getItem("hour-" + (i + 9)));
  });

  // Displays the current date in the header of the page.
  let today = dayjs();
  $("#current-day").text(today.format("dddd, MMMM DD, YYYY"));

  // Runs functions.
  setInterval(updateColor, 300000);
  updateColor();
  textInput();
});
