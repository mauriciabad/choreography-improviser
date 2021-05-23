<template>
  <div class="metronome">
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

  &__beat {
    font-size: max(1em, 25vmin);
    display: block;
    font-weight: 100;
  }
}
</style>
