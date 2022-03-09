<script setup lang="ts">
import Calculator from "./components/Calculator.vue";
import { ref, watch } from "vue";

const theme = ref("light");

watch(theme, () => {
  console.log(theme.value);
  document.documentElement.className = theme.value;
});
</script>

<template>
  <div class="app">
    <Calculator @selected-theme="theme = $event" :theme="theme" />
    <!-- <Calculator /> -->
  </div>
</template>

<style>
@import url("https://fontsgoogleapis.com/css2?family=Akaya+Telivigala&display=swap");

:root {
  --background-color: #f5f5f5;
  --calc-background-color: #00c2c2;
  --font-color: #2f2f2f;
  --symbol-color: #008080;
  --calc-header-color: #008080;
  --shadow-color: rgba(43, 43, 43, 0.3);
}
:root.dark {
  --background-color: #4b4b4b;
  --calc-background-color: #2f2f2f;
  --font-color: #d6d6d6;
  --symbol-color: #00eeee;
  --calc-header-color: #008080;
  --shadow-color: rgba(207, 207, 207, 0.3);
}
* {
  transition: background 0.5s ease-in-out;
}
html,
body {
  margin: 0;
  padding: 0;
  background: var(--background-color);
}
#app {
  font-family: "Verdana", sans-serif;
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
  background: var(--background-color);
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
  right: -300px;
  background: teal;
}
.app::after {
  position: absolute;
  content: "";
  width: 600px;
  height: 600px;
  border-radius: 50%;
  bottom: -700px;
  left: -300px;
  background: #2f2f2f;
}
</style>
