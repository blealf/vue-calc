<script setup>
import { defineProps, toRefs } from "vue";

const props = defineProps({
  inputDisplay: String,
  resultDisplay: Number,
});

const { inputDisplay, resultDisplay } = toRefs(props);
</script>
<template>
  <div class="calc-display">
    <div class="input-display">{{ inputDisplay }}</div>
    <div class="result-display">{{ resultDisplay }}</div>
  </div>
</template>

<style scoped>
.calc-display {
  text-align: right;
  padding: 30px 10px 10px 10px;
}
.input-display {
  height: 50px;
  width: 100%;
  overflow-wrap: break-word;
  overflow-y: scroll;
  color: var(--font-color);
}
.result-display {
  height: 90px;
  width: 100%;
  overflow-wrap: break-word;
  overflow-y: scroll;
  font-size: 35px;
  color: var(--font-color);
}
</style>
