<template>
  <div>
    <label class="form-label">
      {{ label }}
      <span class="text-danger" v-if="required">*</span>
    </label>
    <input
      v-if="mask == null"
      class="form-control"
      :class="[validationClass]"
      v-model="refModelValue"
      :type="type"
      :minlength="minlength"
      :maxlength="maxlength"
      @input="handleInput"
      @keypress="handleKeyPress"
      @keyup="handleKeyUp"
      @blur="handleBlur"
      @focus="handleFocus"
      @click="handleClick"
    />
    <input
      v-else
      class="form-control"
      :class="[validationClass]"
      v-model="refModelValueMasked"
      v-maska:refModelValue.unmasked="mask"
      :type="type"
      :minlength="minlength"
      :maxlength="maxlength"
      @input="handleInput"
      @keypress="handleKeyPress"
      @keyup="handleKeyUp"
      @blur="handleBlur"
      @focus="handleFocus"
      @click="handleClick"
    />
    <div class="invalid-feedback" :key="`input-error-${index}`" v-for="(error, index) of errors">
      {{ error }}
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import useFormFieldRegister from './composables/useFormFieldRegister';
  import useFieldValidation from './composables/useFormFieldValidation';
  import { defineComponent, onMounted, ref, watch, computed } from 'vue';
  import uuid from '@/utils/uuid.js';
  import { vMaska } from 'maska/vue';

  export default defineComponent({
    name: 'FormFieldInput',
    props: {
      modelValue: {},
      id: { type: String, default: uuid(8) },
      name: { type: String, default: null },
      label: { type: String, default: null },
      required: { type: Boolean, default: false },
      type: { type: String, default: 'text' },
      minlength: { type: Number, default: null },
      maxlength: { type: Number, default: null },
      handleValidate: { type: Function, default: null },
      validateOnBlur: { type: Boolean, default: false }, //validate the value when the input is blur
      mask: { type: String, default: null }, // add the mask of the value
      maskValue: { type: Boolean, default: false }, //return the value with mask or not;
    },
    emits: ['update:modelValue', 'keyPress', 'keyDown', 'keyUp', 'blur', 'focus', 'click', 'change', 'error'],
    directives: { maska: vMaska },
    setup(props, { emit, expose }) {
      const refModelValue = ref(props.modelValue);
      const refModelValueMasked = ref(props.modelValue);
      const initialValue = props.modelValue || null;

      /* Computed props */

      const value = computed({
        get() {
          return props.maskValue ? refModelValueMasked.value : refModelValue.value;
        },
        set(val) {
          refModelValue.value = val;
          if (props.mask !== null) refModelValueMasked.value = val;
        },
      });

      /* Watchers */

      watch(
        () => props.modelValue,
        nv => {
          value.value = nv;
        }
      );

      /* Methods */

      const handleInput = () => emit('update:modelValue', value.value);
      const handleKeyPress = event => emit('keyPress', event);
      const handleKeyUp = event => emit('keyUp', event);
      const handleFocus = event => emit('focus', event);
      const handleClick = event => emit('click', event);
      const handleBlur = event => {
        if (props.validateOnBlur) validate();
        emit('blur', event);
      };

      const reset = () => {
        errors.value = [];
        value.value = initialValue;
      };

      const clear = () => {
        errors.value = [];
        value.value = null;
      };

      /* Use composables */

      // validation
      const { errors, validationClass, validate } = useFieldValidation(
        value,
        { required: props.required },
        props.handleValidate,
        emit
      );

      //Register in a parent form if has one.
      const { registerField } = useFormFieldRegister({
        value,
        id: props.id,
        name: props.name,
        errors,
        reset,
        clear,
        validate,
      });

      /* Component life cycle events */

      onMounted(() => registerField());

      expose({
        value,
        refModelValue,
        reset,
        clear,
        validate,
      });

      return {
        props,
        errors,
        refModelValue,
        refModelValueMasked,
        validationClass,
        handleInput,
        handleKeyPress,
        handleKeyUp,
        handleBlur,
        handleFocus,
        handleClick,
      };
    },
  });
</script>
