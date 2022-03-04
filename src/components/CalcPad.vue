<script setup>
import { 
  ref, 
  reactive, 
  defineEmits,
  onMounted 
} from 'vue'
import { padVal } from './padVal'

const emits = defineEmits(['update-value'])

const padItems = reactive(padVal)
const sendableKeys = padItems.map((i) => String(i.item))
const keypads = ref([])
const sendInput = (val) => {
  emits('update-value', val)
}

const sendKeyboardInput = (e) => {
  if (sendableKeys.indexOf(e.key) !== -1) {
    console.log(e.key)
    emits('update-value', e.key)
  }
}

onMounted(() => {
  window.addEventListener('keydown', sendKeyboardInput)
})


</script>
<template>
  <div class="calc-light">
    <button
      v-for="val in padItems"
      :key="val.item"
      ref="keypads"
      class="pads"
      :class="{ symbols: val.symbol}"
      @click="sendInput(val.item)"
    >
      <fa v-if="val.icon" :icon="val.iconName" />
      {{ !val.icon ? val.item : null }}
    </button>
  </div>
</template>

<style scoped>
.calc-light{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  align-items: center;
  gap: 5px;
  /* width: 250px; */
  margin: 0 auto;
}
.pads {
  font-family: 'Verdana', sans-serif;
  font-size: 18px;
  border: solid 0 transparent;
  height: 50px;
  width: 100%;
  border-radius: 50%;
  background: none;
  cursor: pointer;
}
.pads:active {
  background: #2f2f2f;
  color: #fff;
}
.symbols {
  color: teal;
}
</style>
