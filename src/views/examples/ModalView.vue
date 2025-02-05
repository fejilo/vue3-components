<template>
  <Button @click="openModal">Open Modal</Button>
  <Modal ref="refModal" :defaultOpen="true" openPosition="left" :closeOnBackdropClick="false">
    <ModalHeader>
      <h2>Hello</h2>
    </ModalHeader>
    <ModalBody>Hello world</ModalBody>
    <ModalFooter>
      <Button @click="closeModal">Close</Button>
    </ModalFooter>
  </Modal>
</template>

<script>
  /* eslint-disable */
  import Button from '@/components/Button/Button.vue';
  import Modal from '@/components/Modal/Modal.vue';
  import ModalHeader from '@/components/Modal/ModalHeader.vue';
  import ModalFooter from '@/components/Modal/ModalFooter.vue';
  import ModalBody from '@/components/Modal/ModalBody.vue';
  import { ref } from 'vue';

  export default {
    name: 'ModalView',
    components: {
      Modal,
      ModalHeader,
      ModalFooter,
      ModalBody,
      Button,
    },
    setup() {
      const refModal = ref(null);
      const openModal = () => {
        refModal.value.open();
      };
      const closeModal = () => {
        refModal.value.close();
      };
      return {
        openModal,
        closeModal,
        refModal,
      };
    },
  };
</script>

<style scoped></style>
