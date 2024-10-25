<template>
  <div class="select relative w-full" ref="selectEl" @click="() => isOpen = !isOpen">
    <div class="relative">
      <div class="flex items-center h-[5.5rem] p-6 w-full border border-black/10 hover:border-black/20 rounded-lg cursor-pointer">
        <div class="text-[1.6rem] leading-[2.4rem] line-clamp-1">
          <slot name="selected" :value="selectedValue" />
        </div>
        <IconArrowDown className="shrink-0 ml-auto" />
      </div>
      <span
        :class="cn(
          'absolute px-1 -ml-1 left-0 top-1/2 -translate-y-1/2 translate-x-6 text-[1.6rem] text-[#9E9E9E] pointer-events-none transition-all bg-white',
          {
            'text-[1.2rem] top-0 -translate-y-1/3': selectedValue
          }
        )"
      >{{ placeholder }}</span>
    </div>

    <div v-if="isOpen" class="absolute w-full py-2 mt-2 top-full shadow-custom bg-white z-10" @click.stop>
      <div v-if="searchable" class="p-6 pt-4">
        <div class="relative flex items-center">
          <IconSearch :width="20" :height="20" className="absolute left-4" />
          <input
            type="text"
            class="w-full py-4 px-14 text-[1.4rem] bg-[#F8F8F8] placeholder:text-[#9E9E9E] outline-none rounded-xl"
            placeholder="Поиск"
            @input="event => searchValue = (event.target as HTMLInputElement).value"
            :value="searchValue"
            autofocus
          >
          <button
            v-if="searchValue.trim().length > 0"
            class="absolute right-4"
            type="reset"
            @click.prevent="searchValue = ''"
          >
            <IconClose :width="16" :height="16" color="#818E95" />
          </button>
        </div>
      </div>
      
      <ul v-if="filteredItems.length > 0" class="scroll max-h-[300px] pl-2 mr-3 overflow-y-auto">
        <li
          v-for="(item, i) in filteredItems"
          :key="i"
          class="flex items-center h-[4.8rem] px-4 mr-2 text-[1.6rem] rounded-lg hover:bg-[#F8F8F8] transition-colors cursor-pointer"
          @click="() => handleSelect(item)"
        >
          <slot v-bind="item" />
        </li>
      </ul>

      <div
        v-else
        class="p-6 text-[1.6rem] text-[#9E9E9E] text-center"
      >Ничего не найдено</div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends object[], ItemType extends T[number], K extends keyof ItemType">
import { computed, isRef, onMounted, onUnmounted, Ref, ref, toRaw } from 'vue';
import IconArrowDown from '../icons/i-arrow-down.vue'
import IconSearch from '../icons/i-search.vue'
import IconClose from '../icons/i-close.vue'
import { cn } from '../../lib/cn';

type SelectProps = {
  defaultValue?: ItemType | null | undefined
  items: ItemType[] | Ref<ItemType[] | null>
  searchable?: boolean
  filteringKey?: K
  placeholder?: string
}

const props = withDefaults(defineProps<SelectProps>(), {
  searchable: false,
  defaultValue: null,
  placeholder: ''
})

const isOpen = ref(false)
const selectedValue = ref<ItemType>()
const searchValue = ref('')
const selectEl = ref(null)

const emit = defineEmits<{
  (e: 'change', selected: ItemType): void
}>()

onMounted(() => {
  if (props.defaultValue)
    selectedValue.value = props.defaultValue
})

const closeContent = () => {
  isOpen.value = false
  searchValue.value = ''
}

const handleSelect = (selected: ItemType) => {
  selectedValue.value = selected
  emit('change', toRaw(selected))
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
  const items = isRef(props.items) ? props.items.value : props.items
  if (!items) return []
  if (!searchValue.value.trim()) return items

  return items.filter(c => {
    const key = props.filteringKey
    if (
      !key ||
      !(key in c)
    ) return true

    const value = c[key] as String
    
    return value.toLocaleLowerCase().includes(searchValue.value.toLocaleLowerCase())
  })
})
</script>