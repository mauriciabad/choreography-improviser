<template>
  <router-view />
</template>

<script>
import { defineComponent, watch } from 'vue'
import useSpotify from '@/compositions/spotify'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const { isAuthenticated } = useSpotify()

    if (!isAuthenticated.value) router.push({ name: 'login' })
    watch(isAuthenticated, () => {
      if (!isAuthenticated.value) router.push({ name: 'login' })
    })

    return {}
  },
})
</script>

<style lang="scss">
#app {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
body {
  margin: 0;
}
</style>
