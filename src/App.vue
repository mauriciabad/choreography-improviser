<template>
  <router-view />
</template>

<script>
import { defineComponent, watch, onMounted } from 'vue'
import useSpotify from '@/compositions/spotify'

export default defineComponent({
  setup() {
    const { isAuthenticated, login } = useSpotify()

    watch(isAuthenticated, () => {
      if (!isAuthenticated.value) login()
    })

    onMounted(() => {
      if (!isAuthenticated.value) login()
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
