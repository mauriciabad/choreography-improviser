<template>
  <div class="metronome">
    <div class="metronome__ring"></div>
    <span class="metronome__beat">{{ beatNumber }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    beatNumber: Number,
  },
})
</script>

<style scoped lang="scss">
.metronome {
  height: 100vmin;
  width: 100vmin;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: max(1em, 25vmin);

  &__beat {
    display: block;
    font-weight: 100;
  }

  &__ring {
    border: solid 0.02em;
    position: absolute;
    height: 2em;
    width: 2em;
    border-radius: 100%;
  }
}
</style>
