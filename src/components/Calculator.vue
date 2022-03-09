<script setup lang="ts">
import { ref, watch, reactive, defineEmits, defineProps } from "vue";
import CalcHeader from "./CalcHeader.vue";
import CalcDisplay from "./CalcDisplay.vue";
import CalcPad from "./CalcPad.vue";

const props = defineProps(["theme"]);

const symbols = ["+", "-", "*", "/"];
const buffer = ref<string>("");
const result = ref<number | any>(0);
const screenResult = ref<number>(0);
const screenInput = ref<string>("");
const inputStack = reactive<any[]>([]);
const emits = defineEmits(["selected-theme"]);

watch(buffer, () => {
  updateScreenInput();
});
watch(result, () => {
  screenResult.value =
    result.value.toString().length > 8
      ? result.value.toPrecision(3)
      : result.value;
  console.log(screenResult);
});

const updateScreenInput = () => {
  screenInput.value =
    inputStack.length > 0
      ? inputStack.join().replace(/,/g, "") + buffer.value
      : buffer.value;
};

const processInputStack = (value: string) => {
  if (value === "AC") {
    resetInputStack();
    return;
  }
  if (value === "=") {
    processEquals();
    return;
  }
  if (value == "delete-left") {
    processDelete();
    return;
  }
  if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "+/-", ".", "%"].includes(value)) {
    processNumerics(value);
  } else {
    processSymbols(value);
  }
};

const processNumerics = (value: string) => {
  if (
    buffer.value === "" &&
    String(inputStack[inputStack.length - 1]).includes("%")
  )
    return;
  switch (value) {
    case "%":
      if (!buffer.value || buffer.value.includes(value)) return;
      inputStack.push(buffer.value + value);
      result.value =
        inputStack.length === 0 && result.value === 0
          ? calculatePercent(inputStack[inputStack.length - 1]) || 0
          : result.value;
      calculate();
      buffer.value = "";
      break;
    case ".":
      buffer.value = !buffer.value.includes(value)
        ? buffer.value + "."
        : buffer.value;
      break;
    case "+/-":
      buffer.value = buffer.value.includes("-")
        ? buffer.value.substring(1, buffer.value.length)
        : "-" + buffer.value;
      calculate();
      break;
    default:
      buffer.value = !buffer.value
        ? String(value)
        : buffer.value + String(value);
      if (inputStack.length > 1) calculate();
  }
};

const processSymbols = (value: string) => {
  if (buffer.value !== "") {
    inputStack.push(buffer.value);
    buffer.value = "";
  }
  if (symbols.includes(inputStack[inputStack.length - 1])) {
    inputStack.pop();
    inputStack.push(value);
  } else if (symbols.includes(value) && inputStack.length > 0)
    inputStack.push(value);
};

const processDelete = () => {
  if (!buffer.value && !inputStack.length) return;
  if (!buffer.value) {
    if (inputStack[inputStack.length - 1].length > 1) {
      buffer.value = inputStack[inputStack.length - 1];
      inputStack.pop();
    } else {
      inputStack.pop();
      buffer.value = inputStack.pop();
    }
  } else {
    buffer.value = buffer.value.slice(0, -1);
  }
  calculate();
};

const processEquals = () => {
  let extract = result.value;
  resetInputStack();
  buffer.value = extract === Infinity ? "" : String(extract);
  result.value = extract;
};

const resetInputStack = () => {
  result.value = 0;
  buffer.value = "";
  screenInput.value = "0";
  inputStack.splice(0, inputStack.length);
};

const calculate = () => {
  result.value = calculatePercent(inputStack[0] || buffer.value) || 0;
  if (inputStack.length === 1) return;
  for (let i = 1; i < inputStack.length; i = i + 2) {
    result.value =
      useSign(
        inputStack[i],
        result.value,
        inputStack[i + 1] !== undefined
          ? calculatePercent(inputStack[i + 1])
          : calculatePercent(buffer.value)
      ) || 0;
  }
};

const calculatePercent = (value: string) => {
  return value?.includes("%")
    ? useSign("%", Number(value.substring(0, value.length - 1)))
    : Number(value);
};

const useSign = (sign: string, acc: number, val: number = 0) => {
  switch (sign) {
    case "%":
      return acc / 100;
    case "/":
      return acc / val;
    case "*":
      return acc * val;
    case "-":
      return acc - val;
    case "+":
      return acc + val;
    default:
  }
};
</script>
<template>
  <div class="calc">
    <div style="z-index: 99">
      <CalcHeader
        @selected-theme="emits('selected-theme', $event)"
        :theme="props.theme"
      />
      <CalcDisplay
        :input-display="screenInput || '0'"
        :result-display="screenResult || 0"
      />
      <CalcPad @update-value="processInputStack($event)" />
    </div>
  </div>
</template>

<style scoped>
.calc {
  position: relative;
  z-index: 2;
  height: 480px;
  background: var(--calc-background-color);
  margin: 0 auto;
  overflow: hidden;
  width: 210px;
  padding: 25px 10px;
  border-radius: 25px;
  box-shadow: 1px 1px 25px 5px var(--shadow-color);
}
.calc::before {
  position: absolute;
  content: "";
  width: 70%;
  height: 15px;
  top: 0;
  left: 15%;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  /* box-shadow: 0 0 0 500px teal; */
  box-shadow: 1px -5px 5px 1px rgba(211, 211, 213, 0.3) inset;
  background: var(--calc-header-color);
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
  background: var(--calc-header-color);
}
svg {
  width: 300px;
  margin-top: -20px;
  height: 20px;
}
</style>
