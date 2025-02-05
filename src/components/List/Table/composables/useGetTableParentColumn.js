import { inject } from 'vue';

const useGetTableParentColumn = columnId => {
  const parentTable = inject('Table');
  return parentTable.columns.value[columnId];
};

export default useGetTableParentColumn;
