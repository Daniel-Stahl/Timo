class Timer {
  start(timer) {
    console.log("Timer started: ", timer);
    seconds = timer * 60;

    let interval = setInterval(function () {
      //Get remaining time
      seconds = seconds - 1;
      //Update timer for user
      console.log(seconds);

      if (seconds <= 0) {
        console.log('Timer stopped');
        clearTimeout(interval)
      }

    }, 1000);


  }

  stop() {

  }

  pomodoro(duration, breakTime) {
    pomodoroTime = { total: duration * 60, minutes: duration, seconds: 0, breakTime: breakTime };

    start(pomodoro);

  }

  updateTimer(update) {
    const { remainingTime } = update;

  }

  getRemainingTime() {

  }

}

module.exports = Timer
