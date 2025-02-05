<template>
<main class="middle">
  <slot></slot>
</main>
</template>
    
<script>
/* eslint-disable */
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Middle',
  props:{}
}) 
</script>
    
<style scoped>
.middle {
  flex: 1;
  overflow: hidden;
}
</style>