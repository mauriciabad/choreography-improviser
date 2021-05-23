<template>
  <div>You'll be redirected to login in spotify</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useSpotify from '@/compositions/spotify'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {},
  setup() {
    const router = useRouter()
    const { processLogin, login } = useSpotify()

    const loginSuccessful = processLogin()
    if (loginSuccessful) {
      router.push({ name: 'main' })
    } else {
      login()
    }

    return {}
  },
})
</script>
