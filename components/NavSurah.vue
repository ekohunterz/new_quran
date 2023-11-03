<script setup lang="ts">
import { IconListDetails } from '@tabler/icons-vue'
import { IconPlayerPlayFilled } from '@tabler/icons-vue'
import SurahMenu from './SurahMenu.vue'

// Store
const alQuranStore = useAlQuranStore()

const menuOpen = ref(false)

// Surah detail
const { data: surahDetail } = useNuxtData('surahDetail')

// Play surah audio
const playSurah = () => {
  const datas = {
    surah: surahDetail.value!.data.namaLatin,
    qori: 'Misyari Rasyid Al-Afasi',
    source: surahDetail.value!.data.audioFull['05'],
  }

  if (surahDetail.value) alQuranStore.setPlayingAudio(datas)
}
</script>

<template>
  <SurahMenu
    :is-open="menuOpen"
    :detailsurah="surahDetail.data"
    @close-slide="menuOpen = false"
  />
  <div
    v-if="surahDetail"
    class="sticky top-0 z-10 flex h-10 w-full items-center border-b border-slate-700/10 bg-white/75 backdrop-blur dark:border-slate-300/10 dark:bg-primary_dark"
  >
    <div class="container flex items-center justify-between">
      <div
        class="flex cursor-pointer items-center gap-x-2"
        role="button"
        @click="menuOpen = true"
      >
        <IconListDetails
          class="dark:text-secondary"
          :size="16"
        />
        <p class="text-xs text-slate-800 dark:text-secondary md:text-sm">
          {{ surahDetail.data.namaLatin }}
        </p>
      </div>

      <div class="flex items-center gap-x-4">
        <!-- Play button -->
        <div
          class="flex cursor-pointer items-center text-xs font-semibold text-teal-700 dark:text-secondary md:text-sm"
          @click="playSurah"
        >
          <IconPlayerPlayFilled :size="16" />
          &nbsp;Play
        </div>
      </div>
    </div>
  </div>
</template>
