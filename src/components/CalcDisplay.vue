<script setup>
import { defineProps, toRefs } from 'vue'

const props = defineProps({
  firstDisplay: String,
  secondDisplay: Number
})

const { firstDisplay, secondDisplay } = toRefs(props)

</script>
<template>
  <div class="calc-display">
    <div class="input-display">{{ firstDisplay }}</div>
    <div class="result-display">{{ secondDisplay }}</div>
  </div>
</template>

<style scoped>
.calc-display{
  text-align: right;
  padding: 40px 10px;
}
.input-display {
  min-height: 30px;
  width: 100%;
  overflow-wrap: break-word;
  color: #2f2f2f;
  border: 1px solid red;
}
.result-display {
  min-height: 60px;
  width: 100%;
  font-size: 40px;
  border: 1px solid green;
}
</style>
