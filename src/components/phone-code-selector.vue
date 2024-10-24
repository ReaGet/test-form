<template>
  <div v-if="!isLoading" class="phone-code-selector relative w-full" ref="selectEl" @click="() => isOpen = !isOpen">
    <div class="h-[5.5rem] p-6 border border-black/10 hover:border-black/20 rounded-lg cursor-pointer">
      <span class="absolute -top-3 left-8 text-[1.2rem] text-[#9E9E9E] leading-[1.6rem] bg-white">Страна</span>
      <div class="flex">
        <div class="text-[1.6rem] leading-[2.4rem] line-clamp-1">{{ selectedCode?.name || 'Выберите из списка' }}</div>
        <IconArrowDown class="shrink-0 ml-auto" />
      </div>
    </div>

    <div v-if="isOpen" class="absolute w-full mt-2 top-full shadow-custom bg-white z-10" @click.stop>
      <div class="p-6">
        <div class="relative flex items-center">
          <IconSearch :width="20" :height="20" class="absolute left-4" />
          <input
            type="text"
            class="w-full py-4 px-14 text-[1.4rem] bg-[#F8F8F8] placeholder:text-[#9E9E9E] outline-none rounded-xl"
            placeholder="Поиск"
            @input="event => filterText = (event.target as HTMLInputElement).value"
            :value="filterText"
            autofocus
          >
          <button
            v-if="filterText.trim().length > 0"
            class="absolute right-4"
            type="reset"
            @click.prevent="filterText = ''"
          >
            <IconClose :width="16" :height="16" color="#818E95" />
          </button>
        </div>
      </div>
      <ul class="scroll max-h-[300px] pl-2 mr-2 mb-6 overflow-y-auto">
        <li
          v-for="item in filteredCodes"
          :key="item.code"
          class="flex items-center h-[4.8rem] px-4 mr-2 text-[1.6rem] rounded-lg hover:bg-[#F8F8F8] transition-colors cursor-pointer"
          @click="() => handleCodeSelect(item)"
        >
          <i class="text-[2rem]">{{ item.flag }}</i>
          <span class="ml-4">{{ item.name }}</span>
          <strong class="ml-auto">{{ item.dial_code }}</strong>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import IconArrowDown from './icons/i-arrow-down.vue'
import IconSearch from './icons/i-search.vue'
import IconClose from './icons/i-close.vue'
import { PhoneCode } from '../types';
import { useFetch } from '../hooks/use-fetch'

const codesUrl = 'https://gmmdf.free.beeceptor.com/codes'

const { isLoading, data: codes } = useFetch<PhoneCode[]>(codesUrl)

const isOpen = ref(false)
const selectedCode = ref<PhoneCode|null>(null)
const filterText = ref('')
const selectEl = ref(null)

const closeContent = () => {
  isOpen.value = false
  filterText.value = ''
}

const handleCodeSelect = (code: PhoneCode) => {
  selectedCode.value = code
  closeContent()
}

const handleClickOutside = (event: MouseEvent) => {
  const el = event.target as HTMLElement
  const parent = el.closest('.phone-code-selector')

  if (!parent) closeContent()
}

const handleKeys = (event: KeyboardEvent) => {
  if (event.key === 'Escape')
    closeContent()
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeys)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeys)
})

const filteredCodes = computed(() => {
  console.log(codes)
  if (!filterText.value.trim()) return codes?.value || []

  return codes.value?.filter(c => {
    return c.name.toLocaleLowerCase().includes(filterText.value.toLocaleLowerCase())
  })
})
</script>