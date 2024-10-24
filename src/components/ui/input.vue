<template>
  <label class="relative flex items-center" :for="name">
    <input
      :id="name"
      :class="cn(
        'w-full p-6 border border-black/10 focus:border-black/10 hover:border-black/20 rounded-lg text-[1.6rem] leading-[2.4rem] outline-none',
        className,
        {
          'border-red focus:border-red hover:border-red': error,
        },{
          'border-gray-300': disabled,
        }
      )"
      :name="name"
      :type="type"
      :disabled="disabled"
      @focus="isFocused = true"
      @blur="isFocused = false"
      v-model="model"
    />
    <span
      :class="cn(
        'absolute px-1 left-0 top-1/2 -translate-y-1/2 translate-x-6 text-[1.6rem] text-[#9E9E9E] pointer-events-none transition-transform bg-white',
        {
          'scale-75 translate-x-0 -translate-y-[160%]': isFocused || model.length > 0,
          'text-red': error,
        }
      )"
    >{{ placeholder }}</span>
    <span v-if="error" class="absolute mt-0 left-6 top-full text-[1.2rem] text-red">{{ error }}</span>
  </label>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { cn } from '../../lib/cn'

const isFocused = ref(false)

type InputProps = {
  name: string
  value?: string
  type?: string
  placeholder?: string
  className?: string
  disabled?: boolean
  error?: string
}

withDefaults(defineProps<InputProps>(), {
  value: '',
  type: 'text',
  disabled: false,
  error: ''
})
const model = defineModel<string>({
  default: ''
})
</script>