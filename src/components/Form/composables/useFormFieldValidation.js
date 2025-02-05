import { ref, computed } from 'vue';

const useFormFieldValidation = (value, defaultValidations, handleValidate, emit) => {
  /* Array of errors */
  const errors = ref([]);

  /* Define the error class if the input value is invalid */
  const validationClass = computed(() => (errors.value.length > 0 ? 'is-invalid' : ''));

  const validate = async () => {
    errors.value = [];

    if (defaultValidations.required) {
      if (!value.value) {
        errors.value.push('This Field is Required');
      } else {
        if (typeof value.value === 'string' && value.value.trim().length == 0) {
          errors.value.push('This Field is Required');
        } else if (Array.isArray(value.value) && value.value.length == 0) {
          errors.value.push('This Field is Required');
        }
      }
    }

    /* To DO: define default Validations */

    if (handleValidate) {
      //handleValidate should be a promise for custom validations and return array of errors
      try {
        let customErrors = await handleValidate(value);
        if (customErrors && Array.isArray(customErrors)) {
          errors.value = [...errors.value, ...customErrors];
        }
      } catch (err) {
        errors.value = [...errors.value, err];
      }
    }

    emit('error', errors.value);

    return { isValid: errors.value.length == 0, errors: errors.value };
  };

  return {
    errors,
    validationClass,
    validate,
  };
};

export default useFormFieldValidation;
