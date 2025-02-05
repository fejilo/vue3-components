<template>
  <div>
    <div style="display: flex">
      <div style="margin-left: auto" v-if="enableChangeViewType">
        <a href="" class="btn btn-light btn-sm" @click.prevent="setViewType('grid')" v-show="viewType == 'row'">
          <Icon icon="fa fa-th" />
        </a>
        <a href="" class="btn btn-light btn-sm" @click.prevent="setViewType('row')" v-show="viewType == 'grid'">
          <Icon icon="fa fa-bars" />
        </a>
      </div>
    </div>

    <template v-if="loading">
      <div
        style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin: 5px"
        :style="{ height: height, width: width }"
      >
        <span style="font-size: 20px; color: #777777">Loading</span>
        <span style="font-size: 40px; color: #777777"><Icon icon="fas fa-spinner" animation="fa-pulse" /></span>
      </div>
    </template>
    <template v-else>
      <template v-if="cFileList.length == 0">
        <div
          style="display: flex; justify-content: center; align-items: center; margin: 5px"
          :style="{ height: height, width: width }"
        >
          <span style="font-size: 20px; color: #777777">Files not found...</span>
        </div>
      </template>
      <template v-else>
        <template v-if="viewType == 'grid'">
          <div class="file-mosaic" :style="{ 'max-height': height, width: width }">
            <div class="file-mosaic-item" v-for="(file, idx) in cFileList" :key="`file-item-${idx}`">
              <div class="options" v-if="showActionButtons">
                <a href="" style="color: green" class="button" @click.prevent="set(file, idx)" v-if="showSetButton">
                  <Icon icon="fa fa-check" />
                </a>
                <a href="" style="color: blue" class="button" @click.prevent="edit(file, idx)" v-if="showEditButton">
                  <Icon icon="fa fa-edit" />
                </a>
                <a href="" style="color: red" class="button" @click.prevent="remove(file, idx)" v-if="showDeleteButton">
                  <Icon icon="fa fa-trash" />
                </a>
              </div>
              <img :src="file.thumbnail" @click.prevent="handleClick(file, idx)" />
            </div>
          </div>
        </template>
        <template v-else>
          <div class="file-row" :style="{ 'max-height': height, width: width }">
            <div class="file-row-item" v-for="(file, idx) in cFileList" :key="`file-item-${idx}`">
              <div style="width: 60px; height: 60px" class="file-mosaic-item">
                <img :src="file.thumbnail" @click.prevent="handleClick(file, idx)" />
              </div>
              <div style="display: flex; flex-direction: column">
                <a href="" style="text-decoration: none" @click.prevent="handleClick(file, idx)">{{ file.name }}</a>
              </div>
              <div class="options" v-if="showActionButtons">
                <a href="" style="color: green" class="button" @click.prevent="set(file, idx)" v-if="showSetButton">
                  <Icon icon="fa fa-check" />
                </a>
                <a href="" style="color: blue" class="button" @click.prevent="edit(file, idx)" v-if="showEditButton">
                  <Icon icon="fa fa-edit" />
                </a>
                <a href="" style="color: red" class="button" @click.prevent="remove(file, idx)" v-if="showDeleteButton">
                  <Icon icon="fa fa-trash" />
                </a>
              </div>
            </div>
          </div>
        </template>
      </template>
    </template>
  </div>

  <Overlay
    ref="overlayRef"
    :showClose="true"
    :closeOnBackdropClick="false"
    position="left"
    @toggle="handleOverlayToggle"
  >
    <FileViewer
      class="file-list-file-viewer"
      ref="fileViewerRef"
      :fileList="cFileList"
      :key="`fv-${cFileList.length}`"
    />
  </Overlay>
</template>

<script>
  import { defineComponent, ref, computed, watch } from 'vue';
  import getFileType from '@/utils/getFileType.js';
  import getThumbnailByFileType from '@/utils/getThumbnailByFileType.js';
  import Icon from '@/components/Icon/Icon.vue';
  import FileViewer from '@/components/Files/FileViewer.vue';
  import Overlay from '@/components/Layout/Overlay.vue';

  export default defineComponent({
    name: 'FileList',
    components: {
      Icon,
      FileViewer,
      Overlay,
    },
    props: {
      fileList: {
        type: Array,
        required: true, // Array of objects with src and (file_name|name) properties
      },
      defaultViewType: {
        type: String,
        default: 'grid',
      },
      enableChangeViewType: {
        type: Boolean,
        default: true,
      },
      height: {
        type: String,
        default: '100%',
      },
      width: {
        type: String,
        default: '100%',
      },
      showActionButtons: {
        type: Boolean,
        default: false,
      },

      showSetButton: {
        type: Boolean,
        default: true,
      },

      showEditButton: {
        type: Boolean,
        default: true,
      },

      showDeleteButton: {
        type: Boolean,
        default: true,
      },
      openFileViewerOnClick: {
        type: Boolean,
        default: true,
      },
    },
    emits: ['click', 'set', 'edit', 'delete', 'fileViewerIsOpen'],
    setup(props, { emit, expose }) {
      const refFileList = ref(props.fileList);
      const overlayRef = ref(null);
      const fileViewerRef = ref(null);
      const viewType = ref(props.defaultViewType);
      const loading = ref(false);

      const setViewType = vType => {
        if (props.enableChangeViewType) viewType.value = vType;
      };

      const setFileList = fileList => {
        refFileList.value = fileList;
      };

      const getFileList = () => {
        return refFileList.value;
      };

      watch(
        () => props.fileList,
        nv => {
          setFileList(nv);
        }
      );

      const cFileList = computed(() => {
        return refFileList.value.map(file => {
          let thumbnail = null;
          if (file.name) {
            const aux = getThumbnailByFileType(getFileType(file.name.split('.').pop()));
            if (aux) thumbnail = aux;
            else thumbnail = file.src;
          }
          return {
            ...file,
            thumbnail: thumbnail,
          };
        });
      });

      const handleOverlayToggle = ({ isOpen }) => {
        emit('fileViewerIsOpen', isOpen);
      };

      const getViewType = () => viewType.value;

      const handleClick = (file, idx) => {
        if (props.openFileViewerOnClick) {
          overlayRef.value.open();
          fileViewerRef.value.setCurrentIndex(idx);
        }
        emit('click', { file: file, index: idx });
      };

      const set = (file, idx) => emit('set', { file: file, index: idx });
      const edit = (file, idx) => emit('edit', { file: file, index: idx });
      const remove = (file, idx) => emit('delete', { file: file, index: idx });

      const setLoading = val => (loading.value = val);
      const getLoading = () => loading.value;

      expose({
        setViewType,
        getViewType,
        setLoading,
        getLoading,
        setFileList,
        getFileList,
      });

      return {
        props,
        loading,
        viewType,
        refFileList,
        cFileList,
        setViewType,
        handleClick,
        handleOverlayToggle,
        overlayRef,
        fileViewerRef,
        set,
        edit,
        remove,
      };
    },
  });
</script>

<style scoped>
  .file-row {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    margin: 5px;
  }

  .file-row-item {
    display: flex;
    flex-wrap: nowrap;
    gap: 20px;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #838383;
  }

  .file-row-item .options {
    display: flex;
    gap: 10px;
    margin-left: auto;
  }

  .file-mosaic {
    display: flex;
    flex-wrap: wrap;
    /*justify-content: center;
    align-items: center;*/
    margin: 5px;
    /*max-height: ;*/
    overflow-y: auto;
    gap: 10px; /* Espacio entre las imágenes */
  }

  .file-mosaic-item {
    position: relative; /* Necesario para posicionar los botones */
    background-color: #efefef;
    display: flex;
    width: 90px; /* Ajusta el tamaño según sea necesario */
    height: 90px; /* Ajusta el tamaño según sea necesario */
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transition: opacity 0.3s; /* Transición para la transparencia */
  }

  .file-mosaic-item:hover {
    opacity: 0.7; /* Transparencia al pasar el mouse */
  }

  .file-mosaic-item img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain; /* Asegura que la imagen se ajuste correctamente */
    display: block; /* Elimina el espacio inferior */
    cursor: pointer;
  }

  .file-mosaic-item .options {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 5px; /* Espacio entre los botones */
    opacity: 0; /* Inicialmente ocultos */
    transition: opacity 0.3s; /* Transición para la visibilidad */
  }

  .file-mosaic-item:hover .options {
    opacity: 1; /* Mostrar botones al pasar el mouse */
  }

  .file-mosaic-item .options .button {
    background-color: #fff;
    border: none;
    padding: 3px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    font-size: 15px;
  }

  .file-mosaic-item .options .button:hover {
    background: #ccc; /* Cambio de color al pasar el mouse */
  }

  .file-list-file-viewer {
    height: 100%;
    width: 100%;
    padding-top: 35px;
  }

  @media (max-width: 768px) {
    .file-mosaic-item {
      width: calc(33.33% - 20px); /* Dos columnas en pantallas medianas */
    }
  }

  @media (max-width: 480px) {
    .file-mosaic-item {
      width: 220px; /* Una columna en pantallas pequeñas */
      height: 220px; /* Una columna en pantallas pequeñas */
    }
    .file-mosaic-item .options {
      opacity: 1;
    }
  }
</style>
