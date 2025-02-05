import { defineStore } from 'pinia';
import { reactive } from 'vue';

const useDataproviderStore = defineStore('dataprovider', {
  state: () => ({
    dataprovider: reactive([]),
  }),
  actions: {
    create(
      name,
      {
        api = { create: null, read: null, update: null, delete: null, list: null },
        record = {},
        list = [],
        files = [],
        readFilters = {},
        listFilters = {},
        listPagination = {},
        listSort = null,
      }
    ) {
      if (this.dataprovider[name]) return this.dataprovider[name];
      this.dataprovider[name] = reactive({
        api: api,
        record: record,
        list: list,
        files: files,
        readFilters: readFilters,
        listFilters: listFilters,
        listPagination: listPagination,
        listSort: listSort,
      });
      return this.dataprovider[name];
    },

    /*setRecord(){

    }
    set(name, { record = {}, list = [], files = [], listFilters = {}, readFilters = {} }) {
      if (this.dataprovider[name]) return;
      this.dataprovider[name] = {
        record: record,
        list: list,
        files: files,
        listFilters: listFilters,
        readFilters: readFilters,
      };
    },*/
    get(name) {
      return this.dataprovider[name];
    },
    destroy(name) {
      if (this.dataprovider[name]) delete this.dataprovider[name];
    },
    getAll() {
      return this.dataprovider;
    },
  },
});

export default useDataproviderStore;
