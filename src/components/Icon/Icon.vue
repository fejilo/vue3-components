<template>
  <font-awesome-icon :icon="icon" :size="size" :rotation="rotation" :class="[animation]" />
</template>

<script>
  /* eslint-disable */
  import { defineComponent } from 'vue';
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

  import { fas } from '@fortawesome/free-solid-svg-icons';
  import { far } from '@fortawesome/free-regular-svg-icons';
  import { fab } from '@fortawesome/free-brands-svg-icons';
  library.add(fas, far, fab);
  export default defineComponent({
    name: 'Icon',
    props: {
      icon: { type: String, required: true },
      size: { type: String, default: null },
      rotation: { type: [Number, String], default: null },
      animation: { type: String, default: null },
    },
    components: {
      FontAwesomeIcon,
    },
    setup(props) {
      return { props };
    },
  });
</script>
