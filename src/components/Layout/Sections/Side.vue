<template>
  <div ref="container" v-if="isSmallDevice">
    <span
      class="toggle-button"
      :class="[`toggle-button-${position}`]"
      ref="toggleButton"
      @click="handleToggle"
      v-if="showToggleButton"
    >
      <Icon :icon="icon" :rotation="isOpen ? null : 180" />
    </span>
    <Overlay ref="overlayRef" :open="isOpen" :position="position" @toggle="isOpen = $event.isOpen">
      <slot></slot>
    </Overlay>
  </div>
  <div ref="container" class="side" v-else>
    <span class="toggle-button" ref="toggleButton" @click="handleToggle" v-if="showToggleButton">
      <Icon :icon="icon" :rotation="isOpen ? null : 180" />
    </span>
    <slot></slot>
  </div>
</template>

<script>
  /* eslint-disable */
  import { defineComponent, ref, watch, onMounted, computed } from 'vue';
  import { breakpointsBootstrapV5, useBreakpoints } from '@vueuse/core';
  import Icon from '@/components/Icon/Icon.vue';
  import Overlay from '@/components/Layout/Overlay.vue';

  export default defineComponent({
    name: 'Side',
    components: { Overlay, Icon },
    props: {
      position: { type: String, default: 'left' } /* left or right*/,
      open: { type: Boolean, default: true },
      showToggleButton: { type: Boolean, default: true },
    },
    emits: ['toggle'],
    setup(props, { expose, emit }) {
      const container = ref(null);
      const toggleButton = ref(null);
      const overlayRef = ref(null);

      const breakpoints = useBreakpoints(breakpointsBootstrapV5);
      const isSmallDevice = breakpoints.smallerOrEqual('md');

      const isOpen = ref(props.open);

      const toggle = () => {
        if (isOpen.value) {
          if (isSmallDevice.value) {
            overlayRef.value.open();
          } else {
            container.value.classList.remove('hidden');
            toggleButton.value.classList.remove(`toggle-button-${props.position}-hidden`);
            toggleButton.value.classList.add(`toggle-button-${props.position}-show`);
          }
        } else {
          if (isSmallDevice.value) {
            overlayRef.value.close();
          } else {
            container.value.classList.add('hidden');
            toggleButton.value.classList.remove(`toggle-button-${props.position}-show`);
            toggleButton.value.classList.add(`toggle-button-${props.position}-hidden`);
          }
        }
        emit('toggle', { isOpen: isOpen.value });
      };

      watch(isOpen, toggle);
      watch(isSmallDevice, () => {
        setTimeout(() => {
          toggle();
        }, 10);
      });

      const icon = computed(() => {
        return `fa-solid fa-circle-chevron-${props.position}`;
      });

      const handleToggle = () => {
        isOpen.value = !isOpen.value;
      };
      const open = () => {
        isOpen.value = false;
      };
      const close = () => {
        isOpen.value = true;
      };

      onMounted(() => {
        toggle();
      });

      expose({ open, close, toggle, isOpen });

      return { container, isOpen, toggleButton, handleToggle, isSmallDevice, props, overlayRef, icon };
    },
  });
</script>

<style scoped>
  .side {
    width: 20%;
    overflow: hidden;
    transition: width 0.3s;
    position: relative;
  }

  .hidden {
    width: 0;
  }

  .toggle-button {
    font-size: 25px;
    color: #a2a3a4;
  }

  .toggle-button-left {
    position: fixed;
    left: 0;
  }

  .toggle-button-right {
    position: fixed;
    right: 0;
  }

  .toggle-button-left-show {
    right: 5px;
    position: absolute;
  }

  .toggle-button-left-hidden {
    position: fixed;
    z-index: 1;
    left: 5px;
  }

  .toggle-button-right-show {
    left: 5px;
    position: absolute;
  }

  .toggle-button-right-hidden {
    position: fixed;
    z-index: 1;
    right: 5px;
  }
</style>
