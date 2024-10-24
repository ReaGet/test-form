<template>
  <div class="select w-full" ref="selectEl" @click="() => isOpen = !isOpen">
    <div class="relative flex items-center h-[5.5rem] p-6 border border-black/10 hover:border-black/20 rounded-lg cursor-pointer">
      <div class="flex items-center w-full">
        <div class="text-[1.6rem] leading-[2.4rem] line-clamp-1">value goes here</div>
        <IconArrowDown className="shrink-0 ml-auto" />
      </div>
      <span
        :class="cn(
          'absolute px-1 left-0 top-1/2 -translate-y-1/2 _translate-x-6 text-[1.6rem] text-[#9E9E9E] pointer-events-none transition-transform bg-white',
          {
            'scale-75 _translate-x-0 -translate-y-[160%]': true,
          }
        )"
      >{{ placeholder }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import IconArrowDown from '../icons/i-arrow-down.vue'
// import IconSearch from '../icons/i-search.vue'
// import IconClose from '../icons/i-close.vue'
import { cn } from '../../lib/cn';

type SelectProps = {
  selected?: string
  items: unknown[]
  searchable?: boolean
  placeholder?: string
}

const props = withDefaults(defineProps<SelectProps>(), {
  searchable: false,
  items: [],
  selected: '',
  placeholder: ''
})

const isOpen = ref(false)
const selectedValue = ref('')
const searchValue = ref('')
const selectEl = ref(null)

const closeContent = () => {
  isOpen.value = false
  searchValue.value = ''
}

const handleCodeSelect = (code) => {
  // selectedCode.value = code
  closeContent()
}

const handleClickOutside = (event: MouseEvent) => {
  const el = event.target as HTMLElement
  const parent = el.closest('.select')

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

const filteredItems = computed(() => {
  if (!searchValue.value.trim()) return props.items?.value || []

  return props.items.value?.filter(c => {
    return c.name.toLocaleLowerCase().includes(searchValue.value.toLocaleLowerCase())
  })
})
</script>