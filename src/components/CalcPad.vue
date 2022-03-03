<script setup>
import { ref, reactive, defineEmits, watch } from 'vue'
import { padVal } from './padVal'

const emits = defineEmits(['update-value', 'result-value'])

const padItems = reactive(padVal)
const input = reactive([])
const symbols = ['+', '-', '*', '/']
const buffer = ref('')
const result = ref(0)
const displayValue = ref('')
const clear = ref(false)

watch(displayValue, () => {
  emits('update-value', displayValue.value)
})
watch(result, () => {
  emits('result-value', 
    String(result.value).length > 8 
      ? result.value.toPrecision(3)
      : result.value
  )
})
watch(buffer, () => {
  displayValue.value = input.join().replace(/,/g, '') + buffer.value
  console.log({ buffer: buffer.value })
})
watch(input, () => {
  displayValue.value = input.join().replace(/,/g, '') + buffer.value
  console.log(input)
})

const processInput = (value) => {
  if (value === 'AC') { 
    resetInput()
    return
  }
  if (value === '=') { 
    // clear.value = true
    calculate()
    let val = result.value
    resetInput()
    buffer.value = String(val)
    result.value = val
    emits('result-value', result.value)
    return
  }
  if (clear.value === true) resetInput()
  if (value == 'delete-left') {
    if(!buffer.value && input.length < 1) return
    if(!buffer.value) {
      if(input[input.length - 1].length > 1) {
        let temp = input[input.length - 1]
        input.pop()
        buffer.value = temp
        buffer.value = buffer.value.slice(0, -1)
        input.push(temp.substring(0, temp.length - 1))
      } else {
        input.pop()
        let temp = input[input.length - 1]
        input.pop()
        buffer.value = temp
      }
    } else {
      buffer.value = buffer.value.slice(0, -1)
    }
    calculate()
    return
  }
  clear.value = false
  if ([1,2,3,4,5,6,7,8,9,0,'+/-','.','%'].includes(value)) {
    if(buffer.value === '' && String(input[input.length - 1]).includes('%')) return
    if (value === '%') {
      if (!buffer.value || buffer.value.includes(value)) return
      input.push(buffer.value + value)
      result.value = input.length === 0 && result.value === 0 
      ? calculatePercent(input[input.length - 1])
      : result.value
      calculate()
      emits('result-value', result.value)
      buffer.value = ''
      return
    }
    if (value === '.') {
      if (buffer.value.includes(value)) return
      buffer.value = buffer.value + '.'
      return
    }
    if(value === '+/-') {
      buffer.value = togglePlusMinus(buffer.value)
      calculate()
      return
    }
    buffer.value = !buffer.value
      ? String(value)
      : buffer.value + String(value)
    if (input.length > 1) calculate()
  }
  else {
    if (buffer.value !== '') {
      input.push(buffer.value)
      buffer.value = ''
    }
    if (symbols.includes(input[input.length - 1])) {
      input.pop(value)
      input.push(value)
      return
    }
    if (symbols.includes(value)) 
      input.push(value)
  }
}

const togglePlusMinus = (current) => {
  let toggle =  current
  if (current.includes('-')) {
    toggle = current.substring(1, current.length)
  } else {
    toggle = '-' + current
  }
  console.log(toggle)
  return toggle
}

const resetInput = () => {
  buffer.value = ''
  displayValue.value = ''
  input.splice(0, input.length)
  result.value = 0
  emits('update-value', '')
  emits('result-value', 0)
}

const calculate = () => {
  result.value = calculatePercent(input[0])
  for(let i = 1; i < input.length; i = i + 2) {
    result.value = useSign(
      input[i], 
      result.value, 
      input[i+1] !== undefined 
        ? calculatePercent(input[i+1])
        : calculatePercent(buffer.value)
    )
  }
  emits('result-value', result.value)
}

const calculatePercent = (value) => {
  return value?.includes('%')
    ? useSign('%', Number(value.substring(0,value.length-1)))
    : Number(value)
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
