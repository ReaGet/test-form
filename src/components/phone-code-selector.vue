<template>
  <Select
    :items="codes"
    placeholder="Страна"
  ></Select>
</template>

<script setup lang="ts">
import Select from './ui/select.vue';
import { PhoneCode } from '../types';
import { useFetch } from '../hooks/use-fetch'

const codesUrl = 'https://gmmdf.free.beeceptor.com/codes'

const { isLoading, data: codes } = useFetch<PhoneCode[]>(codesUrl)
</script>