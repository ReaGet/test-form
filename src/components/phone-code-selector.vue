<template>
  <Select
    :items="loadedCodes"
    filteringKey="name"
    placeholder="Страна"
    @change="console.log "
  >
    <template v-slot:selected="{ value }">
      {{ (value as PhoneCode)?.name || '' }}
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

const codesUrl = 'https://gmmdf.free.beeceptor.com/codes'

const { isLoading, data: codes } = useFetch<PhoneCode[]>(codesUrl)

const loadedCodes = computed(() => {
  return codes || []
})
</script>