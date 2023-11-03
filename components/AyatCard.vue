<script setup>
import { IconPlayerPlay } from '@tabler/icons-vue'

const props = defineProps({
  ayat: {
    type: Object,
    required: true,
  },
  surahNomor: {
    type: String,
    required: true,
  },
  surahName: {
    type: String,
    required: true,
  },
})

// Store
const alQuranStore = useAlQuranStore()

const playSurah = () => {
  const data = {
    surah: `${props.surahName} - ${props.ayat.nomorAyat}`,
    qori: 'Misyari Rasyid Al-Afasi',
    source: Object.values(props.ayat.audio).find((audio) => audio.includes('Misyari')),
  }
  alQuranStore.setPlayingAudio(data)
}
</script>

<template>
  <div class="mt-10 rounded-lg bg-white shadow-sm dark:bg-primary_dark">
    <div
      :id="'#ayat-' + ayat.nomorAyat"
      class="mb-6 flex w-full flex-nowrap p-6"
    >
      <div class="mr-4 flex flex-col">
        <div class="text-center font-semibold text-primary_dark dark:text-secondary">
          {{ surahNomor }}:{{ ayat.nomorAyat }}
        </div>
        <div class="mt-2 flex h-full text-primary_dark dark:text-secondary">
          <button
            class="mt-auto h-fit"
            @click="playSurah"
          >
            <IconPlayerPlay size="18" />
          </button>
        </div>
      </div>

      <div class="ml-2 w-full">
        <div
          class="text-right font-mono text-2xl font-semibold leading-relaxed text-alternative hover:text-primary dark:text-secondary dark:hover:text-primary"
        >
          {{ ayat.teksArab }}
        </div>
        <p class="mt-5 text-right text-lg dark:text-secondary">{{ ayat.teksLatin }}</p>

        <p class="mt-5 text-base dark:text-secondary">{{ ayat.teksIndonesia }}</p>
      </div>
    </div>
  </div>
</template>
