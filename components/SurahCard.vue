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
    :to="`surah/${surah.nomor}`"
    class="border-2 border-gray-300 p-4 rounded-lg hover:border-primary text-gray-500 dark:text-secondary dark:hover:text-primary hover:text-primary"
  >
    <div class="flex justify-between">
      <div class="flex justify-center items-center">
        <div class="relative mr-4">
          <IconStar />
          <div
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-bold text-sm"
          >
            {{ surah.nomor }}
          </div>
        </div>
        <div>
          <h2 class="text-lg font-semibold">{{ surah.namaLatin }}</h2>
          <p class="overflow-ellipsis text-sm">{{ surah.arti }}</p>
        </div>
      </div>
      <div class="text-center w-20">
        <div class="font-mono text-lg font-semibold">{{ surah.nama }}</div>
        <p class="text-sm">{{ surah.ayat }} Ayat</p>
      </div>
    </div>
  </NuxtLink>
</template>
