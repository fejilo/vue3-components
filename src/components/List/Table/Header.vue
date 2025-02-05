<template>
  <th scope="col" v-if="column.show">
    <template v-if="!slots.default">
      <span class="titleIcon" :class="[{ pointer: column.clickable }]" @click="handleClick" v-if="column.icon">
        <Icon :icon="column.icon" />
      </span>
      <span class="titleIcon" :class="[{ pointer: column.clickable }]" @click="handleClick" v-if="column.title">
        {{ column.title }}
      </span>

      <span class="pointer" style="margin-left: 10px" v-if="column.sortable" @click="toogleSort">
        <Icon icon="fa fa-sort" style="color: rgb(182, 197, 210)" v-if="column.sort == null" />
        <Icon icon="fa fa-caret-up" v-else-if="column.sort == 'ASC'" />
        <Icon icon="fa fa-caret-down" v-else />
      </span>
    </template>
    <slot></slot>
  </th>
</template>

<script>
  /* eslint-disable */
  import { defineComponent } from 'vue';
  import Icon from '@/components/Icon/Icon.vue';
  import useGetTableParentColumn from './composables/useGetTableParentColumn';
  export default defineComponent({
    name: 'Header',
    props: {
      id: { required: true },
      icon: { type: String, default: null },
      title: { type: String, default: null },
      sortable: { type: Boolean, default: false },
      hiddenable: { type: Boolean, defaul: false },
      clickable: { type: Boolean, default: false },
      sort: { type: String, default: null },
    },
    components: { Icon },
    emits: ['click', 'sort'],
    setup(props, { emit, expose, slots }) {
      const column = useGetTableParentColumn(props.id);

      const toogleSort = () => {
        column.sort = column.sort == null ? 'ASC' : column.sort == 'ASC' ? 'DESC' : 'ASC';
        emit('sort', column);
      };

      const setSort = sort => {
        if (sort == null || sort == 'ASC' || sort == 'DESC') sortType.value = sort;
        else console.error('Invalid sort type');
        emit('sort', column);
      };

      const resetSort = () => (column.sort = null);
      const getSort = () => column.sort;

      const handleClick = () => emit('click', column);

      expose({
        setSort,
        getSort,
        resetSort,
      });

      return { slots, column, toogleSort, handleClick };
    },
  });
</script>

<style scoped>
  .titleIcon {
    margin-left: 3px;
    margin-right: 3px;
  }

  .pointer {
    cursor: pointer;
  }
</style>
