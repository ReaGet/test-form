<template>
  <div class="flex flex-col gap-16 mt-12">
    <Select
      :items="session?.channels || []"
      placeholder="Способ получения кода"
      :default-value="currentChannel"
      @change="value => currentChannel = value"
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
        <span v-else-if="countdownValue && countdownValue > 0" class="text-[#9E9E9E] pointer-events-none">0:{{ formatCountdown(countdownValue) }}</span>
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
import { ref, computed, watchEffect } from 'vue' 
import IconArrowLeft from '../../icons/i-arrow-left.vue'
import Select from '../../ui/select.vue'
import Input from '../../ui/input.vue'
import { injectLoginContext } from './form.vue'
import { sendSession, type SendSessionPayload, type ChannelType } from '../../../queries/signIn'

const codeValue = ref('')
const isWaitingCode = ref(false)
const countdownValue = ref(0)
const timerId = ref<ReturnType<typeof setInterval> | null>(null)
const currentChannel = ref<ChannelType|null>()

const { prevStep, session } = injectLoginContext()

watchEffect(() => {
  console.log(currentChannel.value)
  countdownValue.value = currentChannel.value?.timeout || 0
})

watchEffect(() => {
  console.log(currentChannel.value)
  currentChannel.value = session.value?.channels[0]
})

// const defaultValue = computed(() => {
//   return session.value?.channels[0]
// })

const handleSend = async () => {
  console.log(countdownValue)
  if (countdownValue.value > 0) {
    startCountdown()
    return
  }
  startCountdown()
  sendSession(getPayload()).then((data) => {
    console.log(data)
  })
}

const getPayload = (): SendSessionPayload => {
  return {
    session_id: session.value!.session_id,
    type: currentChannel.value!.type
  }
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
  countdownValue.value = currentChannel.value!.timeout
  isWaitingCode.value = false
}

const formatCountdown = (value: number) => {
  return value < 10 ? `0${value}` : value
}
</script>