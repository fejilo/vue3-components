<template>
  <div class="dropdown" v-align-class="align" :id="`dropdown-${id}`">
    <a href="" :class="linkClass" :style="linkStyle" @click.prevent="toogle">
      <slot name="link"></slot>
    </a>
    <div class="dropdown-menu" :id="`dropdown-menu-${id}`" @click="handleMenuClick">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import { defineComponent, ref, watch, onMounted } from 'vue';
  import uuid from '@/utils/uuid.js';

  export default defineComponent({
    name: 'Dropdown',
    props: {
      id: { type: String, default: uuid() },
      open: { type: Boolean, default: false },
      linkClass: { type: Array, default: () => [] }, //'form-select'
      linkStyle: { type: Array, default: () => [] },
      closeOnBlur: { type: Boolean, default: true },
      closeOnClick: { type: Boolean, default: true },
      align: { type: String, default: null }, //left, right, start, end
    },
    emit: ['toogle'],
    directives: {
      alignClass: {
        mounted(el, binding) {
          if (binding.value) el.classList.add(`align-${binding.value}`);
        },
        updated(el, binding) {
          if (binding.oldValue) el.classList.remove(`align-${binding.oldValue}`);
          if (binding.value) el.classList.add(`align-${binding.value}`);
        },
      },
    },
    setup(props, { emit, expose }) {
      const isOpen = ref(false);

      watch(isOpen, value => {
        const menu = document.getElementById(`dropdown-menu-${props.id}`);
        console.log(menu);
        if (value) menu.classList.add('show');
        else menu.classList.remove('show');
        emit('toggle', { isOpen: value });
      });

      const open = () => (isOpen.value = true);
      const close = () => (isOpen.value = false);
      const toogle = () => (isOpen.value = !isOpen.value);
      const handleMenuClick = () => {
        if (props.closeOnClick) close();
      };

      onMounted(() => {
        document.addEventListener('click', event => {
          if (props.closeOnBlur) {
            const dropdown = document.getElementById(`dropdown-${props.id}`);
            if (!dropdown.contains(event.target)) {
              close();
            }
          }
        });
        isOpen.value = props.open;
      });

      expose({ isOpen, open, close, toogle });
      return { toogle, props, handleMenuClick };
    },
  });
</script>

<style>
  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-menu {
    display: none;
    position: absolute;
    /* background-color: white; */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1;
    padding: 0;
    margin: 0;
  }

  .show {
    display: block;
  }

  .align-left .dropdown-menu {
    left: 0;
  }

  .align-right .dropdown-menu {
    right: 0;
  }

  .align-center .dropdown-menu {
    left: 50%;
    transform: translateX(-50%);
  }

  .align-top-left .dropdown-menu {
    left: 0;
    bottom: 100%;
  }

  .align-top-right .dropdown-menu {
    right: 0;
    bottom: 100%;
  }

  .align-end .dropdown-menu {
    top: 0;
    left: 100%;
  }

  .align-start .dropdown-menu {
    top: 0;
    right: 100%;
  }
</style>
