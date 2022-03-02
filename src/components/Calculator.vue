<script setup>
import { ref, watch } from 'vue'
import CalcPad from './CalcPad.vue'
import CalcDisplay from './CalcDisplay.vue'
import CalcHeader from './CalcHeader.vue'
/* eslint-disable-next-line */
const input = ref('0')
const result = ref(0)
watch(input, () => console.log(input))
watch(result, () => console.log(result))
</script>
<template>
  <div class="calc">
    <!-- <Notch /> -->
    <div style="z-index:99;">
      <CalcHeader />
      <CalcDisplay :first-display="input" :second-display="result" />
      <CalcPad @update-value="input = $event" @result-value="result = $event || 0" />
    </div>
  </div>
</template>

<style scoped>
.calc {
  position: relative;
  z-index: 2;
  height: 480px;
  /* background: #2f2f2f; */
  margin: 0 auto;
  overflow: hidden;
  width: 210px;
  padding: 25px 10px;
  border-radius: 25px;
  box-shadow: 1px 1px 25px 5px rgba(43, 43, 43, 0.3);
}
.calc::before {
  position: absolute;
  content: "";
  width: 70%;
  height: 25px;
  background: transparent;
  top: 0;
  left: 15%;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  /* box-shadow: 0 0 0 500px teal; */
  box-shadow: 1px -5px 5px 1px rgba(211, 211, 213, 0.3) inset;
  /* box-shadow: 1px -5px 5px 251px rgba(211, 211, 213); */
  /* -webkit-mask-image: url('.././assets/svg/notch.svg');
  mask-type: white;
  mask-type: alpha; */

}
.calc::after {
  position: absolute;
  content: "";
  width: 40%;
  height: 3px;
  background: #d3d3d5;
  bottom: 4px;
  left: 30%;
  border-radius: 3px;
}
svg {
  width: 300px;
  margin-top: -20px;
  height: 20px;
}
</style>
