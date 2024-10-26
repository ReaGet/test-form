<template>
  <div class="flex flex-col gap-16 mt-12">
    <Select
      :items="channelList"
      placeholder="Способ получения кода"
      :default-value="channel || channelList[0]"
      @change="value => channel = value"
    >
      <template v-slot:selected="{ value }">
      {{ value?.name || '' }}
      </template>

      <template v-slot:default="item">
        {{ item.name }}
      </template>
    </Select>
    <div class="relative">
      <Input name="phone" placeholder="Введите код" v-model="codeValue" />
      <div class="absolute top-1/2 right-6 -translate-y-1/2 text-[1.4rem]">
        <button
          v-if="!isWaitingCode"
          class="text-primary hover:text-primary-hover"
          @click.prevent="handleSend"
        >Отправить</button>
        <span v-else class="text-[#9E9E9E] pointer-events-none">0:{{ formatCountdown(countdownValue) }}</span>
      </div>
    </div>
    <div class="flex gap-4">
      <button
        @click="prevStep"
        class="flex justify-center items-center gap-4 h-[5.5rem] w-full mt-4 text-primary hover:text-primary-hover text-[1.6rem] rounded-lg transition-colors hover:bg-[#f8f8f8]"
      >
        <IconArrowLeft className="fill-current" color="''" :width="16" :height="16"/> Назад
      </button>
      <button
        class="h-[5.5rem] w-full mt-4 bg-primary hover:bg-primary-hover text-[1.6rem] text-white rounded-lg transition-colors"
      >Продолжить</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Select from '../../ui/select.vue'
import Input from '../../ui/input.vue'
import { ref, watchEffect } from 'vue'
import { ChannelType } from '../../../types';
import { injectLoginContext } from './form.vue';
// import { useFetch, useLazyFetch } from '../../../hooks/use-fetch';

const channelList: ChannelType[] = [
  { name: 'WhatApp', icon: 'wa' },
  { name: 'Telegram', icon: 'tg' },
  { name: 'Viber', icon: 'vb' },
  { name: 'SMS', icon: 'sms' },
]
const countdownInitValue = 30
const codeValue = ref('')
const isWaitingCode = ref(false)
const countdownValue = ref(countdownInitValue)
const timerId = ref<ReturnType<typeof setInterval> | null>(null)

const { prevStep } = injectLoginContext()
const apiUrl = 'http://api.kod.mobi/v2'

// const [$fetch] = useLazyFetch(`${apiUrl}/create`, {
//   method: 'POST'
// })

const { channel } = injectLoginContext()

const handleSend = async () => {
  startCountdown()
}

const startCountdown = () => {
  if (isWaitingCode.value) return

  isWaitingCode.value = true
  timerId.value = setInterval(() => {
    countdownValue.value--
    if (countdownValue.value < 0) resetCoundown()
  }, 1000)
}

const resetCoundown = () => {
  clearInterval(timerId.value as number)
  countdownValue.value = countdownInitValue
  isWaitingCode.value = false
}

const formatCountdown = (value: number) => {
  return value < 10 ? `0${value}` : value
}

watchEffect(() => {
  // const code = channel.value
  // if (!code) return
  // console.log(code.name)
})
</script>