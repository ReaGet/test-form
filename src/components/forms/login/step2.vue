<template>
  <div class="flex flex-col gap-16 mt-12">
    <Select
      :items="session?.channels || []"
      :placeholder="t('step2.delivery_method')"
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
      <Input name="phone" :placeholder="t('step2.heading')" :disabled="isLoading" @input="handleInput" :error="error" />
      <div class="absolute top-1/2 right-6 -translate-y-1/2 text-[1.4rem]">
        <button
          v-if="!isWaitingCode"
          class="text-primary hover:text-primary-hover"
          @click.prevent="handleSend"
        >{{ t('send') }}</button>
        <span v-else-if="countdownValue && countdownValue > 0" class="text-[#9E9E9E] pointer-events-none">0:{{ formatCountdown(countdownValue) }}</span>
      </div>
    </div>
    <div class="flex gap-4">
      <button
        @click="prevStep"
        class="flex justify-center items-center gap-4 h-[5.5rem] w-full mt-4 text-primary hover:text-primary-hover text-[1.6rem] rounded-lg transition-colors hover:bg-[#f8f8f8]"
      >
        <IconArrowLeft className="fill-current" color="''" :width="16" :height="16"/> {{ t('back') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue' 
import IconArrowLeft from '../../icons/i-arrow-left.vue'
import Select from '../../ui/select.vue'
import Input from '../../ui/input.vue'
import { injectLoginContext } from './form.vue'
import { sendCode, type SendCodePayload, type ChannelType, checkCode } from '../../../queries/signIn'
import { useI18n} from 'vue-i18n'

const { t } = useI18n()

const isWaitingCode = ref(false)
const countdownValue = ref(0)
const timerId = ref<ReturnType<typeof setInterval> | null>(null)
const currentChannel = ref<ChannelType|null>()
const isLoading = ref<boolean>(false)
const error = ref('')

const { prevStep, session } = injectLoginContext()

watchEffect(() => {
  countdownValue.value = currentChannel.value?.timeout || 0
})

watchEffect(() => {
  currentChannel.value = session.value?.channels?.[0]
})

const handleInput = (value: string) => {
  if (value.length < 4 || isLoading.value || !parseInt(value)) return
  error.value = ''
  isLoading.value = true
  checkCode({
    session_id: session.value!.session_id,
    code: value
  })
  .then(data => {
    if ('success' in data! && !data.success && 'error' in data!) {
      error.value = data.error as string
      return
    }
    console.log(data)
  })
  .finally(() => {
    isLoading.value = false
  })
}

const handleSend = async () => {
  if (countdownValue.value > 0) {
    startCountdown()
    return
  }
  startCountdown()
  sendCode(getSendCodePayload()).then(data => {
    console.log(data)
  })
}

const getSendCodePayload = (): SendCodePayload => {
  return {
    session_id: session.value?.session_id || '',
    type: currentChannel.value?.type || ''
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
  if (timerId.value)
    clearInterval(timerId.value)
  countdownValue.value = currentChannel.value?.timeout || 0
  isWaitingCode.value = false
}

const formatCountdown = (value: number) => {
  return value < 10 ? `0${value}` : value
}
</script>