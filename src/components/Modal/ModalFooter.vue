<template>
  <footer class="modal-footer">
    <slot></slot>
  </footer>
</template>

<script>
  import { defineComponent, inject } from 'vue';

  export default defineComponent({
    name: 'ModalFooter',
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
  /* Footer */
  .modal-footer {
    padding: 16px;
    background: #f5f5f5;
    border-top: 1px solid #ddd;
    display: flex;
    justify-content: flex-end;
    gap: 4px;
  }
</style>
