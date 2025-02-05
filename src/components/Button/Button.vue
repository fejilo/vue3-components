<template>
  <button
    :class="['btn', `btn-${type}`, `btn-${size}`, { 'btn-disabled': disabled || localLoading }]"
    :disabled="disabled || localLoading"
    @click="handleClick"
    @mouseover="handleMouseOver"
    @mouseout="handleMouseOut"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <span v-if="localLoading" class="spinner"></span>
    <slot v-else></slot>
  </button>
</template>

<script>
  /* eslint-disable */
  import { defineComponent, watch, ref } from 'vue';
  export default defineComponent({
    name: 'Button',
    props: {
      type: {
        type: String,
        default: 'primary',
        validator: value => ['primary', 'secondary', 'danger', 'success', 'info', 'warning', 'light', 'dark', 'link'].includes(value),
      },
      size: {
        type: String,
        default: 'md',
        validator: value => ['xs', 'sm', 'md', 'lg'].includes(value),
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      loading: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['click', 'mouseover', 'mouseout', 'focus', 'blur'],
    setup(props, { emit, expose }) {
      const localLoading = ref(props.loading);

      const setLoading = value => {
        if (value) localLoading.value = value;
      };

      watch(
        () => props.loading,
        value => setLoading(value)
      );

      const handleClick = event => {
        if (!props.disabled) emit('click', event);
      };
      const handleMouseOver = event => emit('mouseover', event);
      const handleMouseOut = event => emit('mouseout', event);
      const handleFocus = event => emit('focus', event);
      const handleBlur = event => emit('blur', event);

      expose({ setLoading });

      return {
        handleClick,
        handleMouseOver,
        handleMouseOut,
        handleFocus,
        handleBlur,
        localLoading,
      };
    },
  });
</script>

<style scoped>
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
    position: relative;
  }
  /* Botón deshabilitado */
  .btn-disabled {
    background-color: #e0e0e0;
    color: #9e9e9e;
    cursor: not-allowed;
  }

  /* Efecto de enfoque */
  .btn:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.5);
  }

  /* Spinner */
  .spinner {
    border: 2px solid transparent;
    border-top: 2px solid white;
    border-right: 2px solid white;
    border-radius: 50%;
    width: 1em;
    height: 1em;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
