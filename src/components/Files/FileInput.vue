<template>
  <div>
    <FileDrop :accept="accept" @files-added="handleFilesAdded" />
    <FileList
      :fileList="cFiles"
      :showActionButtons="true"
      :showSetButton="false"
      :showEditButton="false"
      @delete="handleFileDelete"
    />
  </div>
</template>

<script>
  import { defineComponent, ref, computed, watch } from 'vue';
  import FileDrop from '@/components/Files/FileDrop.vue';
  import FileList from '@/components/Files/FileList.vue';
  import uuid from '@/utils/uuid.js';

  export default defineComponent({
    name: 'FileInput',
    props: {
      modelValue: {
        type: Array,
        default: () => {
          const dt = new DataTransfer();
          return dt.files;
        },
        validator: val => val.every(file => file instanceof File),
      },
      id: { type: String, default: uuid(8) },
      name: { type: String, default: null },
      label: { type: String, default: null },
      accept: {
        type: String,
        default: '',
      },
    },
    components: {
      FileDrop,
      FileList,
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
      const files = ref(props.modelValue);

      watch(
        () => props.modelValue,
        nv => {
          files.value = nv;
        }
      );

      const cFiles = computed(() => {
        let fileList = Array.from(files.value);
        return fileList.map(file => {
          return {
            name: file.name,
            src: URL.createObjectURL(file),
          };
        });
      });

      const handleFilesAdded = evt => {
        files.value = mergeFilesUnique(files.value, evt);
        emitEvents();
      };

      const mergeFilesUnique = (files1, files2) => {
        const fileMap = new Map();
        [...files1, ...files2].forEach(file => {
          const key = `${file.name}-${file.size}`;
          if (!fileMap.has(key)) {
            fileMap.set(key, file);
          }
        });
        return Array.from(fileMap.values());
      };

      const handleFileDelete = ({ index }) => {
        files.value.splice(index, 1);
        emitEvents();
      };

      const emitEvents = () => {
        emit('update:modelValue', files.value);
        emit('change', files.value);
      };

      return {
        handleFilesAdded,
        handleFileDelete,
        cFiles,
      };
    },
  });
</script>
