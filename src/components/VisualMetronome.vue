<template>
  <div class="metronome">
    <div class="metronome__ring">
      <div
        class="metronome__ball"
        :style="{
          animationDuration: `${animationDuration}ms`,
          animationDelay: `${-beatDuration}ms`,
        }"
      ></div>
    </div>
    <span class="metronome__beat">{{ beatNumber }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    beatNumber: {
      type: Number,
      required: true,
    },
    beatDuration: {
      type: Number,
      required: true,
    },
    totalBeats: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const animationDuration = computed(
      () => props.beatDuration * props.totalBeats
    )

    return { animationDuration }
  },
})
</script>

<style scoped lang="scss">
.metronome {
  $ring-border: 0.02em;
  $ring-height: 2em;
  $ball-height: 0.2em;

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
    border: solid $ring-border;
    position: absolute;
    height: $ring-height;
    width: $ring-height;
    box-sizing: border-box;
    border-radius: 100%;
    display: flex;
    justify-content: center;
  }
  &__ball {
    position: absolute;
    height: $ball-height;
    width: $ball-height;
    background-color: currentColor;
    border-radius: 100%;
    top: -0.5 * ($ball-height + $ring-border);
    transform-origin: center ($ring-height - $ring-border + $ball-height) / 2;
    animation-name: rotate-metronome;
    animation-iteration-count: infinite;
    animation-timing-function: linear;

    @keyframes rotate-metronome {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
