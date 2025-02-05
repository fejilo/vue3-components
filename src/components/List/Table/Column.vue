<template>
  <td v-show="column.show">
    <slot></slot>
  </td>
</template>

<script>
  /* eslint-disable */
  import { defineComponent, watch } from 'vue';
  import useGetTableParentColumn from './composables/useGetTableParentColumn';
  export default defineComponent({
    name: 'Column',
    props: {
      id: { type: [Number, String], required: true },
      show: { type: Boolean, default: true },
      icon: { type: String, default: null },
      title: { type: String, default: null },
      sort: { type: String, default: null },
      sortable: { type: Boolean, default: false },
      clickable: { type: Boolean, default: false },
    },

    setup(props) {
      const column = useGetTableParentColumn(props.id);
      watch(
        () => props.show,
        value => (column.show = value)
      );
      watch(
        () => props.title,
        value => (column.title = value)
      );
      watch(
        () => props.sortable,
        value => (column.sortable = value)
      );
      watch(
        () => props.clickable,
        value => (column.clickable = value)
      );
      watch(
        () => props.icon,
        value => (column.icon = value)
      );
      watch(
        () => props.sort,
        value => (column.sort = value)
      );

      return { column };
    },
  });
</script>
