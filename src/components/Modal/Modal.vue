<template>
  <Overlay
    ref="overlayRef"
    :overlayContentClass="['modal-overlay-content', modalPosition]"
    :defaultOpen="defaultOpen"
    :closeOnBackdropClick="closeOnBackdropClick"
    :position="openPosition"
    :showClose="false"
    @toggle="isOpen = $event.isOpen"
  >
    <div class="modal-container" :class="modalSize" @click.stop>
      <slot></slot>
    </div>
  </Overlay>
</template>

<script>
  /* eslint-disable */
  import Overlay from '@/components/Layout/Overlay.vue';
  import { defineComponent, ref, computed, watch, provide } from 'vue';
  export default defineComponent({
    name: 'Modal',
    props: {
      defaultOpen: {
        type: Boolean,
        default: false,
      },
      size: {
        type: String,
        default: 'md', // Default size
        validator: value => ['sm', 'md', 'lg', 'fullscreen'].includes(value),
      },
      closeOnBackdropClick: {
        type: Boolean,
        default: true,
      },
      position: {
        type: String,
        default: 'center',
      },
      openPosition: {
        type: String,
        default: 'center',
      },
    },
    components: {
      Overlay,
    },
    emits: ['close', 'open'],

    setup(props, { emit, expose }) {
      const overlayRef = ref(null);
      const isOpen = ref(props.defaultOpen);

      watch(isOpen, value => {
        if (value) {
          overlayRef.value.open();
          emit('open');
        } else {
          overlayRef.value.close();
          emit('close');
        }
      });

      const modalSize = computed(() => `modal-${props.size}`);
      const modalPosition = computed(() => `modal-position-${props.position}`);

      const open = () => {
        isOpen.value = true;
      };

      const close = () => {
        isOpen.value = false;
      };

      provide('Modal', { close, open });

      expose({
        open,
        close,
      });

      return {
        modalPosition,
        modalSize,
        isOpen,
        overlayRef,
        open,
        close,
      };
    },
  });
</script>
<style>
  .modal-overlay-content {
    display: flex;
    justify-content: center;
    padding: 20px;
  }
  /* Positions */
  .modal-position-center {
    align-items: center;
  }
  .modal-position-start {
    align-items: flex-start;
  }
  .modal-position-end {
    align-items: flex-end;
  }
</style>
<style scoped>
  /* Modal Container */

  .modal-container {
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  /* Sizes */
  .modal-sm {
    width: 300px;
  }
  .modal-md {
    width: 500px;
  }
  .modal-lg {
    width: 800px;
  }
  .modal-xl {
    width: 1140px;
  }
  .modal-fullscreen {
    width: 100%;
    height: 100%;
  }
</style>
