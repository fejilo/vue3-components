<template>
  <div class="file-viewer-container" v-if="localFileList.length > 0 && activeFile">
    <span class="file-viewer-button" v-if="localFileList.length > 1" @click="previous">
      <Icon icon="fas fa-chevron-left" />
    </span>
    <div class="file-viewer-file">
      <template v-if="activeFile.type === 'audio'">
        <AudioPlayer :src="activeFile.src" />
      </template>
      <template v-else-if="activeFile.type === 'video'">
        <VideoPlayer :src="activeFile.src" />
      </template>
      <template v-else-if="activeFile.type === 'image'">
        <Image :src="activeFile.src" />
      </template>
      <template v-else-if="activeFile.type === 'pdf'">
        <PDFViewer :src="activeFile.src" />
      </template>
      <template v-else>
        <div class="file-viewer-invalid">
          <h2>Invalid file type {{ activeFile.type }}</h2>
        </div>
      </template>
    </div>
    <span class="file-viewer-button" v-if="localFileList.length > 1" @click="next">
      <Icon icon="fas fa-chevron-right" />
    </span>
  </div>
</template>

<script>
  /* eslint-disable */
  import getFileType from '@/utils/getFileType.js';
  import AudioPlayer from '@/components/Files/AudioPlayer.vue';
  import Image from '@/components/Files/Image.vue';
  import VideoPlayer from '@/components/Files/VideoPlayer.vue';
  import PDFViewer from '@/components/Files/PDFViewer.vue';
  import Icon from '@/components/Icon/Icon.vue';

  import { defineComponent, ref, computed, watch } from 'vue';
  export default defineComponent({
    name: 'FileViewer',
    components: {
      AudioPlayer,
      Image,
      VideoPlayer,
      PDFViewer,
      Icon,
    },
    props: {
      fileList: {
        type: Array,
        required: true, // Array of objects with src and (file_name|name) properties
      },
      defaultIndex: {
        type: Number,
        default: 0,
      },
    },
    setup(props, { expose }) {
      const localFileList = ref(props.fileList);
      const currentIndex = ref(props.defaultIndex);

      const setFileList = fileList => {
        localFileList.value = fileList;
      };

      const getFileList = () => {
        return localFileList.value;
      };

      watch(
        () => props.fileList,
        nv => {
          setFileList(nv);
        }
      );

      const activeFile = computed(() => {
        const activeFile = localFileList.value[currentIndex.value];
        const fileName = activeFile.file_name || activeFile.name || null;
        const type = fileName ? getFileType(fileName.split('.').pop()) : null;
        return { ...activeFile, type: type };
      });

      const previous = () => {
        const index = currentIndex.value - 1;
        if (index >= 0) {
          currentIndex.value = index;
        } else {
          currentIndex.value = localFileList.value.length - 1;
        }
      };

      const next = () => {
        const index = currentIndex.value + 1;
        if (index < localFileList.value.length) {
          currentIndex.value = index;
        } else {
          currentIndex.value = 0;
        }
      };

      const getCurrentIndex = () => {
        return currentIndex.value;
      };

      const setCurrentIndex = val => {
        if (typeof val !== 'number' || val < 0 || val >= localFileList.value.length) {
          return;
        }
        currentIndex.value = val;
      };

      expose({
        getCurrentIndex,
        setCurrentIndex,
        setFileList,
        getFileList,
      });

      return {
        localFileList,
        activeFile,
        previous,
        next,
      };
    },
  });
</script>

<style scoped>
  .file-viewer-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  .file-viewer-file {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 100%;
    width: 100%;
  }
  .file-viewer-button {
    width: 45px;
    height: 45px;
    background-color: #7b7b7b;
    border-radius: 50%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    cursor: pointer;
  }
  .file-viewer-button:hover {
    background: rgb(165, 165, 165);
  }

  .file-viewer-invalid {
    display: flex;
    align-items: center;
    color: whitesmoke;
  }

  img {
    max-width: 100%;
    max-height: 85%;
    object-fit: contain;
    display: block;
  }
</style>
