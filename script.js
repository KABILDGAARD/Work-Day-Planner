var $currentDay = $("#currentDay");
var $currentTime = $("#currentTime")
var $timeBlocks = $(".time-block");
var $scheduleArea = $(".schedule");

var toDoItems = [];
var currentTime = moment().format('LT'); 
var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");


function initSchedule(){

  $timeBlocks.each(function(){
    var $thisBlock = $(this);
    var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

    var todoObj = {
      hour: thisBlockHr,
      text: "",
    }

    toDoItems.push(todoObj);
    clearSchedule();
  });

  localStorage.setItem("todos", JSON.stringify(toDoItems));
}

function setUpTimeBlocks(){
    $timeBlocks.each(function(){
      var $thisBlock = $(this);
      var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

      if (thisBlockHr == currentHour) {
        $thisBlock.addClass("present").removeClass("past future");
      }
      if (thisBlockHr < currentHour) {
        $thisBlock.addClass("past").removeClass("present future");
      }
      if (thisBlockHr > currentHour) {
        $thisBlock.addClass("future").removeClass("past present");
      }
    });
}

function clearSchedule() {
    $('#clear-button').on('click', function() {
      scheduleObj = {};
      scheduleArr.length = 0;
      scheduleObj['date'] = date;
      scheduleArr.push(scheduleObj);

      localStorage.removeItem(date);
      $('.input-area').val('');

      localStorage.setItem(date, JSON.stringify(scheduleArr));
    });
  }

function renderSchedule(){
  
  toDoItems = localStorage.getItem("todos");
  toDoItems = JSON.parse(toDoItems);

  for (var i = 0; i < toDoItems.length; i++){
    var itemHour = toDoItems[i].hour;
    var itemText = toDoItems[i].text; 
   
    $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
  }

}

function saveIcon(){

  var hourToUpdate = $(this).parent().attr("data-hour");
  var itemToAdd = (($(this).parent()).children("textarea")).val();

  for (var j = 0; j < toDoItems.length; j++){
    if (toDoItems[j].hour == hourToUpdate){
      toDoItems[j].text = itemToAdd;
    }
  }
  localStorage.setItem("todos", JSON.stringify(toDoItems));
  renderSchedule();
}

$(document).ready(function(){

  setUpTimeBlocks();

  if(!localStorage.getItem("todos")){
    initSchedule();
  }

  $currentDay.text(currentDate);

  $currentTime.text(currentTime);

  renderSchedule();

  $scheduleArea.on("click", "button", saveIcon);
});