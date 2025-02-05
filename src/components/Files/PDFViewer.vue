<template>
  <div class="pdf-viewer" :style="{ height: height, width: width }">
    <iframe :src="src" :width="width" :height="height" frameborder="0"></iframe>
  </div>
</template>

<script>
  export default {
    name: 'PDFViewer',
    props: {
      src: {
        type: String,
        required: true,
      },
      width: {
        type: String,
        default: '100%',
      },
      height: {
        type: String,
        default: '900px',
      },
    },
    setup(props) {
      return {
        props,
      };
    },
  };
</script>

<style scoped>
  .pdf-viewer {
    margin: auto;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
</style>
