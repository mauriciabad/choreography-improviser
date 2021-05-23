<template>
  <div>
    <visual-metronome :beatNumber="1" />
  </div>
</template>

<script lang="ts">
import VisualMetronome from '@/components/VisualMetronome.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    VisualMetronome,
  },
})
</script>
