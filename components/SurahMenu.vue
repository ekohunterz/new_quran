<script lang="ts" setup>
import { IconX } from '@tabler/icons-vue'

// Props
defineProps({
  detailsurah: {
    type: Object,
    required: true,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
})

// Emits
const emits = defineEmits(['close-slide'])

// Router
const router = useRouter()

const nuxtApp = useNuxtApp()

// Variables
const search = ref<string>('')

// Get list surah
const { data: surah, pending: pendingFetch } = useFetch<any[]>(ALQURAN_API, {
  key: 'surah',
  lazy: true,
  server: false,
  transform: (data: any) => {
    return data.data
  },
  getCachedData: (key) => nuxtApp.static.data[key] ?? nuxtApp.payload.data[key],
})

// List surah
const surahList = computed((): any[] => {
  const dataSurah: any[] = surah.value!
  if (search.value === '') return dataSurah
  return dataSurah.filter((surah) =>
    surah.namaLatin.toLowerCase().includes(search.value.toLowerCase()),
  )
})

// Handle select surah
const handleSelectSurah = (id: number) => {
  emits('close-slide')
  router.push(`/surah/${id}`)
}
</script>

<template>
  <ClientOnly>
    <div>
      <Transition>
        <div
          v-if="isOpen"
          class="fixed inset-0 z-50 flex max-h-screen items-center justify-center backdrop-blur-sm"
        >
          <div
            class="fixed inset-0 bg-gray-100 opacity-80 dark:bg-teal-950"
            @click="emits('close-slide')"
          ></div>
          <div
            class="absolute left-0 top-0 z-50 overflow-auto bg-secondary dark:bg-primary_dark lg:w-1/5"
          >
            <div class="p-6">
              <div class="mb-6 flex items-center justify-between">
                <h4 class="text-base font-semibold dark:text-secondary md:text-lg">List Surah</h4>
                <IconX
                  class="cursor-pointer text-xl"
                  @click="emits('close-slide')"
                />
              </div>

              <input
                v-model="search"
                type="text"
                class="w-full rounded-md border-2 p-1 px-2 dark:bg-primary_dark dark:text-secondary"
                placeholder="Cari surah"
              />
            </div>

            <!-- Skeleton loading -->
            <div
              v-if="pendingFetch"
              class="h-full space-y-1 overflow-y-auto pb-6 pl-6 pr-2"
            >
              <div
                v-for="i in 20"
                :key="i"
                class="h-10 w-full animate-pulse rounded bg-gray-200 dark:bg-zinc-700/30"
              />
            </div>

            <!-- Surah list -->
            <div
              v-else
              class="max-h-[82vh] space-y-1 overflow-y-auto pb-6 pl-6 pr-2"
            >
              <div
                v-for="data in surahList"
                :key="data.nama"
                :class="{ '!bg-teal-600': data.namaLatin === detailsurah?.namaLatin }"
                class="flex cursor-pointer items-center justify-between rounded px-3 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                @click="handleSelectSurah(data.nomor)"
              >
                <p
                  :class="{ '!text-white': data.namaLatin === detailsurah?.namaLatin }"
                  class="text-sm dark:text-slate-200 md:text-base"
                >
                  {{ data.nomor }}. {{ data.namaLatin }}
                </p>
                <p
                  :class="{ '!text-slate-200': data.namaLatin === detailsurah?.namaLatin }"
                  class="text-xs dark:text-slate-200 md:text-sm"
                >
                  {{ data.jumlahAyat }} Ayat
                </p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </ClientOnly>
</template>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}

.v-enter-active,
.v-leave-active {
  transform: translate(0, 0);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translate(-50px, 0);
}
</style>
