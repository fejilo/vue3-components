<template>
  <img :src="src" :alt="alt" @error="handleError" @load="handleLoad" />
</template>

<script>
  /* eslint-disable */
  import { ref } from 'vue';
  export default {
    name: 'Image',
    props: {
      src: {
        type: String,
        required: true,
      },
      alt: {
        type: String,
        default: 'Imagen no disponible',
      },
    },
    emits: ['error', 'loaded'],
    setup(props, { emit }) {
      const loading = ref(true);

      const handleError = evt => {
        loading.value = false;
        emit('error', evt);
      };

      const handleLoad = () => {
        loading.value = false;
        emit('loaded', true);
      };

      return {
        props,
        loading,
        handleError,
        handleLoad,
      };
    },
  };
</script>
