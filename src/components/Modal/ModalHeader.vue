<template>
  <header class="modal-header">
    <h2 class="modal-title" v-if="!hasDefaultSlot && title">{{ title }}</h2>
    <slot></slot>
    <button v-if="showClose" class="modal-close" @click.prevent="close">&times;</button>
  </header>
</template>

<script>
  import { defineComponent, inject, useSlots } from 'vue';

  export default defineComponent({
    name: 'ModalHeader',
    props: {
      title: {
        type: String,
        default: null,
      },
      showClose: {
        type: Boolean,
        default: true,
      },
    },
    setup(props, { expose }) {
      const slots = useSlots();
      const hasDefaultSlot = () => slots.default && slots.default().length > 0;
      const { open, close } = inject('Modal');
      expose({
        open,
        close,
      });
      return {
        props,
        hasDefaultSlot,
        close,
      };
    },
  });
</script>

<style scoped>
  /* Header */
  .modal-header {
    padding: 16px;
    background: #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
  }
  .modal-title {
    margin: 0;
    font-size: 18px;
  }
  .modal-close {
    background: none;
    border: none;
    font-size: 30px;
    cursor: pointer;
  }
</style>
