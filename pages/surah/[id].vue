<script setup>
import { IconAlertCircle, IconMapPinFilled } from '@tabler/icons-vue'

const route = useRoute()

const isModalOpen = ref(false)

// Get detail surah
const { data: dataDetail, pending } = useAsyncData('surahDetail', () =>
  $fetch(`${ALQURAN_API}/${route.params.id}`, {
    transform: (data) => {
      const returnData = {
        ...data.data,
        audioFull: Object.values(data.data.audioFull).find((audio) => audio.includes('Misyari')),
      }
      return returnData
    },
  }),
)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}
</script>

<template>
  <div>
    <Head>
      <Title>{{ dataDetail?.data.namaLatin }} | Al-Quran App </Title>
    </Head>
    <NavSurah v-if="dataDetail" />

    <div class="bg-[#f7f7f7] dark:bg-slate-950">
      <div class="container py-28">
        <SurahCardPlaceholder v-if="pending" />
        <div v-else>
          <div class="mb-8 text-center">
            <h1 class="font-mono text-3xl font-bold text-alternative dark:text-secondary">
              بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </h1>
          </div>
          <div class="flex justify-between text-primary dark:text-secondary">
            <div class="flex">
              <IconMapPinFilled />
              <span class="ml-2 text-base font-semibold">{{ dataDetail?.data.tempatTurun }}</span>
            </div>

            <button
              class="flex gap-2 font-bold text-primary hover:text-alternative dark:text-secondary"
              @click="openModal"
            >
              <IconAlertCircle /> Surah Info
            </button>
          </div>
          <AyatCard
            v-for="ayat in dataDetail?.data.ayat"
            :key="ayat"
            :surahNomor="route.params.id"
            :surahName="dataDetail?.data.namaLatin"
            :ayat="ayat"
          />
        </div>
        <div class="flex w-full justify-center gap-4">
          <NuxtLink
            v-if="dataDetail.data.suratSebelumnya"
            :to="`/surah/${dataDetail.data.suratSebelumnya.nomor}`"
            class="rounded-md bg-primary px-3 py-1 text-secondary transition duration-300 hover:opacity-70"
            >Surah Sebelumnya</NuxtLink
          >
          <NuxtLink
            v-if="dataDetail.data.suratSelanjutnya"
            :to="`/surah/${dataDetail.data.suratSelanjutnya.nomor}`"
            class="rounded-md bg-primary px-3 py-1 text-secondary transition duration-300 hover:opacity-70"
            >Surah Selanjutnya</NuxtLink
          >
        </div>
      </div>
    </div>

    <!-- <AudioPlayer /> -->

    <ModalView
      :isOpen="isModalOpen"
      :nama="dataDetail?.data.namaLatin"
      :deskripsi="dataDetail?.data.deskripsi"
      @close="closeModal"
    />
  </div>
</template>
