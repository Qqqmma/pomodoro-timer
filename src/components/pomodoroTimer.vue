<template>
  <div class="pomodoroTimer">
    <div class="timer">
      <form>
        <input class="input" type="text" placeholder="Pomidor" v-model="pomodoroStats.pomidorTime">
        <input class="input" type="text" placeholder="Time Out" v-model="pomodoroStats.breakTime">
        <input class="input" type="text" placeholder="Big Time Out" v-model="pomodoroStats.bigBreakTime">
      </form>

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
      pomodoroStats: {
        pomidorTime: 1,
        breakTime: 1,
        bigBreakTime: 2,

        pomidorCounter: 8,
      },

      timeStart: 0,
      timeNow: 0,
      timeStoped: 0,

      s: 0,
      m: 0,
      h: 0,

      pomidorInterval: 0,
      stopped: true,

      activArr: [],
    }
  },
  methods: {

    pomidorStart() {
      this.timeStart = Date.now();

      this.intervalVar = setInterval(() => {
        this.timeNow = Date.now();
        this.s = ((this.timeToEndPomidor - this.timeDifference.getSeconds()) % 60);
        this.m = Math.floor((this.timeToEndBreak / 60 % 60) - this.timeDifference.getMinutes());
        this.h = Math.floor((this.timeToEndPomidor / 60 / 60) - this.timeDifference.getUTCHours());
        if (this.s == "00" && this.m == "00" && this.h == "00") clearInterval(this.intervalVar);
      }, 1000);


      this.stopped = !this.stopped;
    },

    breakStart() {
      this.timeStart = Date.now();

      this.intervalVar = setInterval(() => {
        this.timeNow = Date.now();
        this.s = ((this.timeToEndBreak - this.timeDifference.getSeconds()) % 60);
        this.m = Math.floor((this.timeToEndBreak / 60 % 60) - this.timeDifference.getMinutes());
        this.h = Math.floor((this.timeToEndBreak / 60 / 60) - this.timeDifference.getUTCHours());
        if (this.s == "00" && this.m == "00" && this.h == "00") clearInterval(this.intervalVar);
      }, 500);

      this.stopped = !this.stopped;
    },

    bigBreakStart() {
      this.timeStart = Date.now();

      this.intervalVar = setInterval(() => {
        this.timeNow = Date.now();
        this.s = ((this.timeToEndBigBreak - this.timeDifference.getSeconds()) % 60);
        this.m = Math.floor((this.timeToEndBreak / 60 % 60) - this.timeDifference.getMinutes());
        this.h = Math.floor((this.timeToEndBigBreak / 60 / 60) - this.timeDifference.getUTCHours());
        if (this.s == "00" && this.m == "00" && this.h == "00") clearInterval(this.intervalVar);
      }, 500);

      this.stopped = !this.stopped;
    },


    // timerStart() {
    //   this.timeStart = Date.now();

    //   this.intervalVar = setInterval(() => {
    //     this.timeNow = Date.now();
    //     this.s = ((this.timeToEndPomidor - this.timeDifference.getSeconds()) % 60);
    //     this.m = Math.floor((this.timeToEndBreak / 60 % 60) - this.timeDifference.getMinutes());
    //     this.h = Math.floor((this.timeToEndPomidor / 60 / 60) - this.timeDifference.getUTCHours());
    //     if (this.s == "00" && this.m == "00" && this.h == "00") clearInterval(this.intervalVar);
    //   }, 100);

    //   this.stopped = !this.stopped;
    // },

    timerStart() {
      this.activArr = [this.pomidorStart, this.breakStart, this.bigBreakStart];
      for (let i = 0; i < this.activArr.length; i++) {
        this.activArr[i]();
      }
    },

    timerStop() {
      clearTimeout(this.intervalVar);
      this.timeStoped = Date.now();
      this.stopped = !this.stopped;
    }
  },
  computed: {
    timeToEndPomidor() {
      return this.pomodoroStats.pomidorTime * 60;
    },
    timeToEndBreak() {
      return this.pomodoroStats.breakTime * 60;
    },
    timeToEndBigBreak() {
      return this.pomodoroStats.bigBreakTime * 60;
    },

    btnStartOrStop() {
      return this.stopped ? this.timerStart : this.timerStop;
    },
    timerOutput() {
      return [this.h, this.m, this.s].map(item => item.toString().length < 2 ? "0" + item : item);
    },
    timeDifference() {
      return new Date(this.timeNow - this.timeStart);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input{
  max-width: 20px;
  margin: 0 10px;
}
.pomodoroTimer{
  margin: 0 auto;
  border: 2px solid #747474;
}
</style>
