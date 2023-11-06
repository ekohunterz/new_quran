<script setup>
defineProps({
  surah: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <NuxtLink
    :to="`/surah/${surah.nomor}`"
    class="rounded-lg border-2 border-gray-300 p-4 text-gray-500 hover:border-primary hover:text-primary dark:text-secondary dark:hover:text-primary"
  >
    <div class="flex justify-between">
      <div class="flex items-center justify-center">
        <div class="relative mr-4">
          <IconStar />
          <div
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-sm font-bold"
          >
            {{ surah.nomor }}
          </div>
        </div>
        <div>
          <h2 class="text-lg font-semibold">{{ surah.namaLatin }}</h2>
          <p class="text-ellipsis text-sm">{{ surah.arti }}</p>
        </div>
      </div>
      <div class="w-20 text-center">
        <div class="font-mono text-lg font-semibold">{{ surah.nama }}</div>
        <p class="text-sm">{{ surah.ayat }} Ayat</p>
      </div>
    </div>
  </NuxtLink>
</template>
