<script setup>
import { ref, reactive, defineEmits, watch } from 'vue'

const padItems = reactive([
  { item: 'AC', iconName: 'AC' },
  { item: 'delete-left', iconName: 'delete-left', icon: true },
  { item: '%', iconName: 'percent', icon: true, symbol: true },
  { item: '/', iconName: 'divide', icon: true, symbol: true },
  { item: 7 },
  { item: 8 },
  { item: 9 },
  { item: '*', iconName: 'xmark', icon: true, symbol: true },
  { item: 4 },
  { item: 5 },
  { item: 6 },
  { item: '-', iconName: 'minus', icon: true, symbol: true },
  { item: 1 },
  { item: 2 },
  { item: 3 },
  { item: '+', iconName: 'plus', icon: true, symbol: true },
  { item: '+/-',  iconName: 'plus-minus', icon: true },
  { item: 0 },
  { item: '.' },
  { item: '=', iconName: 'equals', icon: true, symbol: true }
])
const numberEntered = ref('0')
const sign = reactive([])
const input = reactive([])
const result = ref()
const emits = defineEmits(['update-value', 'result-value'])
const displayValue = ref('')
const clear = ref(false)

watch(displayValue, () => {
  emits('update-value', displayValue.value)
})

const enterNumber = (value) => {
  if (value === 'AC') { 
    resetInput()
    return
  }
  if (value === '=') { 
    clear.value = true
    selectSign('=')
    return
  }
  if (clear.value === true) {
    resetInput()
  }
  if (value == 'delete-left') {
    if(numberEntered.value === 0) {
      input.pop()
    } else {
      numberEntered.value = numberEntered.value.slice(0, -1)
      displayValue.value = displayValue.value.substring(0, 
        displayValue.value.length - 1)
      emits('update-value', displayValue.value)
      calculate()
      
    }
    return
  }
  clear.value = false
  if ([1,2,3,4,5,6,7,8,9,0].includes(value)) {
    numberEntered.value = numberEntered.value === '0'
      ? String(value)
      : numberEntered.value + String(value)
    // console.log(numberEntered.value)
    displayValue.value = displayValue.value + String(value)
    emits('update-value', displayValue.value)
    if (input.length > 0) calculate()
  }
  else {
    input.push(Number(numberEntered.value))
    displayValue.value = displayValue.value + value
    emits('update-value', displayValue.value)
    // result.value = result.value === 0
    //   ? Number(numberEntered.value)
    //   : result.value
    sign.push(value)
    if (value === 'percent') {
      selectSign(value)
      clear.value = true
    }
    numberEntered.value = '0'
  }
}

const resetInput = () => {
  numberEntered.value = '0'
  displayValue.value = ''
  input.splice(0, input.length)
  result.value = null
  emits('update-value', '0')
  emits('result-value', 0)
  // console.log(numberEntered.value)
  // console.log(input.value)
}

const calculate = () => {
  const lastInput = Number(input[input.length - 1])
  const lastSign = sign[sign.length - 1]
  const currentInput = Number(numberEntered.value)
  if(!result.value) {
    selectSign(lastSign, lastInput, currentInput)
  } else {
    selectSign(lastSign, result.value, currentInput)
  }
}

const selectSign = (sign, val1, val2) => {
  switch(sign) {
    case '%':
      result.value = Number(val1) / 100
      break
    case '/': 
      result.value = val1 / val2
      break
    case '*': 
      result.value = val1 * val2
      break
    case '-': 
      result.value = val1 - val2
      break
    case '+': 
      result.value = val1 + val2
      break
    case '=': 
      emits('result-value', result.value)
      break
    default:
  }
  emits('result-value', result.value)
  // console.log(result.value)
}
</script>
<template>
  <div class="calc-light">
    <button
      v-for="val in padItems"
      :key="val.item"
      class="pads"
      :class="{ symbols: val.symbol}"
      @click="enterNumber(val.item)"
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
  font-family: 'Akaya Telivigala', cursive;
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
