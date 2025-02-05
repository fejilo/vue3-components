<template>
  <div class="modal-body">
    <slot></slot>
  </div>
</template>

<script>
  import { defineComponent, inject } from 'vue';

  export default defineComponent({
    name: 'ModalBody',
    setup(props, { expose }) {
      const { open, close } = inject('Modal');
      expose({
        open,
        close,
      });
    },
  });
</script>

<style scoped>
  .modal-body {
    padding: 16px;
    flex: 1;
    overflow-y: auto;
  }
</style>
