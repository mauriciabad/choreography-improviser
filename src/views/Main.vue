<template>
  <div>
    <div v-if="isPlaying" class="main__title">
      {{ playingSong.name }} by
      {{ playingSong.artists[0].name }}
    </div>
    <div v-else class="main__pause">
      <p>
        Play a song in
        <a href="https://open.spotify.com/" target="_blank">Spotify's app</a> to
        start
      </p>
    </div>

    <visual-metronome
      v-if="isPlaying"
      :beatNumber="beatNumber"
      :beatDuration="msPerBeat"
      :totalBeats="totalBeats"
    />
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
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    VisualMetronome,
  },
  setup() {
    const router = useRouter()
    const { spotifyApi } = useSpotify()
    const recentlyPlayed = ref<CurrentlyPlayingResponse | undefined>()
    const isPlaying = computed(() => recentlyPlayed.value?.is_playing)
    const playingSong = computed(() => recentlyPlayed.value?.item)

    onMounted(async () => {
      try {
        recentlyPlayed.value = await spotifyApi.getMyCurrentPlayingTrack()
        console.log('recentlyPlayed', recentlyPlayed.value)
      } catch (error) {
        if (error.status === 401) {
          router.push({ name: 'login' })
        } else {
          console.error(
            `Error fetching the currently playing song: ${error.message}`,
            error
          )
        }
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
    const totalBeats = 8
    const bpm = ref(100)
    const msPerBeat = computed(() => (1000 * 60) / bpm.value)
    const timeIntervalId = ref<number | undefined>(undefined)

    watchEffect(() => {
      clearInterval(timeIntervalId.value)

      if (isPlaying.value) {
        timeIntervalId.value = setInterval(() => {
          beatNumber.value =
            (Math.floor((Date.now() - songStart.value) / msPerBeat.value) %
              totalBeats) +
            1
        }, msPerBeat.value)
      }
    })

    const beatNumber = ref(1)

    return {
      recentlyPlayed,
      beatNumber,
      isPlaying,
      playingSong,
      msPerBeat,
      totalBeats,
    }
  },
})
</script>

<style lang="scss" scoped>
.main {
  &__pause {
    display: grid;
    place-content: center;
    text-align: center;
    min-height: 100vh;
    padding: 0 1rem;
    font-size: clamp(1.25rem, 5vw, 2rem);

    p {
      margin: 0;
    }
  }
}
</style>
