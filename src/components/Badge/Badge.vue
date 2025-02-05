<template>
  <font-awesome-layers :class="lClass">
    <font-awesome-icon :icon="icon" />
    <font-awesome-layers-text
      counter
      :value="counterValue"
      :position="counterPosition"
      :style="counterStyle"
      :class="counterClass"
    />
  </font-awesome-layers>
</template>

<script>
  /* eslint-disable */
  import { defineComponent, ref } from 'vue';
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome';

  import { fas } from '@fortawesome/free-solid-svg-icons';
  import { far } from '@fortawesome/free-regular-svg-icons';
  import { fab } from '@fortawesome/free-brands-svg-icons';
  library.add(fas, far, fab);
  export default defineComponent({
    name: 'Badge',
    props: {
      icon: { type: String, required: true },
      class: { type: String, default: 'fa-2x' },
      counterValue: { type: String, default: 0 },
      counterPosition: { type: String, default: 'top-right' }, //bottom-left, bottom-right, top-left, top-right
      counterStyle: { type: Array, default: () => [] },
      counterClass: { type: Array, default: () => ['counter-value-default'] },
    },
    components: {
      FontAwesomeIcon,
      FontAwesomeLayers,
      FontAwesomeLayersText,
    },
    setup(props) {
      const lClass = ref(props.class);
      return { lClass };
    },
  });
</script>

<style scoped>
  .counter-value-default {
    background: Tomato;
    font-size: 40px;
  }
</style>
