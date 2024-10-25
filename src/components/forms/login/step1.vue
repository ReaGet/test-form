<template>
  <div class="flex flex-col gap-16 mt-12">
    <PhoneCodeSelector @change="code => phoneCode = code" />
    <Input
      name="phone"
      placeholder="Номер телефона"
      v-model="phoneValue"
      @input="handleInput"
      :error="error"
    />
    <div class="flex gap-4">
      <button
        @click="handleClick"
        class="h-[5.5rem] w-full mt-4 bg-primary hover:bg-primary-hover text-[1.6rem] text-white rounded-lg transition-colors"
      >Продолжить</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import PhoneCodeSelector from '../../phone-code-selector.vue'
import Input from '../../ui/input.vue'
import { ref, watchEffect } from 'vue'
import { PhoneCode } from '../../../types'
import { injectLoginContext } from './form.vue'

const phoneCode = ref<PhoneCode>()
const phoneValue = ref('')
const error = ref('')

const { nextStep } = injectLoginContext()

watchEffect(() => {
  const code = phoneCode.value
  if (!code) return

  phoneValue.value = `${code.dial_code} `
})

const handleClick = () => {
  validate()
}

const handleInput = () => {
  validate()
}

const validate = () => {
  if (!phoneValue.value.trim().length)
    return error.value = 'Значение не должно быть пустым'

  error.value = ''
}
</script>