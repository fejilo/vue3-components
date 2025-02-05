import { inject } from 'vue';

const useFormFieldRegistration = ({ id, name, value, errors, reset, clear, validate }) => {
  const registerField = () => {
    const parentForm = inject('Form');
    if (parentForm) {
      parentForm.fields.value.push({
        id: id,
        name: name,
        value: value,
        validate: validate,
        errors: errors,
        reset: reset,
        clear: clear,
      });
    }
  };

  return {
    registerField,
  };
};

export default useFormFieldRegistration;
