$(document).ready(function() {

var workBtn = $("#work"),
    startBtn = $("#start"),
    resetBtn = $("#reset"),
    minusBtn = $("#minus_btn"),
    plusBtn = $("#plus_btn"),
    title = $("title");
    time = $("#pomodoro"),
    timeText = "",
    workTime = 25,
    breakTime = 5,
    minutes = workTime,
    seconds = 0,
    timerID = null;
   

function workMode(mins) {
  mins = mins || 25; // Присвоение значение по умолчанию, если аргумент не передан
  workBtn.text("Work");
  minutes = mins;
  seconds = 0;
  showTime();
  startBtn.text("Start");
}

function breakMode(mins) {
  mins = mins || 5; // Присвоение значение по умолчанию, если аргумент не передан
  workBtn.text("Break");
  minutes = mins;
  seconds = 0;
  showTime();
  startBtn.text("Start");
}

function stopTimer() {
  if (timerID != null) {
    clearInterval(timerID);
    timerID = null;
  }
}

workBtn.click(function() {
  stopTimer();

  if (workBtn.text() == "Work") {
    breakMode(breakTime);
  } else {
    workMode(workTime);
  }

});

startBtn.click(function() {
  if (startBtn.text() == "Start") {
    startBtn.text("Pause");
    timerID = setInterval(timer, 1000);
  } else {
    stopTimer();
    showTime();
    startBtn.text("Start");
  }
});

resetBtn.click(function() {
  stopTimer();

  if (workBtn.text() == "Work") {
    workMode();
  } else {
    breakMode();
  }

});

minusBtn.click(function() {
  stopTimer();

  if (workBtn.text() == "Work") {
    if (workTime > 0) {
      if (seconds == 0) {
        workTime--;
        minutes = workTime;
      } 
    }
  } else {
    if (breakTime > 0) {
      if (seconds == 0) {
        breakTime--;
        minutes = breakTime;
      }
    }
  }

  seconds = 0;
  showTime();
  
});

plusBtn.click(function() {
  stopTimer();

  seconds = 0;
  if (workBtn.text() == "Work") {
    workTime++;
    minutes = workTime;
  } else {
    breakTime++;
    minutes = breakTime;
  }
  showTime();
});

function timer() {
  if (minutes > 0 || seconds > 0) {
    if (seconds != 0) {
      seconds--;
    } else {
      minutes--;
      seconds = 59;
    }
  } else {

    alert(workBtn.text() + " finished!");

    if (workBtn.text() == "Work") {
      breakMode(breakTime);
    } else {
      workMode(workTime);
    }

    startBtn.text("Pause");
    
  }
  showTime();
}

function showTime() {
  if (seconds < 10 && minutes < 10) {
    timeText = "0" + minutes + ":" + "0" + seconds;
  } else if (seconds < 10) {
    timeText = minutes + ":" + "0" + seconds;
  } else if (minutes < 10) {
    timeText = "0" + minutes + ":" + seconds;
  } else {
    timeText = minutes + ":" + seconds;
  }

  time.text(timeText);

  if (timerID != null) {
    title.text("(" + timeText + ") Pomodoro Timer");
  } else {
    title.text("Pomodoro Timer");
  }
}

});