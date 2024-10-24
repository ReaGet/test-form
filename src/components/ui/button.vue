<template>
  <button class="button" type="">
    <slot />
  </button>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 55px;
  width: 100%;
  background-color: var(--primary);
  border-radius: var(--rounded);
  font-size: 1.4rem;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>