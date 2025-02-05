<template>
  <Table
    ref="tableRef"
    :rowDraggable="true"
    dataprovider="dataList"
    @headerClick="handleHeaderClick"
    @rowDragStart="handleRowDragStart"
    @rowDrop="handleRowDrop"
    v-slot="data"
  >
    <Column id="id" title="ID" :sortable="true">
      {{ data }}
    </Column>
    <Column id="name" icon="fas fa fa-users" :sortable="true" sort="ASC">
      {{ data }}
    </Column>
  </Table>

  <button type="button" class="btn btn-info" @click="getConfig">Get current config</button>
  <button type="button" class="btn btn-info" @click="setConfig">Set config</button>

  <button type="button" class="btn btn-success" @click="toogleLoading">Loading</button>
</template>

<script>
  /* eslint-disable */
  import Table from '@/components/List/Table/Table.vue';
  import Column from '@/components/List/Table/Column.vue';
  import useDataprovider from '@/composables/useDataprovider/useDataprovider';

  import { ref } from 'vue';

  export default {
    name: 'TableView',
    components: {
      Table,
      Column,
    },
    setup() {
      const { dataprovider, loadList } = useDataprovider('dataList', { api: { list: 'https://jsonplaceholder.typicode.com/posts' } });
      console.log(dataprovider);
      loadList();

      window.dataprovider = dataprovider;
      setTimeout(() => {
        dataprovider.list = [
          { id: 1, name: 'Luis' },
          { id: 2, name: 'Felipe' },
        ];
      }, 1000);

      const draggedRowIndex = ref(null);

      const tableRef = ref(null);

      const handleHeaderClick = evt => {
        console.log(evt);
      };

      const handleRowDragStart = ({ index }) => {
        draggedRowIndex.value = index;
      };

      const handleRowDrop = ({ index, dataList }) => {
        const draggedRow = dataList.value[draggedRowIndex.value];
        dataList.value.splice(draggedRowIndex.value, 1);
        dataList.value.splice(index, 0, draggedRow);
        draggedRowIndex.value = null;
      };

      const toogleLoading = () => {
        tableRef.value.setLoading(!tableRef.value.getLoading());
      };

      const toogleError = () => {
        tableRef.value.setShowError(!tableRef.value.getShowError());
      };

      const getConfig = () => {
        console.log(tableRef.value.getComponentConfiguration());
      };

      const setConfig = () => {
        tableRef.value.setComponentConfiguration({
          rowDraggable: false,
          loading: true,
          columns: {
            id: {
              id: 'Hello',
              icon: 'fas fa fa-key',
              title: 'ID',
              sortable: true,
              clickable: null,
              sort: 'DESC',
              show: true,
            },
            name: {
              id: 'name',
              icon: 'fas fa fa-users',
              title: null,
              sortable: false,
              clickable: null,
              sort: null,
              show: false,
            },
          },
        });
      };

      return {
        tableRef,
        handleRowDragStart,
        handleRowDrop,
        handleHeaderClick,
        toogleLoading,
        toogleError,
        getConfig,
        setConfig,
      };
    },
  };
</script>
