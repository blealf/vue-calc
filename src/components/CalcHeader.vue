<script setup>
import  { ref , computed } from 'vue'
const theme = ref('light')
const state = ref('calculator')

const isLight = computed(() => 
  theme.value === 'light' ? true : false
)

const changeState = () => {
  state.value = state.value === 'calculator' ? 'converter' : 'calculator'
}
</script>
<template>
  <div class="calc-header">
    <button class="calc-menu">
      <fa icon="bars" />
    </button>
    <div 
      class="chooser" 
      :class="{ highlight: state === 'calculator' }"
      @click="changeState"
    >
      Calculator
    </div>
    <div 
      class="chooser" 
      :class="{ highlight: state === 'converter' }"
      @click="changeState"
    >
      Converter
    </div>
    <button class="theme-switcher">
      <fa v-if="isLight" icon="moon" />
      <fa v-else icon="sun" />
    </button>
  </div>
</template>

<style scoped>
.calc-header{
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 14px;
  margin-top: 5px;
}
.calc-menu, .theme-switcher {
  border: 0 transparent;
  background: transparent;
  cursor: pointer;
}
.calc-menu {
  margin-right: auto;
}
.theme-switcher {
  margin-left: auto;
}
.chooser {
  font-size: 11px;
  border-radius: 15px;
  padding: 2px 10px;
  cursor: pointer;
}
.highlight {
  background: teal;
  color: #fff;
}
</style>
