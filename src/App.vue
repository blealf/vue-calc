<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Calculator from './components/Calculator.vue'
</script>

<template>
  <div class="app">
    <Calculator />
    <!-- <Calculator /> -->
  </div>
</template>

<style>
@import url('https://fontsgoogleapis.com/css2?family=Akaya+Telivigala&display=swap');
html, body {
  margin: 0;
  padding: 0;
  background: #f5f5f5;
}
#app {
  font-family: 'Verdana', sans-serif;
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
  max-height: 100vh;
  min-width: 100vw;
}
.app::before {
  position: absolute;
  content: "";
  width: 600px;
  height: 600px;
  border-radius: 50%;
  top: -300px;
  right: -400px;
  background: #029688;
}
.app::after {
  position: absolute;
  content: "";
  width: 600px;
  height: 600px;
  border-radius: 50%;
  bottom: -400px;
  left: -300px;
  background: #283637;
}
</style>
