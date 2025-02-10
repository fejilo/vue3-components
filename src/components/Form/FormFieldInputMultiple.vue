<template>
  <div>
    <label class="form-label">
      {{ label }}
      <span class="text-danger" v-if="required">*</span>
    </label>
    <div v-for="(val, index) in values" :key="index" class="input-container">
      <input v-model="values[index]" type="text" class="form-control" />
      <button @click.prevent="remove(index)" class="btn btn-link btn-sm">
        <Icon class="remove-btn" icon="fas fa-trash" />
      </button>
    </div>
    <button @click.prevent="add(null)" class="btn btn-link btn-sm" style="text-decoration: none">
      Agregar
      <Icon icon="fas fa-plus" />
    </button>
  </div>
</template>

<script>
  import { defineComponent, ref, watch } from 'vue';
  import Icon from '@/components/Icon/Icon.vue';
  import uuid from '@/utils/uuid.js';
  export default defineComponent({
    name: 'FormFieldInputMultiple',
    components: {
      Icon,
    },
    props: {
      modelValue: {
        type: Array,
        required: true,
      },
      id: { type: String, default: uuid(8) },
      name: { type: String, default: null },
      label: { type: String, default: null },
      required: { type: Boolean, default: false },
    },
    emits: ['update:modelValue'],
    setup(props, { emit, expose }) {
      const values = ref(props.modelValue);

      /* Watchers */

      watch(
        () => props.modelValue,
        nv => {
          values.value = nv;
        }
      );

      watch(values.value, nv => {
        emit('update:modelValue', nv);
      });

      const add = (val = null) => values.value.push(val);
      const remove = index => values.value.splice(index, 1);

      expose({
        add,
        remove,
      });

      return {
        props,
        values,
        add,
        remove,
      };
    },
  });
</script>

<style scoped>
  .input-container {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
  }

  .remove-btn {
    color: rgb(241, 0, 0);
  }
</style>
