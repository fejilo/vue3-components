import useDataproviderStore from '@/store/useDataproviderStore';
import useList from '@/composables/useDataprovider/useList';

const useDataprovider = (
  name,
  data = {
    api: { create: null, read: null, update: null, delete: null, list: null },
    record: {},
    list: [],
    files: [],
    readFilters: {},
    listFilters: {},
    listPagination: {},
    listSort: null,
  }
) => {
  const dataproviderStore = useDataproviderStore();
  const dataprovider = dataproviderStore.create(name, data);

  const { loadList, setList, getList } = useList(dataprovider);

  const destroy = () => {
    dataproviderStore.destroy(name);
  };

  const getAll = () => {
    return dataproviderStore.getAll();
  };

  return {
    dataprovider,
    loadList,
    setList,
    getList,
    destroy,
    getAll,
  };
};

export default useDataprovider;
