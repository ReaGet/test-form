<template>
  <Select
    :items="loadedCodes"
    filteringKey="name"
    placeholder="Страна"
    :searchable="true"
    @change="code => emit('change', code)"
  >
    <template v-slot:selected="{ value }">
      {{ value?.name || '' }}
    </template>
    
    <template v-slot:default="code">
      <i class="text-[2rem]">{{ code.flag }}</i>
      <span class="ml-4">{{ code.name }}</span>
      <strong class="ml-auto">{{ code.dial_code }}</strong>
    </template>
  </Select>
</template>

<script setup lang="ts">
import Select from './ui/select.vue';
import { PhoneCode } from '../types';
import { useFetch } from '../hooks/use-fetch'
import { computed } from 'vue';

const codesUrl = 'https://codes.free.beeceptor.com/codes'

// const { isLoading, data: codes } = useFetch<PhoneCode[]>(codesUrl)
const codes: PhoneCode[] = [{"name":"Afghanistan","flag":"🇦🇫","code":"AF","dial_code":"+93"},{"name":"Åland Islands","flag":"🇦🇽","code":"AX","dial_code":"+358"},{"name":"Albania","flag":"🇦🇱","code":"AL","dial_code":"+355"},{"name":"Algeria","flag":"🇩🇿","code":"DZ","dial_code":"+213"},{"name":"American Samoa","flag":"🇦🇸","code":"AS","dial_code":"+1684"}]

const emit = defineEmits<{
  (e: 'change', code: PhoneCode): void
}>()

const loadedCodes = computed(() => {
  return codes || []
})
</script>