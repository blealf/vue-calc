<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from "vue";

const props = defineProps(["theme"]);

const mode = ref("calculator");
const emits = defineEmits(["selected-theme"]);

// NB: don't necessary need this but will leave for now
const isLight = computed(() => (props.theme === "light" ? true : false));

const changeMode = (modeName: string) => {
  mode.value = modeName;
};

const toggleTheme = () => {
  emits("selected-theme", props.theme === "light" ? "dark" : "light");
};
</script>
<template>
  <div class="calc-header">
    <button class="calc-menu">
      <fa icon="bars" />
    </button>
    <div
      class="chooser"
      :class="{ highlight: mode === 'calculator' }"
      @click="changeMode('calculator')"
    >
      Calculator
    </div>
    <div
      class="chooser"
      :class="{ highlight: mode === 'converter' }"
      @click="changeMode('converter')"
    >
      Converter
    </div>
    <button class="theme-switcher" @click="toggleTheme">
      <fa v-if="isLight" icon="moon" />
      <fa v-else icon="sun" />
    </button>
  </div>
</template>

<style scoped>
.calc-header {
  display: flex;
  justify-content: space-between;
  gap: 5px;
  font-size: 14px;
  margin-top: 5px;
}
.calc-menu,
.theme-switcher {
  border: 0 transparent;
  background: transparent;
  cursor: pointer;
  color: var(--font-color);
}
.calc-menu {
  margin-right: auto;
  cursor: crosshair;
}
.theme-switcher {
  margin-left: auto;
}
.chooser {
  font-size: 11px;
  border-radius: 15px;
  padding: 2px 10px;
  cursor: pointer;
  color: var(--font-color);
}
.highlight {
  background: teal;
  color: #fff;
}
</style>
