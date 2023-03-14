<template>
  <pomodoroTimer/>
</template>

<script>
import pomodoroTimer from './components/pomodoroTimer.vue'

export default {
  name: 'App',
  components: {
    pomodoroTimer, 
  }
}
</script>

<style>
html{
  background-color: #ffd9d9;
}
</style>
