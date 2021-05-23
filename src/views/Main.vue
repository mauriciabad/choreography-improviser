<template>
  <div>
    <visual-metronome :beatNumber="beatNumber" />
  </div>
</template>

<script lang="ts">
import VisualMetronome from '@/components/VisualMetronome.vue'
import useSpotify, { CurrentlyPlayingResponse } from '@/compositions/spotify'
import { computed, defineComponent, onMounted, ref, watchEffect } from 'vue'

export default defineComponent({
  components: {
    VisualMetronome,
  },
  setup() {
    const { spotifyApi } = useSpotify()
    const recentlyPlayed = ref<CurrentlyPlayingResponse | undefined>()

    onMounted(async () => {
      recentlyPlayed.value = await spotifyApi.getMyCurrentPlayingTrack()
      console.log('recentlyPlayed', recentlyPlayed.value)
    })

    const songStart = ref(Date.now())
    const bpm = ref(100)
    const msPerBeat = computed(() => (1000 * 60) / bpm.value)
    const timeIntervalId = ref<number | undefined>(undefined)

    watchEffect(() => {
      clearInterval(timeIntervalId.value)
      timeIntervalId.value = setInterval(() => {
        beatNumber.value =
          (Math.floor((Date.now() - songStart.value) / msPerBeat.value) % 8) + 1
      }, msPerBeat.value)
    })

    const beatNumber = ref(1)

    return { recentlyPlayed, beatNumber }
  },
})
</script>
