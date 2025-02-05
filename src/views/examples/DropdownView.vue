<template>
  <Icon :icon="icon" />
  <br />
  <button>
    Hello
    <Badge class="badge" icon="fa-solid fa-envelope" counter-value="120" :counter-style="['background: black']" />
  </button>
  <br />

  <div style="display: flex; width: 100%; justify-content: center">
    <Dropdown :open="true" :align="align" :linkClass="['form-select']" :linkStyle="['text-decoration:none']">
      <template #link>
        <span>
          Hello
          <Icon :icon="icon" />
        </span>
      </template>

      <ul>
        <li><a href="#">Opción 1</a></li>
        <li><a href="#">Opción 2</a></li>
        <li><Button type="success" size="sm" :loading="true">Test</Button></li>
      </ul>
    </Dropdown>
  </div>

  <FileDrop></FileDrop>
  <PDFViewer src="https://pdfobject.com/pdf/sample.pdf"></PDFViewer>
</template>

<script>
  /* eslint-disable */
  import Icon from '@/components/Icon/Icon.vue';
  import Badge from '@/components/Badge/Badge.vue';
  import Dropdown from '@/components/Dropdown/Dropdown.vue';
  import Button from '@/components/Button/Button.vue';
  import FileDrop from '@/components/Files/FileDrop.vue';
  import PDFViewer from '@/components/Files/PDFViewer.vue';
  import { ref } from 'vue';
  export default {
    name: 'DropdownView',
    components: {
      Icon,
      Badge,
      Dropdown,
      Button,
      FileDrop,
      PDFViewer,
    },
    setup() {
      const icon = ref('fa fa-caret-up');
      const align = ref('left');
      setTimeout(() => {
        icon.value = 'fa-solid fa-coffee';
        //align.value = 'start'
      }, 5000);
      return {
        icon,
        align,
      };
    },
  };
</script>

<style scoped>
  .badge {
    font-size: 3rem;
    color: blue;
  }
</style>
