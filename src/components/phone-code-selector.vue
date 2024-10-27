<template>
  <Select
    :items="loadedCodes"
    :default-value="defaultValue"
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
import { CountryCodeType } from '../types';
import { computed } from 'vue'
import { injectLoginContext } from './forms/login/form.vue';

const { countryCodeList } = injectLoginContext()

defineProps<{
  defaultValue?: CountryCodeType | undefined | null
}>()

const emit = defineEmits<{
  (e: 'change', code: CountryCodeType): void
}>()

const loadedCodes = computed(() => {
  return countryCodeList || []
})
</script>