<template>
  <div>
    <visual-metronome :beatNumber="1" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VisualMetronome from '@/components/VisualMetronome.vue' // @ is an alias to /src

export default defineComponent({
  components: {
    VisualMetronome,
  },
})
</script>
