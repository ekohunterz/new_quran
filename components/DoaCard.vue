<script setup>
import { IconChevronDown, IconChevronUp } from '@tabler/icons-vue'
// Props
defineProps({
  index: {
    type: Number,
    default: 0,
  },
  prayerExpanded: {
    type: Number,
    default: 0,
  },
  prayer: {
    type: Object,
    default: null,
  },
})

// Emits
const emits = defineEmits(['toggle-expand-prayer'])
</script>

<template>
  <div
    class="group rounded-lg border border-gray-300/70 transition-all duration-150 ease-linear hover:!border-teal-600 hover:shadow-[0px_0px_20px_#E7E7E7] dark:border-gray-700 hover:dark:shadow-[0px_0px_20px_#181616]"
  >
    <!-- Header -->
    <div
      :class="index + 1 === prayerExpanded ? 'mb-3 md:mb-4' : 'mb-0'"
      class="flex cursor-pointer items-center justify-between gap-x-3 p-3 md:p-4"
      @click="emits('toggle-expand-prayer', index + 1)"
    >
      <div class="flex items-center gap-x-1.5">
        <p class="text-sm font-medium tracking-wide dark:text-slate-200 md:text-base">
          {{ index + 1 }}.
        </p>
        <p class="text-sm font-medium dark:text-slate-200 md:text-base">
          {{ prayer.nama }}
        </p>
      </div>

      <IconChevronUp
        v-if="index + 1 === prayerExpanded"
        class="dark:text-white"
      />
      <IconChevronDown
        v-else
        class="dark:text-white"
      />
    </div>

    <!-- Content -->
    <div
      v-if="index + 1 === prayerExpanded"
      class="space-y-5 p-3 md:p-4"
    >
      <!-- Arab, latin & translation -->
      <div v-if="prayer.arab">
        <p
          dir="rtl"
          lang="ar"
          class="mb-3 text-right font-mono text-3xl leading-[65px] text-alternative dark:text-slate-200 md:!leading-[70px] lg:text-4xl lg:!leading-[80px]"
        >
          {{ prayer.arab }}
        </p>

        <p
          class="mb-3 text-sm !leading-6 tracking-wide text-teal-800 dark:text-white md:text-base md:!leading-7"
        >
          {{ prayer.latin }}
        </p>

        <p class="text-sm !leading-6 text-gray-500 dark:text-slate-400 md:text-base md:!leading-7">
          {{ prayer.arti }}
        </p>
      </div>

      <!-- Notes -->
      <div v-if="prayer.keterangan">
        <p class="mb-1 text-sm font-semibold dark:text-slate-200">Keterangan:</p>
        <p
          class="text-xs text-gray-500 dark:text-slate-400 md:text-sm"
          v-html="prayer.keterangan"
        ></p>
      </div>
    </div>

    <!-- Hadith history -->
    <div
      v-if="index + 1 === prayerExpanded"
      class="rounded-b-lg bg-gray-100 px-3 py-2 dark:bg-gray-700 md:px-4"
    >
      <p class="text-xs text-gray-500 dark:text-white md:text-sm">{{ prayer.riwayat }}</p>
    </div>
  </div>
</template>
