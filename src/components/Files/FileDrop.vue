<template>
  <div
    :id="`fileDropDragZone-${id}`"
    class="file-drop"
    @dragover.prevent="handleDragOver"
    @dragleave.prevent="handleDragLeave"
    @drop.prevent="handleDrop"
    :class="{ 'file-drop--active': isDragging }"
  >
    <div style="display: flex; justify-content: center; align-items: center; flex-direction: column">
      <input
        :id="`fileDropInput-${id}`"
        type="file"
        :accept="accept"
        :multiple="multiple"
        @change="onFileSelect"
        style="display: none"
      />
      <span v-if="!isDragging">Arrastre los archivos aquí o</span>
      <span v-else>¡Suelte los archivos aquí!</span>
      <a href="" class="file-link" @click.prevent="handleClick">
        <Icon icon="fas fa-cloud-upload-alt" />
        Selecciona un archivo
      </a>
    </div>
  </div>
</template>

<script>
  import { defineComponent, ref } from 'vue';
  import uuid from '@/utils/uuid.js';
  import Icon from '@/components/Icon/Icon.vue';

  export default defineComponent({
    name: 'FileDrop',
    components: {
      Icon,
    },
    props: {
      id: { type: String, default: uuid() },
      multiple: {
        type: Boolean,
        default: true, // Permite múltiples archivos por defecto
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      maxFileSize: {
        type: Number, //MB
        default: null,
      },
      accept: {
        type: String,
        default: '',
      },
    },
    emits: ['files-added'],
    setup(props, { emit }) {
      const isDragging = ref(false);
      const handleDragOver = () => {
        isDragging.value = true;
      };
      const handleDragLeave = () => {
        isDragging.value = false;
      };
      const handleDrop = event => {
        isDragging.value = false;
        const files = Array.from(event.dataTransfer.files);
        emit('files-added', files);
      };
      const onFileSelect = event => {
        const files = Array.from(event.target.files);
        emit('files-added', files);
      };

      const handleClick = () => {
        const fileDropInput = document.getElementById(`fileDropInput-${props.id}`);
        fileDropInput.click();
      };

      return {
        props,
        isDragging,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        onFileSelect,
        handleClick,
      };
    },
  });
</script>

<style scoped>
  .file-drop {
    border: 2px dashed #007bff;
    border-radius: 8px;
    padding: 2rem;
    text-align: center;
    transition: background-color 0.3s ease;
    color: #333;
  }

  .file-drop--active {
    background-color: #f0f8ff;
    border-color: #727272;
  }

  .file-link {
    color: #007bff;
    text-decoration: none;
    cursor: pointer;
  }

  .file-input {
    display: none;
  }
</style>
