<template>
  <div>
    <visual-metronome :beatNumber="1" />
  </div>
</template>

<script lang="ts">
import VisualMetronome from '@/components/VisualMetronome.vue'
import useSpotify, { CurrentlyPlayingResponse } from '@/compositions/spotify'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  components: {
    VisualMetronome,
  },
  setup() {
    const { spotifyApi } = useSpotify()
    const recentlyPlayed = ref<CurrentlyPlayingResponse | undefined>()

    onMounted(async () => {
      recentlyPlayed.value = await spotifyApi.getMyCurrentPlayingTrack()
      console.log(recentlyPlayed.value)
    })

    return { recentlyPlayed }
  },
})
</script>
