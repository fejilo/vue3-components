<template>
  <div :class="overlayClasses" @click.prevent="handleClick">
    <button v-if="showClose" class="close-button" @click.prevent="close">&times;</button>
    <div class="overlay-content" :class="overlayContentClass">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import { defineComponent, computed, ref, watch, onBeforeUnmount } from 'vue';
  export default defineComponent({
    name: 'Overlay',
    props: {
      defaultOpen: { type: Boolean, default: false },
      position: { type: String, default: null },
      showClose: { type: Boolean, default: true },
      closeOnBackdropClick: { type: Boolean, default: false },
      blockPage: { type: Boolean, default: true },
      overlayContentClass: { type: [String, Array], default: '' },
    },
    emits: ['toggle'],
    setup(props, { emit, expose }) {
      const overlayClasses = computed(() => {
        let classes = 'overlay';
        switch (props.position) {
          case 'left':
            classes += ' overlay-left';
            if (isOpen.value) classes += ' overlay-show-lr';
            break;
          case 'right':
            classes += ' overlay-right';
            if (isOpen.value) classes += ' overlay-show-lr';
            break;
          case 'top':
            classes += ' overlay-top';
            if (isOpen.value) classes += ' overlay-show-tb';
            break;
          case 'bottom':
            classes += ' overlay-bottom';
            if (isOpen.value) classes += ' overlay-show-tb';
            break;
          default:
            classes += ' overlay-default';
            if (isOpen.value) classes += ' overlay-show';
            else classes += ' overlay-hidden';
            break;
        }
        return classes;
      });

      const isOpen = ref(props.defaultOpen);
      const blockPageActions = () => {
        if (props.blockPage) {
          if (isOpen.value) document.body.style.overflow = 'hidden';
          else document.body.style.overflow = '';
        }
      };

      watch(isOpen, value => {
        blockPageActions();
        emit('toggle', { isOpen: value });
      });

      onBeforeUnmount(() => {
        if (props.blockPage) document.body.style.overflow = '';
      });

      const open = () => (isOpen.value = true);
      const close = () => (isOpen.value = false);
      const handleClick = () => {
        if (props.closeOnBackdropClick) close();
      };

      expose({ isOpen, open, close });

      return { props, isOpen, overlayClasses, close, handleClick };
    },
  });
</script>

<style scoped>
  .overlay {
    background-color: #3b3b3ba6;
    position: fixed;
    z-index: 1050;
    display: flex;
    width: 100dvw;
    height: 100dvh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .overlay-default {
    opacity: 0;
    visibility: hidden;
    transition: opacity 1s, visibility 1s;
  }

  .overlay-top {
    transition: transform 0.3s ease-in-out;
    transform: translateY(-100%);
  }

  .overlay-bottom {
    transition: transform 0.3s ease-in-out;
    transform: translateY(100%);
  }

  .overlay-left {
    transition: transform 0.3s ease-in-out;
    transform: translateX(-100%);
  }

  .overlay-right {
    transition: transform 0.3s ease-in-out;
    transform: translateX(100%);
  }

  .overlay-content {
    width: 100%;
    height: 100%;
  }

  .overlay-show-lr {
    transform: translateX(0) !important;
  }

  .overlay-show-tb {
    transform: translateY(0) !important;
  }

  .overlay-show {
    opacity: 1 !important;
    visibility: visible !important;
  }

  .overlay-hidden {
    opacity: 0 !important;
    display: none !important;
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 40px;
    cursor: pointer;
    color: #e6e6e6;
    transition: color 0.3s;
  }

  .close-button:hover {
    color: #ffffff;
  }
</style>
