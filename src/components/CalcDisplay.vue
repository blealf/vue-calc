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
  padding: 30px 10px 10px 10px;
}
.input-display {
  height: 50px;
  width: 100%;
  overflow-wrap: break-word;
  overflow-y: scroll;
  color: #2f2f2f;
}
.result-display {
  height: 90px;
  width: 100%;
  overflow-wrap: break-word;
  overflow-y: scroll;
  font-size: 35px;
}
</style>
