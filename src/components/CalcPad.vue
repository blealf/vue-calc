<script setup>
import { ref, reactive, defineEmits, watch } from 'vue'
import { padVal } from './padVal'

const emits = defineEmits(['update-value', 'result-value'])

const padItems = reactive(padVal)
const input = reactive([])
const symbols = ['+', '-', '*', '/']
const buffer = ref('0')
const result = ref(0)
const displayValue = ref('')
const clear = ref(false)

watch(displayValue, () => {
  emits('update-value', displayValue.value)
})
watch(result, () => {
  emits('result-value', result.value)
})
watch(input, () => {
  console.log({ input })
  console.log(input.length)
})

const processInput = (value) => {
  if (value === 'AC') { 
    resetInput()
    return
  }
  if (value === '=') { 
    clear.value = true
    calculate()
    return
  }
  if (clear.value === true) resetInput()
  if (value == 'delete-left') {
    if(!buffer.value) {
      input.pop()
    } else {
      buffer.value = buffer.value.slice(0, -1)
      displayValue.value = displayValue.value.substring(0, 
        displayValue.value.length - 1)
      emits('update-value', displayValue.value)
      calculate()
      
    }
    return
  }
  clear.value = false
  if ([1,2,3,4,5,6,7,8,9,0,'+/-','.'].includes(value)) {
    if(value === '+/-') {
      buffer.value = togglePlusMinus(buffer.value)
      return
    }
    if (value === '.') {
      buffer.value = !buffer.value.includes('.')
        ? buffer.value = buffer.value + '.' 
        : null
    }
    buffer.value = !buffer.value
      ? String(value)
      : buffer.value + String(value)
    displayValue.value = displayValue.value + String(value)
    if (input.length > 1) calculate()
  }
  else {
    input.push(Number(buffer.value))
    if (symbols.includes(value)) input.push(value)
    displayValue.value = displayValue.value + value
    if (value === 'percent') {
      useSign(value)
      clear.value = true
    }
    buffer.value = '0'
  }
}

const togglePlusMinus = (current) => {
  const toggle =  current.split('')
  toggle.includes('-')
    ? toggle.shift()
    : toggle.unshift('-')
  return toggle.join()
}

const resetInput = () => {
  buffer.value = ''
  displayValue.value = ''
  input.splice(0, input.length)
  result.value = 0
  emits('update-value', '0')
  emits('result-value', 0)
}

const calculate = () => {
  // if(input.length < 2 && buffer.value === 0) return
  result.value = input[0]
  for(let i = 1; i < input.length - 1; i = i + 2) {
    console.log(input[i+1])
    result.value = useSign(input[i], result.value, input[i+1] || buffer.value)
  }
  emits('result-value', result.value)
}

const useSign = (sign, acc, val) => {
  switch(sign) {
    case '%':
      return acc / 100
    case '/': 
      return acc / val
    case '*': 
      return acc * val
    case '-': 
      return acc - val
    case '+': 
      return acc + val
    default:
  }
}
</script>
<template>
  <div class="calc-light">
    <button
      v-for="val in padItems"
      :key="val.item"
      class="pads"
      :class="{ symbols: val.symbol}"
      @click="processInput(val.item)"
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
