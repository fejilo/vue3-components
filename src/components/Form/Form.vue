<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
/* eslint-disable */
import { defineComponent, ref, provide } from "vue";
import uuid from "@/utils/uuid.js";

export default defineComponent({
  name: "Form",
  props: {
    id: { type: String, default: uuid(8) },
    name: { type: String, default: null },
  },
  emits: ["submit", "cancel", "beforeSubmit"],
  setup(props, { emit, expose }) {
    const fields = ref([]);

    const submit = async () => {
      emit("beforeSubmit");
      let promises = [];
      fields.value.forEach((i) => promises.push(i.validate()));
      const fieldsValidation = await Promise.all(promises);
      const isValid = !fieldsValidation.includes(false);
      const dataFields = fields.value.map((el) => {
        return {
          id: el.id,
          name: el.name,
          value: el.value,
          isValid: el.errors.length == 0,
          errors: el.errors,
        };
      });
      emit("submit", { fields: dataFields, isValid: isValid });
    };

    const reset = () => {
      fields.value.forEach((field) => field.reset());
    };

    const clear = () => {
      fields.value.forEach((field) => field.clear());
    };

    const cancel = () => {
      clear();
    };

    provide("Form", { fields });

    expose({ submit, cancel, clear, reset });
  },
});
</script>
