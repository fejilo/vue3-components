<template>
  <div>
    <label class="form-label">
      {{ label }}
      <span class="text-danger" v-if="required">*</span>
    </label>
    <label v-for="(option, index) in options" :key="index" class="form-check">
      <input
        class="form-check-input"
        :class="[validationClass]"
        type="checkbox"
        :value="option.value"
        v-model="selectedValues"
      />
      <span class="form-check-label">{{ option.label }}</span>
    </label>
    <div class="invalid-feedback" :key="`input-error-${index}`" v-for="(error, index) of errors">
      {{ error }}
    </div>
  </div>
</template>

<script>
  import useFormFieldRegister from './composables/useFormFieldRegister';
  import useFieldValidation from './composables/useFormFieldValidation';

  import uuid from '@/utils/uuid.js';
  import { ref, watch, onMounted } from 'vue';

  export default {
    name: 'FormFieldCheckbox',
    props: {
      id: { type: String, default: uuid(8) },
      name: { type: String, default: null },
      label: { type: String, default: null },
      modelValue: { type: Array },
      options: {
        type: Array,
        required: true,
        default: () => [],
      },
      handleValidate: { type: Function, default: null },
      required: { type: Boolean, default: false },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const selectedValues = ref(props.modelValue);
      const initialValue = props.modelValue || [];

      const { errors, validationClass, validate } = useFieldValidation(
        selectedValues,
        { required: props.required },
        props.handleValidate,
        emit
      );

      watch(
        () => props.modelValue,
        nv => {
          selectedValues.value = nv;
        }
      );

      watch(
        () => selectedValues.value,
        nv => {
          emit('update:modelValue', nv);
        }
      );

      const clear = () => {
        errors.value = [];
        selectedValues.value = null;
      };

      const reset = () => {
        errors.value = [];
        selectedValues.value = initialValue;
      };

      //Register in a parent form if has one.
      const { registerField } = useFormFieldRegister({
        value: selectedValues,
        id: props.id,
        name: props.name,
        errors,
        reset,
        clear,
        validate,
      });

      onMounted(() => registerField());

      return {
        errors,
        selectedValues,
        validationClass,
        validate,
      };
    },
  };
</script>

<style scoped>
  .form-check {
    margin-bottom: 10px;
  }
</style>
