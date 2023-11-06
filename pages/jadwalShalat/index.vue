<script setup>
import { useGeolocation } from '@vueuse/core'
import {
  IconMapPinFilled,
  IconSunrise,
  IconSunHigh,
  IconSunset,
  IconMoon,
  IconCloud,
} from '@tabler/icons-vue'

// Get coordinate
const { coords, pause: pauseWatchCoords } = useGeolocation()
const tabActive = ref('today')
const dataLocation = ref(null)
const idCity = ref('1609')
const prayerTime = ref('')
const prayerTimeOneMonth = ref('')
const isLoading = ref(true)

// Watch coordinate
watch(
  () => coords.value.latitude,
  (val) => {
    if (val !== Infinity) getDataLocation()
  },
)

// Get data location
const getDataLocation = () => {
  useFetch(LOCATION_API, {
    query: {
      latitude: coords.value.latitude,
      longitude: coords.value.longitude,
      localityLanguage: 'id',
    },
    transform: (data) => {
      return {
        latitude: data.latitude,
        longitude: data.longitude,
        countryName: data.countryName,
        cityName: data.localityInfo.administrative[2].name,
      }
    },
  }).then((res) => {
    dataLocation.value = res.data.value
    pauseWatchCoords()
    getIdCity()
  })
}

const dateToday = computed(() => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()

  return `${year}/${month}/${day}`
})

const getIdCity = () => {
  useFetch(`/kota/cari/${dataLocation.value?.cityName}`, {
    baseURL: SHOLAT_API,
    transform: (data) => data.data[0].id,
  }).then((res) => {
    idCity.value = res.data.value
    getPrayerTime()
    getPrayerTimeOneMonth()
  })
}

// Get data prayer time
const getPrayerTime = () => {
  useFetch(`/jadwal/${idCity.value}/${dateToday.value}`, {
    baseURL: SHOLAT_API,
    transform: (data) => data.data,
  }).then((res) => {
    prayerTime.value = res.data.value
    isLoading.value = false
  })
}

// Get data prayer time 1 month
const getPrayerTimeOneMonth = () => {
  const date = dateToday.value.split('/')
  date.pop()

  useFetch(`/jadwal/${idCity.value}/${date.join('/')}`, {
    baseURL: SHOLAT_API,
    transform: (data) => data.data.jadwal,
  }).then((res) => {
    prayerTimeOneMonth.value = res.data.value
  })
}

const selectTab = (tab) => {
  tabActive.value = tab
}

useHead({
  title: 'Jadwal Shalat | Quran App',
})
</script>

<template>
  <div class="bg-secondary dark:bg-slate-950">
    <div class="container py-12">
      <div class="h-48 rounded-md bg-primary p-6 dark:bg-primary_dark">
        <div class="flex h-full flex-col">
          <p class="text-2xl font-bold text-secondary">Jadwal Shalat</p>
          <p
            v-if="prayerTime"
            class="leading-loose text-secondary"
          >
            {{ prayerTime.jadwal.tanggal }}
          </p>
          <p
            class="mt-auto flex items-center gap-3 text-xl font-semibold capitalize leading-loose text-secondary"
          >
            <IconMapPinFilled /> {{ dataLocation?.cityName }},
            {{ prayerTime?.daerah?.toLowerCase() }},
            {{ dataLocation?.countryName }}
          </p>
        </div>
      </div>

      <div class="mt-12 flex rounded-md bg-gray-200 p-1 dark:bg-primary_dark dark:text-secondary">
        <div
          class="w-1/2 cursor-pointer rounded-md py-2 text-center font-semibold"
          :class="tabActive === 'today' ? 'bg-primary text-secondary dark:bg-black' : ''"
          @click="selectTab('today')"
        >
          Hari Ini
        </div>
        <div
          class="w-1/2 cursor-pointer rounded-md py-2 text-center font-semibold"
          :class="tabActive === 'month' ? 'bg-primary text-secondary dark:bg-black' : ''"
          @click="selectTab('month')"
        >
          Bulan Ini
        </div>
      </div>

      <div v-if="tabActive === 'today'">
        <div class="mt-6 rounded-md bg-gray-200 p-5 dark:bg-primary_dark dark:text-secondary">
          <div v-if="isLoading">Loading...</div>
          <div
            v-else
            class="flex flex-col gap-3"
          >
            <div class="flex justify-between">
              <div class="flex items-center gap-3">
                <IconSunrise /> <span class="text-lg font-semibold capitalize">Subuh</span>
              </div>
              <div class="text-lg font-semibold">{{ prayerTime.jadwal.subuh }}</div>
            </div>
            <div class="border-b-[1px] border-gray-300"></div>
            <div class="flex justify-between">
              <div class="flex items-center gap-3">
                <IconSunHigh /> <span class="text-lg font-semibold capitalize">Dzuhur</span>
              </div>
              <div class="text-lg font-semibold">{{ prayerTime.jadwal.dzuhur }}</div>
            </div>
            <div class="border-b-[1px] border-gray-300"></div>
            <div class="flex justify-between">
              <div class="flex items-center gap-3">
                <IconCloud /> <span class="text-lg font-semibold capitalize">ashar</span>
              </div>
              <div class="text-lg font-semibold">{{ prayerTime.jadwal.ashar }}</div>
            </div>
            <div class="border-b-[1px] border-gray-300"></div>
            <div class="flex justify-between">
              <div class="flex items-center gap-3">
                <IconSunset /> <span class="text-lg font-semibold capitalize">maghrib</span>
              </div>
              <div class="text-lg font-semibold">{{ prayerTime.jadwal.maghrib }}</div>
            </div>
            <div class="border-b-[1px] border-gray-300"></div>
            <div class="flex justify-between">
              <div class="flex items-center gap-3">
                <IconMoon /> <span class="text-lg font-semibold capitalize">isya</span>
              </div>
              <div class="text-lg font-semibold">{{ prayerTime.jadwal.isya }}</div>
            </div>
          </div>
        </div>

        <div class="mt-6 rounded-md bg-gray-200 p-5 dark:bg-primary_dark dark:text-secondary">
          <div v-if="isLoading">Loading...</div>
          <div
            v-else
            class="flex items-center justify-between gap-3 text-lg"
          >
            <div class="mx-auto">
              Imsak<span class="block font-semibold">{{ prayerTime.jadwal.imsak }}</span>
            </div>
            <div class="mx-auto">
              Terbit<span class="block font-semibold">{{ prayerTime.jadwal.terbit }}</span>
            </div>
            <div class="mx-auto">
              Dhuha<span class="block font-semibold">{{ prayerTime.jadwal.dhuha }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="mt-6 rounded-md bg-gray-200 p-5 dark:bg-primary_dark dark:text-secondary">
          <div v-if="isLoading">Loading...</div>
          <div
            v-else
            class="overflow-auto"
          >
            <table class="w-full table-auto">
              <thead>
                <tr>
                  <th class="px-4 py-2 text-left">Tanggal</th>
                  <th class="px-4 py-2">Imsak</th>
                  <th class="px-4 py-2">Subuh</th>
                  <th class="px-4 py-2">Terbit</th>
                  <th class="px-4 py-2">Dhuha</th>
                  <th class="px-4 py-2">Dzuhur</th>
                  <th class="px-4 py-2">Ashar</th>
                  <th class="px-4 py-2">Maghrib</th>
                  <th class="px-4 py-2">Isya</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="jadwal in prayerTimeOneMonth"
                  :key="jadwal.tanggal"
                  class="text-center hover:bg-gray-100 dark:hover:bg-black"
                >
                  <td class="px-4 py-2 text-left">{{ jadwal.tanggal }}</td>
                  <td class="px-4 py-2">{{ jadwal.imsak }}</td>
                  <td class="px-4 py-2">{{ jadwal.subuh }}</td>
                  <td class="px-4 py-2">{{ jadwal.terbit }}</td>
                  <td class="px-4 py-2">{{ jadwal.dhuha }}</td>
                  <td class="px-4 py-2">{{ jadwal.dzuhur }}</td>
                  <td class="px-4 py-2">{{ jadwal.ashar }}</td>
                  <td class="px-4 py-2">{{ jadwal.maghrib }}</td>
                  <td class="px-4 py-2">{{ jadwal.isya }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
table th,
table td {
  border-bottom: 1px solid #ccc;
}

table td {
  padding: 10px;
}
</style>
