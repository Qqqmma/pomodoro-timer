<template>
  <div class="pomodoroTimer">
    <div class="timer">
      <form class="form">
        <input class="input" type="text" placeholder="Pomidor">
        <input class="input" type="text" placeholder="Break">
        <input class="input" type="text" placeholder="Big Break">
      </form>

      <h1 class="time">{{ time }}</h1>
      <span >{{  }}</span>
      <button class="btn" @click="pomidorStart">{{ stopped ? "Start" : "Stop" }}</button>
    </div>
  </div>
</template>

<script>
class Timer {
    constructor(time = 5) {
        this.time = time * 60;
    }

    timeFormat = 'h:m:s';
    hours;
    mins;
    secs;

    timeCounter = 0;
    timeStart = 0;
    timeStop = 0;
    timePastStart = 0;

    startProcess;
    stopProcess;

    init() {
        this.timeStart = Date.now();
        return this;
    }

    stop() {
        clearInterval(this.stopProcess);
        clearInterval(this.startProcess);
        this.time = 0;
        this.timeCounter = 0;
    }

    start() {
        if (this.timeStart == 0)
            this.init();

        clearInterval(this.stopProcess);

        let timePastStartCopy = 0;

        this.startProcess = setInterval(() => {
            let timeNow = Date.now();

            this.timePastStart = Math.floor((timeNow - this.timeStart) / 1000);
            if (timePastStartCopy != this.timePastStart) {
                this.timeCounter++;
                this.time--;
            }

            if (this.time <= 0) this.stop();

            timePastStartCopy = this.timePastStart;

            console.log(this.getTimePastStart());
        }, 300);
    }

    pause() {
        clearInterval(this.startProcess);
    }

    getTimePastStart() {
        this.hours = Math.floor(this.timeCounter / 60 / 60);
        if (this.hours < 10) this.hours = "0" + this.hours;

        this.mins = Math.floor(this.timeCounter / 60 % 60);
        if (this.mins < 10) this.mins = "0" + this.mins;

        this.secs = Math.floor(this.timeCounter % 60);
        if (this.secs < 10) this.secs = "0" + this.secs;

        let arr = this.timeFormat.split("");
        arr[arr.indexOf("h")] = this.hours;
        arr[arr.indexOf("m")] = this.mins;
        arr[arr.indexOf("s")] = this.secs;
        
        return arr.join("");
    }

    getTimeToEnd() {
        this.hours = Math.floor(this.time / 60 / 60);
        if (this.hours < 10) this.hours = "0" + this.hours;

        this.mins = Math.floor(this.time / 60 % 60);
        if (this.mins < 10) this.mins = "0" + this.mins;

        this.secs = Math.floor(this.time % 60);
        if (this.secs < 10) this.secs = "0" + this.secs;

        let arr = this.timeFormat.split("");
        arr[arr.indexOf("h")] = this.hours;
        arr[arr.indexOf("m")] = this.mins;
        arr[arr.indexOf("s")] = this.secs;

        return arr.join("");
    }
}

export default {
  data() {
    return {
      pomodoroProcess: 0,
      stopped: true,
      time: 0,
    }
  },
  methods: {
    pomidorStart() {
      this.pomodoro.init().start();
      setInterval(function() {
        this.time = this.pomodoro.timeCounter;
      }, 200);
      
    },
    pomidorStop() {
      this.pomodoro.stop();
    },
  },
  computed: {
    pomodoro() {
      return new Timer();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.time{
  font-family: 'DS-Digital Bold', arial;
  font-size: 40px;
}
.form{
  display: flex;
  flex-direction: column;
}
.input{
  max-width: 100px;
  margin: 0 10px 15px;
}
.pomodoroTimer{
  max-width: 400px;
  margin: 0 auto;
  border: 2px solid #747474;
  display: flex;
  justify-content: center;
}
.timer{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn{
  cursor: pointer;
  border: 1px solid #ffffff;
  background-color: #d7ddff;
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 20px;
  margin: 10px 0 30px;
}
</style>
