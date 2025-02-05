// src/components/AudioPlayer.vue
<template>
  <div>
    <audio controls>
      <source :src="src" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'AudioPlayer',
    props: {
      src: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      return {
        props,
      };
    },
  });
</script>
