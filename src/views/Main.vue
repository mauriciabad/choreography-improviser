<template>
  <div>
    <div v-if="isPlaying" class="main__title">
      {{ playingSong.name }} by
      {{ playingSong.artists[0].name }}
    </div>
    <div v-else class="main__pause">Play a song to start</div>

    <visual-metronome v-if="isPlaying" :beatNumber="beatNumber" />
  </div>
</template>

<script lang="ts">
import VisualMetronome from '@/components/VisualMetronome.vue'
import useSpotify, { CurrentlyPlayingResponse } from '@/compositions/spotify'
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  watch,
  watchEffect,
} from 'vue'

export default defineComponent({
  components: {
    VisualMetronome,
  },
  setup() {
    const { spotifyApi } = useSpotify()
    const recentlyPlayed = ref<CurrentlyPlayingResponse | undefined>()
    const isPlaying = computed(() => recentlyPlayed.value?.is_playing)
    const playingSong = computed(() => recentlyPlayed.value?.item)

    onMounted(async () => {
      try {
        recentlyPlayed.value = await spotifyApi.getMyCurrentPlayingTrack()
        console.log('recentlyPlayed', recentlyPlayed.value)
      } catch (error) {
        console.error(
          `Error fetching the currently playing song: ${error.message}`,
          error
        )
      }
    })

    watch(playingSong, async () => {
      if (playingSong.value) {
        bpm.value = (
          await spotifyApi.getAudioFeaturesForTrack(playingSong.value.id)
        ).tempo
      }
    })

    const songStart = ref(Date.now())
    const bpm = ref(100)
    const msPerBeat = computed(() => (1000 * 60) / bpm.value)
    const timeIntervalId = ref<number | undefined>(undefined)

    watchEffect(() => {
      clearInterval(timeIntervalId.value)

      if (isPlaying.value) {
        timeIntervalId.value = setInterval(() => {
          beatNumber.value =
            (Math.floor((Date.now() - songStart.value) / msPerBeat.value) % 8) +
            1
        }, msPerBeat.value)
      }
    })

    const beatNumber = ref(1)

    return { recentlyPlayed, beatNumber, isPlaying, playingSong }
  },
})
</script>
