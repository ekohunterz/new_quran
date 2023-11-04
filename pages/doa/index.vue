<script setup>
import { IconSearch, IconBook } from '@tabler/icons-vue'
import DoaCard from '../components/DoaCard.vue'
import DoaList from '../../public/doa-harian.json'

// Variables
const search = ref('')
const prayerExpanded = ref(0)
const prayerList = ref(DoaList)

// Function for expand / collapse pray
const toggleExpandPrayer = (value) => {
  if (prayerExpanded.value === value) prayerExpanded.value = 0
  else prayerExpanded.value = value
}

const filteredPrayerList = computed(() => {
  const query = search.value.toLowerCase().trim()
  if (!query) {
    return prayerList.value
  } else {
    return prayerList.value.filter((doa) => {
      return doa.nama.toLowerCase().includes(query)
    })
  }
})

watch(search, () => {
  prayerExpanded.value = 0
})

useHead({
  title: 'Doa | Quran App',
})

// Emits
defineEmits(['toggle-expand-prayer'])
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
            placeholder="Cari Doa"
          />
          <div class="absolute inset-y-0 right-0 flex items-center">
            <button
              class="z-[1] flex h-16 w-20 items-center justify-center overflow-hidden rounded-r-full border-[3px] border-white text-primary ring-0 transition-all duration-500 ease-in-out hover:cursor-pointer hover:bg-primary hover:text-secondary focus:outline-none dark:bg-secondary dark:text-slate-800 dark:hover:bg-primary_dark dark:hover:text-secondary"
              @click="search = ''"
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
      <div class="container py-16">
        <div class="border-b-2 border-gray-300">
          <h1 class="text-lg dark:text-secondary">List Doa</h1>
        </div>
        <div class="mt-3 grid grid-cols-1 gap-4">
          <DoaCard
            v-for="(doa, index) in filteredPrayerList"
            :key="index"
            :index="index"
            :prayer="doa"
            :prayer-expanded="prayerExpanded"
            @toggle-expand-prayer="toggleExpandPrayer"
          ></DoaCard>
        </div>
      </div>
    </div>
  </div>
</template>
