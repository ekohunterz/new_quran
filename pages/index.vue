<script setup>
import { IconBook, IconSearch } from '@tabler/icons-vue'

const search = ref('')
const surahFavorite = ref('')

// Get list surah
const {
  data: dataSurah,
  pending: pendingFetch,
  refresh,
} = useLazyFetch(ALQURAN_API, {
  key: 'surah',
  server: false,
  transform: (data) => {
    const dataList = data.data.map((surah) => {
      if (surahFavorite.value.length > 0) {
        const itsInFavorite = surahFavorite.value.find(
          (data) => data.namaLatin.toLowerCase() === surah.namaLatin.toLowerCase(),
        )
        surah.isFavorite = !!itsInFavorite
      } else {
        surah.isFavorite = false
      }
      return surah
    })
    return dataList
  },
})

// List surah
const surahList = computed(() => {
  if (search.value === '') return dataSurah.value || []
  return dataSurah.value.filter((surah) =>
    surah.namaLatin.toLowerCase().includes(search.value.toLowerCase()),
  )
})

useHead({
  title: 'Qur-an App',
})
</script>

<template>
  <div>
    <div class="bg-primary dark:bg-primary_dark">
      <div class="container py-24 text-center">
        <div class="mb-6 flex justify-center">
          <IconBook
            size="144"
            class="rounded-full bg-secondary p-6 text-primary dark:text-slate-800"
          />
        </div>
        <div class="relative mx-auto w-full lg:w-1/2">
          <input
            v-model="search"
            type="text"
            class="w-full rounded-full border-2 border-secondary px-6 py-4 text-lg text-black focus:outline-none"
            placeholder="Cari Nama Surah"
          />
          <div class="absolute inset-y-0 right-0 flex items-center">
            <button
              @click="search = ''"
              class="z-[1] flex h-16 w-20 items-center justify-center overflow-hidden rounded-r-full border-[3px] border-white text-primary ring-0 transition-all duration-500 ease-in-out hover:cursor-pointer hover:bg-primary hover:text-secondary focus:outline-none dark:bg-secondary dark:text-slate-800 dark:hover:bg-primary_dark dark:hover:text-secondary"
            >
              <IconSearch
                size="24"
                class=""
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-secondary dark:bg-slate-950">
      <div class="container py-8">
        <div class="border-b-2 border-gray-300"><h1 class="text-lg">Surah</h1></div>

        <div
          v-if="pendingFetch"
          class="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          <SurahCardPlaceholder
            v-for="index in 21"
            :key="index"
          />
        </div>
        <div
          v-else
          class="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          <SurahCard
            v-for="surah in surahList"
            :key="surah.nama"
            :surah="surah"
            @refresh-data="refresh"
          />
        </div>
      </div>
    </div>
  </div>
</template>
