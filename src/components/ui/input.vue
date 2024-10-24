<template>
  <label class="label" :for="name">
    <input
      :id="name"
      class="input"
      :name="name"
      :type="type"
      :placeholder="placeholder"
    />
  </label>
</template>

<script setup>

const props = defineProps({
  type: {
    default: 'text',
    required: false,
    type: String,
  },
  name: String,
  placeholder: {
    default: '',
    required: false,
    type: String
  },
})

</script>

<style lang="scss" scoped>
.input {
  width: 100%;
  height: 55px;
  padding: 15px;
  font-size: 1.6rem;
  border: 1px solid var(--secondary);
  border-radius: var(--rounded);
  outline: none;

  &::placeholder {
    color: #9E9E9E;
  }
}
</style>