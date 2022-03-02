<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Calculator from './components/Calculator.vue'
</script>

<template>
  <div class="app">
    <Calculator />
    <Calculator />
  </div>
</template>

<style>
@import url('https://fontsgoogleapis.com/css2?family=Akaya+Telivigala&display=swap');
html, body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Akaya Telivigala', cursive;
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.app {
  display: flex;
  gap: 10px;
  justify-content: center;
  position: relative;
  padding-top: 60px;
  background: #f5f5f5;
  min-height: 100vh;
}
.app::before {
  position: absolute;
  content: "";
  width: 80vw;
  height: 80vw;
  border-radius: 50%;
  top: -30%;
  right: -30%;
  background: #029688;
}
.app::after {
  position: absolute;
  content: "";
  width: 80vw;
  height: 80vw;
  border-radius: 50%;
  bottom: -30%;
  left: -30%;
  background: #283637;
}
</style>
