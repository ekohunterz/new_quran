<script setup lang="ts">
// Store
const alQuranStore = useAlQuranStore()
</script>

<template>
  <div
    id="content"
    :class="{ 'pb-[120px]': alQuranStore.getPlayingAudio }"
  >
    <NavBar />
    <NuxtPage />
    <LazyAudioPlayer />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
