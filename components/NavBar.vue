import type { NuxtLink } from '#build/components';
<script setup>
import { IconSunHigh, IconMoon } from '@tabler/icons-vue'

const isDark = useDark()

const isMenuOpen = ref(false)
const toggleDark = useToggle(isDark)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div
    class="z-[40] border-0 bg-primary pb-3 pt-4 transition-all duration-300 dark:bg-primary_dark"
  >
    <div class="container flex items-center justify-between">
      <div class="flex items-center gap-4">
        <NuxtLink
          to="/"
          class="mr-4 text-xl font-bold text-white"
        >
          Qur'an Lite
        </NuxtLink>
        <div class="hidden gap-4 md:flex">
          <NuxtLink
            to="/"
            class="text-base font-semibold text-white transition-all duration-300 ease-in-out hover:text-gray-300"
            exact-active-class="text-gray-300"
          >
            Al-Qur'an
          </NuxtLink>
          <NuxtLink
            to="/doa"
            class="text-base font-semibold text-white transition-all duration-300 ease-in-out hover:text-gray-300"
            exact-active-class="text-gray-300"
          >
            Do'a Harian
          </NuxtLink>
          <NuxtLink
            to="/jadwalShalat"
            class="text-base font-semibold text-white transition-all duration-300 ease-in-out hover:text-gray-300"
          >
            Jadwal Shalat
          </NuxtLink>
        </div>
      </div>

      <div class="z-50 hidden md:flex">
        <button
          v-if="!isDark"
          class="rounded-full p-2 text-white transition duration-300 ease-in-out hover:bg-teal-600"
          @click="toggleDark()"
        >
          <IconMoon />
        </button>
        <button
          v-else
          class="rounded-full p-2 text-white transition duration-300 ease-in-out hover:bg-alternative"
          @click="toggleDark()"
        >
          <IconSunHigh />
        </button>
      </div>
      <div class="md:hidden">
        <button
          class="text-white focus:outline-none"
          @click="toggleMenu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            width="28px"
            height="28px"
          >
            <path
              d="M0 0h24v24H0z"
              fill="none"
            />
            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile menu (hidden by default) -->
  <div
    v-if="isMenuOpen"
    class="container absolute inset-x-0 z-[9999] bg-primary pb-3 pt-24 md:hidden"
  >
    <button
      v-if="!isDark"
      class="text-white"
      @click="toggleDark()"
    >
      <IconMoon />
    </button>
    <button
      v-else
      class="text-white"
      @click="toggleDark()"
    >
      <IconSunHigh />
    </button>
    <NuxtLink
      to="/"
      class="block text-base font-semibold text-white transition-all duration-300 ease-in-out hover:text-gray-300"
      exact-active-class="text-gray-300"
    >
      Al-Qur'an
    </NuxtLink>
    <NuxtLink
      to="/doa"
      class="block text-base font-semibold text-white transition-all duration-300 ease-in-out hover:text-gray-300"
      exact-active-class="text-gray-300"
    >
      Do'a Harian
    </NuxtLink>
    <NuxtLink
      to="/jadwalShalat"
      class="block text-base font-semibold text-white transition-all duration-300 ease-in-out hover:text-gray-300"
      exact-active-class="text-gray-300"
    >
      Jadwal Sholat
    </NuxtLink>
  </div>
</template>
