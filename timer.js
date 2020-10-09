class Timer {

  start(timer) {
    console.log("Timer started: ", timer);
    let seconds = timer * 60;

    let interval = setInterval(function () {
      seconds = seconds - 1;
      //getRemainingTime(seconds);
      let minutes = parseInt(seconds / 60);
      let remainSec = seconds % 60;
      //console.log(seconds);
      //console.log("Minutes = " + minutes)
      console.log("Minutes = " + minutes + " Seconds = " + remainSec );

      if (seconds <= 0) {
        console.log('Timer stopped');
        clearTimeout(interval)
      }

    }, 1000);
  }

  getRemainingTime(seconds) {

  }
}

module.exports = Timer
