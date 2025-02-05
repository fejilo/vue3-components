<template>
  <FileList
    ref="refFileList"
    :fileList="fileList"
    :showActionButtons="true"
    :showSetButton="false"
    :showEditButton="false"
  />
  {{ files }}
  <FileInput v-model="files" @change="handleChange" accept="image/*" />
</template>

<script>
  /* eslint-disable */
  import FileList from '@/components/Files/FileList.vue';
  import FileInput from '@/components/Files/FileInput.vue';

  import { ref, onMounted, watch } from 'vue';

  export default {
    name: 'FileView',
    components: {
      FileList,
      FileInput,
    },
    setup() {
      const refFileList = ref(null);
      const files = ref([]);
      const fileList = ref([
        {
          src: 'https://pdfobject.com/pdf/sample.pdf',
          name: 'sample.pdf',
        },
        {
          src: 'https://fastly.picsum.photos/id/853/200/300.jpg?hmac=-vUTO-GMdNHJbNIJrZtC4jsw0ybpHVgCrtWkg1DZugg',
          name: 'sample.jpg',
        },
      ]);

      const handleChange = evt => {
        console.log(evt);
      };

      onMounted(() => {
        refFileList.value.setLoading(true);
        setTimeout(() => {
          refFileList.value.setLoading(false);
        }, 2000);
      });

      return {
        fileList,
        refFileList,
        files,
        handleChange,
      };
    },
  };
</script>

<style scoped></style>
