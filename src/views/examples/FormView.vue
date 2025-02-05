<template>
  <Overlay ref="overlayRef" />
  <Form ref="formRef" @submit="handleSubmit">
    {{ test }}
    <FormFieldInput
      class="mb-3"
      v-model="test"
      :required="true"
      label="Testing"
      mask="#####-###"
      :maskValue="true"
      :validateOnBlur="true"
      @error="handleError"
    />

    {{ testArray }}

    <FormFieldCheckbox
      class="mb-3"
      label="Testing"
      v-model="testArray"
      :required="true"
      :options="[
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
      ]"
      @error="handleError"
    />

    {{ inputMultiple }}
    <FormFieldInputMultiple v-model="inputMultiple" />

    <button class="btn btn-primary" @click.prevent="showOverlay">Show</button>

    <button class="btn btn-success" @click.prevent="runSubmit">Submit</button>
    <button class="btn btn-danger" @click.prevent="runReset">Reset</button>
  </Form>
</template>

<script>
  /* eslint-disable */
  import Container from '@/components/Layout/Container.vue';
  import Form from '@/components/Form/Form.vue';
  import FormFieldInput from '@/components/Form/FormFieldInput.vue';
  import FormFieldInputMultiple from '@/components/Form/FormFieldInputMultiple.vue';
  import FormFieldCheckbox from '@/components/Form/FormFieldCheckbox.vue';
  import Overlay from '@/components/Layout/Overlay.vue';
  import { ref } from 'vue';

  export default {
    name: 'HomeView',
    components: {
      FormFieldInput,
      Form,
      Container,
      Overlay,
      FormFieldCheckbox,
      FormFieldInputMultiple,
    },
    setup() {
      const overlayRef = ref(null);
      const formRef = ref(null);
      const test = ref('18---998-55');
      const testArray = ref(['1', '2']);
      const inputMultiple = ref([1, 2, 3]);

      const runSubmit = () => {
        formRef.value.submit();
      };

      const runReset = () => {
        formRef.value.reset();
      };

      const handleError = evt => {
        console.log(evt);
      };

      const handleSubmit = evt => {
        console.log(evt);
      };

      const showOverlay = () => {
        overlayRef.value.open();
      };

      const customValidation = value => {
        return new Promise(resolve => {
          setTimeout(() => {
            console.log(value);
            if (value > 5) {
              resolve(['The value should be less to 5']);
            } else {
              resolve([]);
            }
          }, 5000);
        });
      };

      return {
        test,
        customValidation,
        handleError,
        handleSubmit,
        showOverlay,
        overlayRef,
        formRef,
        runSubmit,
        runReset,
        testArray,
        inputMultiple,
      };
    },
  };
</script>
