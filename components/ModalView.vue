<script setup>
import { IconX } from '@tabler/icons-vue'

const emit = defineEmits(['close'])

defineProps({
  isOpen: Boolean,
  nama: String,
  deskripsi: String,
})
</script>

<template>
  <!-- Modal -->
  <Transition>
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
    >
      <!-- Latar belakang gelap saat modal terbuka -->
      <div
        @click="emit('close')"
        class="modal-overlay fixed inset-0 bg-gray-100 opacity-80 dark:bg-teal-950"
      ></div>

      <!-- Konten Modal -->
      <div
        class="modal-container custom-scrollbar z-50 mx-auto max-h-[60%] w-2/3 overflow-auto rounded bg-white p-6 shadow-lg dark:bg-primary_dark lg:h-auto lg:w-1/2"
      >
        <div class="p-6">
          <div class="mb-6 flex items-center justify-between">
            <h4 class="text-xl font-semibold dark:text-white">Detail Surah</h4>
            <button
              @click="emit('close')"
              class="dark:text-secondary"
            >
              <IconX />
            </button>
          </div>
          <p
            v-html="deskripsi"
            class="whitespace-pre-wrap text-sm !leading-8 text-black dark:text-secondary md:text-base"
          ></p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Gaya untuk overlay modal */
.modal-overlay {
  z-index: 49;
}

/* Gaya untuk modal */
.modal-container {
  z-index: 50;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
