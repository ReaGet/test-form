<template>
  <svg :class="className" :width="width" :height="height" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.98438 9.98438H17.0156L12 15L6.98438 9.98438Z" :fill="color"/>
  </svg>
</template>

<script setup lang="ts">
import { IconProps } from '../../types'

withDefaults(defineProps<IconProps>(), {
  width: 24,
  height: 24,
  color: '#9E9E9E',
  className: '',
})
</script>