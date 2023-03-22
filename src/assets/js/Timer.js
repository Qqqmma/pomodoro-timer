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
        }, 300);
    }

    pause() {
        clearInterval(this.startProcess);
    }

    setTimePastStart() {
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

    setTimeToEnd() {
        let result = 0;

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

let timer = new Timer();

timer.init().start();

setInterval(() => console.log(timer.setTimeToEnd()), 200);
