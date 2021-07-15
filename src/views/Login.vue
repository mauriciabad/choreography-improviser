<template>
  <div v-if="loginSuccessful">Successfully logged in spotify</div>
  <div v-else>Failed logging in spotify</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useSpotify from '@/compositions/spotify'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {},
  setup() {
    const router = useRouter()
    const { processLogin } = useSpotify()

    const loginSuccessful = ref(processLogin())
    if (loginSuccessful.value) {
      router.push({ name: 'main' })
    }

    return { loginSuccessful }
  },
})
</script>
