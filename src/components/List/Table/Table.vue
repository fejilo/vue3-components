<template>
  <div class="table-container">
    <table class="table table-hover">
      <thead>
        <tr>
          <Header
            v-for="(column, columnId) in columns"
            :ref="
              el => {
                column.header = el;
              }
            "
            :key="`table-header-${columnId}`"
            :id="column.id"
            :icon="column.icon"
            :title="column.title"
            :sortable="column.sortable"
            :sort="column.sort"
            :show="column.show"
            :clickable="column.clickable"
            @click="handleHeaderClick"
            @sort="handleHeaderSort"
          />
        </tr>
      </thead>
      <tbody v-if="loading">
        <tr v-for="row in 4" :key="`table-skeleton-row-${row}`">
          <td v-for="(column, index) in columns" :key="`table-skeleton-cell-${index}`" v-show="column.show">
            <div class="skeleton-cell"></div>
          </td>
        </tr>
      </tbody>
      <tbody class="table-body" v-else>
        <tr
          v-for="(row, index) of list"
          :key="`table-row-${index}`"
          :draggable="localRowDraggable"
          @click="handleRowClick($event, row)"
          @mouseover="handleRowMouseHover($event, row, true)"
          @mouseleave="handleRowMouseHover($event, row, false)"
          @dragstart="handleRowDragStart($event, row, index)"
          @dragover="handleRowDragOver($event, row, index)"
          @drop="handleRowDrop($event, row, index)"
        >
          <slot :record="row" :index="index"></slot>
        </tr>
      </tbody>
    </table>

    <!-- <div class="overlay" v-if="showOverlay || showError">
      <div class="error-message" v-if="showError">
        <div>{{ localErrorMessage }}</div>
      </div>
    </div> -->
  </div>
</template>

<script>
  /* eslint-disable */
  import { defineComponent, ref, reactive, watch, provide, computed } from 'vue';
  import Header from './Header.vue';
  import Overlay from '@/components/Layout/Overlay.vue';
  import Icon from '@/components/Icon/Icon.vue';
  import useDataprovider from '@/composables/useDataprovider/useDataprovider';

  export default defineComponent({
    name: 'Table',
    props: {
      dataprovider: { type: String, default: null },
      dataList: { type: Array, default: [] }, //Array of Objects
      rowDraggable: { type: Boolean, default: false }, // Enable or Disable row draggable
      loadingMessage: { type: String, default: 'Loading...' },
      errorMessage: { type: String, default: 'No records...' },
    },
    components: { Header, Overlay, Icon },
    emits: ['headerClick', 'headerSort', 'rowClick', 'rowMouseHover', 'rowDragStart', 'rowDragOver', 'rowDrop'],
    setup(props, { emit, expose, slots }) {
      /* 
        define dataprovider if has one 
      */
      const dp = props.dataprovider ? useDataprovider(props.dataprovider) : null;
      const localDataList = reactive(props.dataList);

      const list = computed({
        get() {
          if (dp) return dp.dataprovider.list;
          return localDataList;
        },
        set(dataList) {
          if (dp) dp.dataprovider.list = dataList;
          else localDataList = dataList;
        },
      });

      const getColumns = () => {
        return slots
          .default()
          .filter(vnode => typeof vnode.type !== 'undefined' && vnode.type.name == 'Column' && typeof vnode.props !== 'undefined')
          .map(el => {
            return {
              id: el.props?.id || index,
              icon: el.props?.icon || null,
              title: el.props?.title || null,
              sortable: el.props?.sortable || null,
              clickable: el.props?.clickable || null,
              sort: el.props?.sort || null,
              show: typeof el.props.show == 'undefined' ? true : el.props.show,
              header: null,
            };
          })
          .reduce((columns, column) => {
            columns[column.id] = column;
            return columns;
          }, {});
      };

      const localRowDraggable = ref(props.rowDraggable);
      const localLoadingMessage = ref(props.loadingMessage);
      const localErrorMessage = ref(props.errorMessage);

      const columns = ref(getColumns());
      const loading = ref(false);
      const showError = ref(false);

      watch(
        () => props.dataList,
        value => (localDataList.value = value)
      ); // update the list if dataList change
      watch(
        () => props.rowDraggable,
        value => (localRowDraggable.value = value)
      ); // update the rowDraggable if change
      watch(
        () => props.loadingMessage,
        value => (localLoadingMessage.value = value)
      ); // update the loading message if change
      watch(
        () => props.errorMessage,
        value => (localErrorMessage.value = value)
      ); // update the loading message if change

      const loadList = () => {
        if (dp) dp.loadList();
      };

      /*
            handlers of Header Events
        */

      const handleHeaderClick = event => {
        emit('headerClick', { event: event, dataList: localDataList });
      };

      const handleHeaderSort = event => {
        Object.keys(columns.value).forEach(columnId => {
          if (columnId != event.id) columns.value[columnId].header.resetSort();
        });
        emit('headerSort', { event: event, dataList: localDataList });
      };
      /*
            handlers of Row Events
        */

      const handleRowClick = (event, row) => {
        emit('rowClick', { event: event, data: row, dataList: localDataList });
      };

      const handleRowMouseHover = (event, row, isHover) => {
        row['__isHover'] = isHover;
        emit('rowMouseHover', {
          event: event,
          row: row,
          isHover: isHover,
          dataList: localDataList,
        });
      };

      const handleRowDragStart = (event, row, index) => {
        if (localRowDraggable.value)
          emit('rowDragStart', {
            event: event,
            row: row,
            index: index,
            dataList: localDataList,
          });
      };

      const handleRowDragOver = (event, row, index) => {
        event.preventDefault();
        if (localRowDraggable.value)
          emit('rowDragOver', {
            event: event,
            row: row,
            index: index,
            dataList: localDataList,
          });
      };

      const handleRowDrop = (event, row, index) => {
        if (localRowDraggable.value)
          emit('rowDrop', {
            event: event,
            row: row,
            index: index,
            dataList: localDataList,
          });
      };

      /*
            Setters and Getters
        */

      const setDataList = dataList => {
        if (Array.isArray(dataList)) localDataList.value = dataList;
        else console.error('dataList must be Array');
      };

      const getDataList = () => {
        return localDataList.value;
      };

      const setLoading = value => {
        loading.value = value;
      };

      const getLoading = () => {
        return loading.value;
      };

      const setShowError = value => {
        showError.value = value;
      };

      const getShowError = () => {
        return showError.value;
      };

      const getErrorMessage = () => {
        return localErrorMessage.value;
      };

      const setErrorMessage = errorMessage => {
        localErrorMessage.value = errorMessage;
      };

      const getLoadingMessage = () => {
        return localLoadingMessage.value;
      };

      const setLoadingMessage = loadingMessage => {
        localLoadingMessage.value = loadingMessage;
      };

      const getRowDraggable = () => {
        return localRowDraggable.value;
      };

      const setRowDraggable = rowDraggable => {
        localRowDraggable.value = rowDraggable;
      };

      const getColumn = columnId => {
        const column = columns.value[columnId];
        if (typeof column !== 'undefined') {
          return {
            id: column.id,
            icon: column.icon,
            title: column.title,
            sortable: column.sortable,
            clickable: column.clickable,
            sort: column.sort,
            show: column.show,
          };
        }
        return null;
      };

      const setColumn = (columnId, data) => {
        let column = columns.value[columnId];
        if (typeof column !== 'undefined') {
          (column.icon = data?.icon || column.icon),
            (column.title = data?.title || column.title),
            (column.sortable = data?.sortable || column.sortable),
            (column.clickable = data?.clickable || column.clickable),
            (column.sort = data?.sort || column.sort),
            (column.show = typeof data.show == 'undefined' ? column.show : data.show);
        }
      };

      const getComponentConfiguration = () => {
        const columnsConfig = Object.keys(columns.value).reduce((column, columnId) => {
          column[columnId] = getColumn(columnId);
          return column;
        }, {});
        return {
          rowDraggable: getRowDraggable(),
          loadingMessage: getLoadingMessage(),
          errorMessage: getErrorMessage(),
          showError: getShowError(),
          loading: getLoading(),
          columns: columnsConfig,
        };
      };

      const setComponentConfiguration = config => {
        if (typeof config.rowDraggable != 'undefined') setRowDraggable(config.rowDraggable);
        if (typeof config.loading !== 'undefined') setLoading(config.loading);
        //if (config?.errorMessage) setErrorMessage(config.errorMessage);
        if (config?.columns) {
          /* reset sort of all column headers */
          Object.keys(columns.value).forEach(columnId => {
            columns.value[columnId].header.resetSort();
          });
          /* set the column configuration */
          Object.keys(config.columns).forEach(columnId => {
            const column = getColumn(columnId);
            if (column) setColumn(columnId, config.columns[columnId]);
          });
        }
      };

      provide('Table', { columns });

      expose({
        setDataList,
        getDataList,
        setLoading,
        getLoading,
        getColumn,
        setColumn,
        getShowError,
        setShowError,
        getErrorMessage,
        setErrorMessage,
        getLoadingMessage,
        setLoadingMessage,
        getRowDraggable,
        setRowDraggable,
        getComponentConfiguration,
        setComponentConfiguration,
        loadList,
        list,
      });

      return {
        columns,
        localDataList,
        localRowDraggable,
        localLoadingMessage,
        localErrorMessage,
        loading,
        showError,
        slots,
        list,

        handleHeaderClick,
        handleHeaderSort,
        handleRowClick,
        handleRowMouseHover,
        handleRowDragStart,
        handleRowDragOver,
        handleRowDrop,
      };
    },
  });
</script>

<style scoped>
  /* Contenedor de la tabla */
  .table-container {
    position: relative; /* Posiciona elementos hijos como el overlay */
    margin: auto;
  }

  /* Overlay */
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(105, 105, 105, 0.411); /* Fondo semitransparente */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    pointer-events: auto;
  }

  .error-message {
    display: flex;
    justify-content: center;
    background: #f51f22;
    padding: 10px;
    border-radius: 8px;
    font-size: 16px;
    color: #f7f7f7;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }

  /* Skeleton Cells */
  .skeleton-cell {
    height: 20px;
    background-color: #e0e0e0;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
  }

  /* Skeleton Animation */
  .skeleton-cell::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(206, 206, 206, 0.774), transparent);
    animation: shimmer 1.5s infinite;
  }
</style>
