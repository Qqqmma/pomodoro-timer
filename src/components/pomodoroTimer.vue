<template>
  <div class="pomodoroTimer">
    <div class="timer">
      <h1>{{ timerOutput[0] }} : {{ timerOutput[1] }} : {{ timerOutput[2] }}</h1>
      <span >{{ time }}</span>
      <button class="" @click="btnStartOrStop">{{ stopped ? "Start" : "Stop" }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pomodoroTimer',
  data() {
    return {
      timeStart: 0,
      timeNow: 0,
      timeStoped: 0,

      sec: 0,
      min: 0,
      hour: 0,

      intervalVar: 0,
      stopped: true,
    }
  },
  methods: {
    timerStart() {
      this.timeStart = Date.now();

      this.intervalVar = setInterval(() => {
        this.timeNow = Date.now();
        this.sec = this.timeDifference.getSeconds();
        this.min = this.timeDifference.getMinutes();
        this.hour = this.timeDifference.getUTCHours();
      }, 100);

      this.stopped = !this.stopped;
    },
    timerStop() {
      clearTimeout(this.intervalVar);
      this.timeStoped = Date.now();
      this.stopped = !this.stopped;
    }
  },
  computed: {
    btnStartOrStop() {
      return this.stopped ? this.timerStart : this.timerStop;
    },
    timerOutput() {
      return [this.hour, this.min, this.sec].map(item => item.toString().length < 2 ? "0" + item : item);
    },
    timeDifference() {
      return new Date(this.timeNow - this.timeStart);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pomodoroTimer{
  margin: 0 auto;
  border: 2px solid #747474;
}
</style>
