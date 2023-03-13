<template>
  <div class="pomodoroTimer">
    <div class="timer">
      <h1>{{ hours }} : {{ min }} : {{ sec }}</h1>
      <span >{{ time }}</span>
      <button class="" @click="timerStart">Старт</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pomodoroTimer',
  data() {
    return {
      startTime: 0,
      nowTime: 0,
      sec: 0,
      min:0,
      hours:0,
    }
  },
  methods: {
    timerStart() {
      this.startTime = Date.now();
      setInterval(() => {
        this.nowTime = Date.now();
        this.sec = Math.floor(((this.nowTime - this.startTime) / 1000) % 60);
        this.min = Math.floor(((this.nowTime - this.startTime) / 1000) / 60) % 60;
        this.hours = Math.floor(((this.nowTime -this.startTime) / 1000) / 3600) % 24;
      }, 100);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pomodoroTimer{
  margin: 0 auto;
  border: 2px solid #ffa9ff;
}
</style>
