import useApiCalls from '@/composables/useDataprovider/useApiCalls';
const userSessionToken = 'sss';

const useList = dataprovider => {
  const { callToList } = useApiCalls(userSessionToken);

  const setList = list => {
    dataprovider.list = list;
  };

  const getList = () => {
    return dataprovider.list;
  };

  const loadList = async () => {
    try {
      const list = await callToList(dataprovider.api.list, {
        filters: dataprovider.listFilters,
        pagination: dataprovider.pagination,
        sort: dataprovider.sort,
      });
      setList(list);
    } catch (err) {
      throw err;
    }
  };

  return {
    loadList,
    setList,
    getList,
  };
};

export default useList;
